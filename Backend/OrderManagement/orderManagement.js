const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const ORDERS_COLLECTION = 'web3_intent_orders';
const QUOTES_COLLECTION = 'order_quotes';

const timers = new Map(); // To track active order timers

// API to create a new order
app.post('/orders', async (req, res) => {
  try {
    const order = req.body;
    const newOrderRef = db.collection(ORDERS_COLLECTION).doc(); // Auto-generate ID
    await newOrderRef.set({
      ...order,
      status: 'pending', // Default status
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const orderId = newOrderRef.id;

    // Start the 5-minute timer
    startOrderTimer(orderId);

    res.status(201).send({ id: orderId, message: 'Order created successfully!' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send({ error: 'Failed to create order' });
  }
});