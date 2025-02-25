const admin = require('firebase-admin');
require('dotenv').config();

// Firebase configuration
let bucket = null;

// Initialize Firebase only if configuration is available
function initializeFirebase() {
  try {
    // Try to load the service account key file if it exists
    let serviceAccount;
    try {
      serviceAccount = require('../serviceAccountKey.json');
    } catch (error) {
      // If file doesn't exist, try to use environment variable
      if (process.env.FIREBASE_CONFIG) {
        serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
      } else {
        console.warn('Firebase configuration not found. Firebase services will be unavailable.');
        return null;
      }
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'movne-platform.appspot.com'
    });

    bucket = admin.storage().bucket();
    console.log('Firebase initialized successfully');
    return bucket;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
}

function getBucket() {
  return bucket;
}

module.exports = {
  initializeFirebase,
  getBucket
};
