const { ObjectId } = require('mongodb');
const { getDb } = require('../../config/db');
const { validationResult } = require('express-validator');
const { getBucket } = require('../../config/firebase');
const path = require('path');

// Get all structured products with filtering
const getStructuredProducts = async (req, res, next) => {
  try {
    const db = getDb();
    
    // Build query filter based on request parameters
    const filter = {};
    
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    if (req.query.issuer) {
      filter.issuer = req.query.issuer;
    }
    
    if (req.query.riskLevel) {
      filter.riskLevel = req.query.riskLevel;
    }
    
    if (req.query.currency) {
      filter.currency = req.query.currency;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Handle date filters
    if (req.query.maturityAfter) {
      filter.maturityDate = filter.maturityDate || {};
      filter.maturityDate.$gte = new Date(req.query.maturityAfter);
    }
    
    if (req.query.maturityBefore) {
      filter.maturityDate = filter.maturityDate || {};
      filter.maturityDate.$lte = new Date(req.query.maturityBefore);
    }
    
    // Get pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Get sort parameters
    const sortField = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort = {};
    sort[sortField] = sortOrder;
    
    // Query the database
    const products = await db.collection('structuredProducts')
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
      
    // Get total count for pagination
    const total = await db.collection('structuredProducts').countDocuments(filter);
    
    res.json({
      success: true,
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific structured product
const getStructuredProductById = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    
    const product = await db.collection('structuredProducts').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Structured product not found" 
      });
    }
    
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Create a new structured product
const createStructuredProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    
    const db = getDb();
    const productData = req.body;
    
    // Convert ISO date strings to Date objects
    if (productData.maturityDate) {
      productData.maturityDate = new Date(productData.maturityDate);
    }
    
    if (productData.issueDate) {
      productData.issueDate = new Date(productData.issueDate);
    }
    
    if (productData.earlyRedemptionFeatures && 
        productData.earlyRedemptionFeatures.autocallObservationDates) {
      productData.earlyRedemptionFeatures.autocallObservationDates = 
        productData.earlyRedemptionFeatures.autocallObservationDates.map(
          date => new Date(date)
        );
    }
    
    // Add creation timestamps
    productData.createdAt = new Date();
    productData.updatedAt = new Date();
    
    const result = await db.collection('structuredProducts').insertOne(productData);
    
    res.status(201).json({ 
      success: true, 
      id: result.insertedId,
      message: 'Structured product created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update a structured product
const updateStructuredProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    
    const db = getDb();
    const id = req.params.id;
    const updateData = req.body;
    
    // Don't allow changing the _id
    delete updateData._id;
    
    // Convert ISO date strings to Date objects
    if (updateData.maturityDate) {
      updateData.maturityDate = new Date(updateData.maturityDate);
    }
    
    if (updateData.issueDate) {
      updateData.issueDate = new Date(updateData.issueDate);
    }
    
    if (updateData.earlyRedemptionFeatures && 
        updateData.earlyRedemptionFeatures.autocallObservationDates) {
      updateData.earlyRedemptionFeatures.autocallObservationDates = 
        updateData.earlyRedemptionFeatures.autocallObservationDates.map(
          date => new Date(date)
        );
    }
    
    // Add updated timestamp
    updateData.updatedAt = new Date();
    
    const result = await db.collection('structuredProducts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Structured product not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Structured product updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    next(error);
  }
};

// Delete a structured product
const deleteStructuredProduct = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    
    // Find product first to get document URLs for deletion from storage
    const product = await db.collection('structuredProducts').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Structured product not found" 
      });
    }
    
    // Delete from database
    await db.collection('structuredProducts').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    // Delete documents from storage if applicable
    const bucket = getBucket();
    if (bucket && product.documents && product.documents.length > 0) {
      try {
        for (const doc of product.documents) {
          if (doc.fileUrl) {
            // Extract filename from the URL
            const filePathMatch = doc.fileUrl.match(/\/([^/]+)$/);
            if (filePathMatch && filePathMatch[1]) {
              await bucket.file(`documents/${filePathMatch[1]}`).delete();
            }
          }
        }
      } catch (storageError) {
        console.error('Error deleting documents from storage:', storageError);
        // Continue with the function even if storage deletion fails
      }
    }
    
    res.json({ 
      success: true, 
      message: 'Structured product deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};

// Upload product document
const uploadProductDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const db = getDb();
    const productId = req.params.id;
    const { documentType, documentName } = req.body;
    
    // Check if product exists
    const product = await db.collection('structuredProducts').findOne({ 
      _id: new ObjectId(productId) 
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Structured product not found" 
      });
    }
    
    // Upload to Firebase Storage if available
    let fileUrl = null;
    const bucket = getBucket();
    
    if (bucket) {
      const filePath = req.file.path;
      const fileExtension = path.extname(req.file.originalname);
      const safeFileName = `${productId}-${documentType}-${Date.now()}${fileExtension}`;
      
      const uploadResult = await bucket.upload(filePath, {
        destination: `documents/${safeFileName}`,
        metadata: {
          contentType: req.file.mimetype
        }
      });
      
      fileUrl = `https://storage.googleapis.com/${bucket.name}/${uploadResult[0].name}`;
    }
    
    // Add document to product
    const document = {
      name: documentName || req.file.originalname,
      type: documentType,
      fileUrl: fileUrl || req.file.path,
      uploadDate: new Date()
    };
    
    await db.collection('structuredProducts').updateOne(
      { _id: new ObjectId(productId) },
      { 
        $push: { documents: document },
        $set: { updatedAt: new Date() }
      }
    );
    
    res.status(201).json({ 
      success: true, 
      document,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStructuredProducts,
  getStructuredProductById,
  createStructuredProduct,
  updateStructuredProduct,
  deleteStructuredProduct,
  uploadProductDocument
};
