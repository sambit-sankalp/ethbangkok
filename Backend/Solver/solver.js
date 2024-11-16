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
  
  // Define the server URL and socket connection
  const SERVER_URL = 'http://localhost:3001'; // Update this if your server is on a different URL
  const socket = io(SERVER_URL);
  
  // Ethereum provider setup
  const INFURA_PROJECT_ID = '50b156a9977746479bc5f3f748348ac4'; // Replace with your Infura Project ID
  const provider = new ethers.providers.InfuraProvider('sepolia', INFURA_PROJECT_ID); // Use 'mainnet' for mainnet
  
  // Create a signer
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  // Smart contract address and ABI
  const contractAddress = '0x7c177Af5c883F793FC9d36572c3e8C23d9f21D72'; // Replace with your deployed contract address
  const contractABI = [
    // ABI of your contract
    {
      inputs: [],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    // Add other functions if needed
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to get a valid quote from the user
async function getValidQuote(maxQuote) {
  return new Promise((resolve) => {
    rl.question('Enter quote: ', (quote) => {
      quote = parseFloat(quote);
      if (quote > maxQuote) {
        console.error(`❌ Quote exceeds the maximum allowed value of ${maxQuote}. Please try again.`);
        resolve(getValidQuote(maxQuote)); // Recursively prompt for a valid quote
      } else {
        resolve(quote); // Return the valid quote
      }
    });
  });
}

// Function to get or initialize solver's reputation
async function getSolverReputation(competitorId) {
  const reputationRef = db.collection('solver_reputation').doc(competitorId);
  const reputationDoc = await reputationRef.get();

  if (!reputationDoc.exists) {
    // Initialize reputation to 0
    await reputationRef.set({ reputation: 0 });
    return 0;
  } else {
    const data = reputationDoc.data();
    return data.reputation;
  }
}

// Function to update solver's reputation
async function updateSolverReputation(competitorId, delta) {
  const reputationRef = db.collection('solver_reputation').doc(competitorId);
  await reputationRef.update({
    reputation: admin.firestore.FieldValue.increment(delta),
  });
}

rl.question('Enter your ID: ', async (competitorId) => {
    try {
      // Check if solver is blocked
      const reputation = await getSolverReputation(competitorId);
      if (reputation <= -3) {
        console.error('❌ You are blocked from participating due to low reputation.');
        rl.close();
        return;
      }
  
      rl.question('Enter intent id: ', async (intentId) => {
        try {
          // Fetch the order details
          const orderResponse = await axios.get(`${SERVER_URL}/orders/${intentId}`);
          const order = orderResponse.data;
  
          const { amount, slippage_tolerance } = order;
          const maxQuote = amount * slippage_tolerance;
  
          console.log(`\nOrder Details:`);
          console.log(`Amount: ${amount}, Slippage Tolerance: ${slippage_tolerance}`);
          console.log(`Maximum Allowed Quote: ${maxQuote}\n`);
  
          // Get a valid quote
          const quote = await getValidQuote(maxQuote);
  
          // Start loading animation
          loadingAnimation(5);
  
          // After the loading animation, submit the quote and start listening for winner notifications
          setTimeout(async () => {
            console.log(`\nYou entered intent ID: ${intentId}`);
            console.log(`You entered quote: "${quote}"`);
  
            // Submit the quote
            try {
              const response = await axios.post(`${SERVER_URL}/quotes`, {
                orderId: intentId,
                competitorId: competitorId,
                quote: quote,
              });
  
              console.log(response.data.message);
  
              // Join the room for the intentId to receive real-time updates
              socket.emit('join_order', intentId);
  
              // Listen for the winner announcement
              socket.on('winner', async (data) => {
                if (data.competitorId === competitorId) {
                  console.log(`\n🎉 Congratulations! You are the winner with a quote of ${data.quote}`);
                  // Trigger the deposit function
                  try {
                    const tx = await contract.deposit({
                      value: ethers.utils.parseEther('0.0001'), // Specify the amount to deposit
                      gasLimit: 100000, // Adjust gas limit as needed
                    });
                    console.log('Transaction sent. Waiting for confirmation...');
                    await tx.wait();
                    console.log('✅ Deposit transaction successful!');
                  } catch (txError) {
                    console.error('❌ Transaction failed:', txError);
                    // Decrement reputation
                    await updateSolverReputation(competitorId, -1);
                    console.log('Your reputation has been decreased due to transaction failure.');
  
                    // Check if reputation is below threshold
                    const newReputation = await getSolverReputation(competitorId);
                    if (newReputation <= -3) {
                      console.error('❌ You have been blocked from participating due to low reputation.');
                    }
                  }
                } else {
                  console.log(`\nSorry, the winner is Competitor ID: ${data.competitorId} with a quote of ${data.quote}`);
                }
                rl.close();
                socket.disconnect();
              });
  
              console.log('Waiting for winner announcement...');
            } catch (error) {
              console.error('Error submitting quote:', error.response?.data || error.message);
              rl.close();
              socket.disconnect();
            }
          }, 5000);
        } catch (error) {
          console.error('Error fetching order details:', error.response?.data || error.message);
          rl.close();
        }
      });
    } catch (error) {
      console.error('Error retrieving reputation:', error.message);
      rl.close();
    }
  });
  