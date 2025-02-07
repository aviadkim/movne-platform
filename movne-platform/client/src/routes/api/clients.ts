import express from 'express';
import { Client } from '../../models/Client';

const router = express.Router();

router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    res.status(400).send('Invalid client data');
  }
});

export default router;
