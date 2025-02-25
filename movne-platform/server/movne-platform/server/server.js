// Main server file for Movne Platform
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

// Import configuration
const { connectToMongoDB, closeDbConnection } = require('./config/db');
const { initializeFirebase } = require('./config/firebase');

// Import controllers
const clientController = require('./controllers/clientController');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// Initialize Firebase
initializeFirebase();

// Initialize Express app
const app = express();

// Configure middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Set the port
const PORT = process.env.PORT || 5001;

// Basic API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    server: 'Movne Platform API',
    version: '1.0.0'
  });
});

// Client routes
app.get('/api/clients', authMiddleware, clientController.getClients);
app.get('/api/clients/:id', authMiddleware, clientController.getClientById);
app.post('/api/clients', authMiddleware, clientController.createClient);
app.put('/api/clients/:id', authMiddleware, clientController.updateClient);
app.delete('/api/clients/:id', authMiddleware, clientController.deleteClient);

// Import structured product routes
const structuredProductRoutes = require('./routes/productRoutes/structuredProductRoutes');

// Add product routes
app.use('/api/structured-products', structuredProductRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handler middleware (must be after all routes)
app.use(errorHandler);

// Connect to MongoDB and start server
async function startServer() {
  try {
    await connectToMongoDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  try {
    await closeDbConnection();
    console.log('Server closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});
