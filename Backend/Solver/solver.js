const axios = require('axios');
const io = require('socket.io-client');
const ethers = require('ethers');
const admin = require('firebase-admin');
const readline = require('readline');

// Import wallet credentials
const { PRIVATE_KEY } = require('./wallet');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Ensure this file is in your project directory
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();