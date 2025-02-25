const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');
const { validationResult } = require('express-validator');

// Get all clients
const getClients = async (req, res, next) => {
  try {
    const db = getDb();
    const clients = await db.collection('clients')
      .find({})
      .sort({ lastName: 1, firstName: 1 })
      .project({ firstName: 1, lastName: 1, email: 1, phone: 1 })
      .toArray();
      
    res.json({ success: true, clients });
  } catch (error) {
    next(error);
  }
};

// Get a specific client
const getClientById = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    
    const client = await db.collection('clients').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    
    res.json({ success: true, client });
  } catch (error) {
    next(error);
  }
};

// Create a new client
const createClient = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const db = getDb();
    const { firstName, lastName, email, phone, address, investmentPreferences } = req.body;

    // Check if client already exists
    const existingClient = await db.collection('clients').findOne({ email });
    if (existingClient) {
      return res.status(409).json({ 
        success: false, 
        message: 'Client with this email already exists' 
      });
    }

    const result = await db.collection('clients').insertOne({
      firstName,
      lastName,
      email,
      phone,
      address,
      investmentPreferences,
      meetings: [],
      documents: [],
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ 
      success: true, 
      id: result.insertedId,
      message: 'Client created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update a client
const updateClient = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const updateData = req.body;
    
    // Don't allow changing the _id
    delete updateData._id;
    
    // Add updated timestamp
    updateData.updatedAt = new Date();
    
    const result = await db.collection('clients').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    
    res.json({ 
      success: true, 
      message: 'Client updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    next(error);
  }
};

// Delete a client
const deleteClient = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    
    const result = await db.collection('clients').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    
    res.json({ 
      success: true, 
      message: 'Client deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
