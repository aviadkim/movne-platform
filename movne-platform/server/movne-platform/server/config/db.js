const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/movnePlatform";
const client = new MongoClient(mongoUri, { 
  useUnifiedTopology: true,
  maxPoolSize: 10
});

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db(process.env.MONGODB_DB || 'movnePlatform');
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Implement reconnection logic
    setTimeout(connectToMongoDB, 5000);
  }
}

function getDb() {
  return db;
}

async function closeDbConnection() {
  await client.close();
  console.log('MongoDB connection closed');
}

module.exports = {
  connectToMongoDB,
  getDb,
  closeDbConnection
};
