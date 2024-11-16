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

// Start the timer for an order
function startOrderTimer(orderId) {
  if (timers.has(orderId)) return; // Timer already exists

  const timer = setTimeout(async () => {
    await selectWinner(orderId);
    timers.delete(orderId); // Remove timer after execution
    console.log("End Comp")
  }, 20000); // 5 minutes in milliseconds

  timers.set(orderId, timer);
}

// API to submit a quote for an order
app.post('/quotes', async (req, res) => {
  try {
    const { orderId, competitorId, quote } = req.body;

    if (!orderId || !competitorId || quote === undefined) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Store the quote in Firestore
    const quoteRef = db.collection(QUOTES_COLLECTION).doc();
    await quoteRef.set({
      orderId,
      competitorId,
      quote: parseFloat(quote),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Broadcast the new quote to all listeners
    io.to(orderId).emit('new_quote', { competitorId, quote });

    res.status(201).send({ message: 'Quote submitted successfully!' });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).send({ error: 'Failed to submit quote' });
  }
});

// Function to select a winner
async function selectWinner(orderId) {
  try {
    // Fetch all quotes for the order
    const snapshot = await db.collection(QUOTES_COLLECTION).where('orderId', '==', orderId).get();

    if (snapshot.empty) {
      console.log(`No quotes found for order ${orderId}`);
      return;
    }

    const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const winner = quotes.reduce((min, current) => (current.quote < min.quote ? current : min), quotes[0]);

    // Update the order status and winner details
    const orderRef = db.collection(ORDERS_COLLECTION).doc(orderId);
    await orderRef.update({
      status: 'filled',
      winner: winner.competitorId,
      winningQuote: winner.quote,
    });

    // Broadcast the winner
    io.to(orderId).emit('winner', { competitorId: winner.competitorId, quote: winner.quote });

    console.log(`Winner selected for order ${orderId}:`, winner);
  } catch (error) {
    console.error('Error selecting winner:', error);
  }
}

// API to fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const snapshot = await db.collection(ORDERS_COLLECTION).orderBy('createdAt', 'desc').get();
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send({ error: 'Failed to fetch orders' });
  }
});

// API to fetch an order by its ID
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const orderRef = db.collection(ORDERS_COLLECTION).doc(id);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).send({ error: 'Order not found' });
    }

    const order = {
      id: orderDoc.id,
      ...orderDoc.data(),
    };

    res.send(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).send({ error: 'Failed to fetch order' });
  }
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a room for an order
  socket.on('join_order', (orderId) => {
    socket.join(orderId);
    console.log(`Client joined order ${orderId}`);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
