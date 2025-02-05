// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Firebase Admin SDK setup
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "movne-platform.appspot.com"  // Replace with your Firebase bucket name if needed
});
const bucket = admin.storage().bucket();

// MongoDB setup (if you plan to use it)
// If you prefer Firebase Firestore, you can remove this part.
const { MongoClient, ObjectId } = require('mongodb');
const mongoUri = "mongodb://localhost:27017";
const client = new MongoClient(mongoUri, { useUnifiedTopology: true });
let db;
client.connect()
  .then(() => {
    db = client.db('movnePlatform');
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const app = express();
app.use(express.json());
app.use(cors());

// Set the port (changed to 5001 to avoid conflict)
const PORT = process.env.PORT || 5001;

// Configure multer for file uploads (files will be saved to the 'uploads' folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// A simulated transcription function (replace with a real transcription API when ready)
function transcribeAudio(filePath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("תמלול אוטומטי של הקובץ: " + filePath);
    }, 3000);
  });
}

// Endpoint: Upload an audio file, simulate transcription, and store the result in MongoDB
app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const transcription = await transcribeAudio(filePath);

    // Save transcription in the 'transcriptions' collection (if MongoDB is used)
    const result = await db.collection('transcriptions').insertOne({
      file: filePath,
      transcription,
      createdAt: new Date()
    });

    // Optionally, also upload the file to Firebase Storage:
    // await bucket.upload(filePath, { destination: filePath });

    res.json({ success: true, transcription, id: result.insertedId });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// Endpoint: Retrieve a transcription by its ID
app.get('/transcription/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const transcriptionDoc = await db.collection('transcriptions').findOne({ _id: new ObjectId(id) });
    if (!transcriptionDoc) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, transcription: transcriptionDoc.transcription });
  } catch (error) {
    console.error('Error retrieving transcription:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// Endpoint: Add a new client
app.post('/client', async (req, res) => {
  try {
    const clientData = req.body; // Expect a JSON payload with client details
    const result = await db.collection('clients').insertOne({ ...clientData, createdAt: new Date() });
    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
