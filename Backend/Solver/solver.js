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


function loadingAnimation(duration = 5) {
    const spinner = ['|', '/', '-', '\\'];
    const totalSteps = duration * 10;
    const delay = (duration * 1000) / totalSteps;
  
    let i = 0;
  
    const interval = setInterval(() => {
      process.stdout.write(`\rLoading... ${spinner[i % spinner.length]}`);
      i += 1;
    }, delay);
  
    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write('\rLoading complete!    \n');
    }, duration * 1000);
  }
  
  // Display introductory art
  console.log('\n initiating');
  
  const art = `
  
  ██████╗░██╗░░██╗░█████╗░███████╗███╗░░██╗██╗██╗░░██╗███████╗██╗
  ██╔══██╗██║░░██║██╔══██╗██╔════╝████╗░██║██║╚██╗██╔╝██╔════╝██║
  ██████╔╝███████║██║░░██║█████╗░░██╔██╗██║██║░╚███╔╝░█████╗░░██║
  ██╔═══╝░██╔══██║██║░░██║██╔══╝░░██║╚████║██║░██╔██╗░██╔══╝░░██║
  ██║░░░░░██║░░██║╚█████╔╝███████╗██║░╚███║██║██╔╝╚██╗██║░░░░░██║
  ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚══════╝╚═╝░░╚══╝╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝
  `;
  console.log(art);
  
  // Initialize readline for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });