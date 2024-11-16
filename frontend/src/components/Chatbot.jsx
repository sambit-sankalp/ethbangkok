import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import api from '../api';
import Card from './Card';
import LoadingPopup from './LoadingPopup';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import { dummyABI } from '../contract_abis/dummyAbi';

function Chatbot({ provider }) {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');
  const [cardData, setCardData] = useState([]);
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [transactionData, setTransactionData] = useState({
    source_address: '',
    from_network: '',
    to_network: '',
    from_asset: '',
    to_asset: '',
    amount: '',
    slippage_tolerance: '',
    deadline: '',
    max_gas_fee: '',
  });

  // Simulated Transaction Data for "confirm"
  // const transactionData = {
  //   source_address: '0x123...',
  //   destination_address: '0x456...',
  //   from_network: 'Ethereum',
  //   to_network: 'Bitcoin',
  //   from_asset: 'ETH',
  //   to_asset: 'BTC',
  //   amount: '1.5 BTC',
  //   slippage_tolerance: '1%',
  //   deadline: '5 mins',
  //   max_gas_fee: '0.01 ETH',
  // };

  const isLoading = messages.length && messages[messages.length - 1].loading;

  console.log('messages', messages);

  // Handle sending a new message
  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    if (trimmedMessage.toLowerCase() === 'confirm') {
      // Show loading popup for 3 seconds, then show details popup
      setIsLoadingPopup(true);
      const contractAddress = '0x3693378DbbcB761dCF5d071Ab62547f6fBD9D075'; // Replace with your actual contract address
      const contractABI = dummyABI;

      try {
        const browserProvider = new BrowserProvider(provider); // Wrap the provider
        const signer = await browserProvider.getSigner(); // getSigner() is async
        const contract = new Contract(contractAddress, contractABI, signer); // Create the contract instance

        const tx = await contract.deposit({
          value: parseEther('0.000001'),
        }); // Send ETH to deposit function
        await tx.wait();

        const confirmation = await api.confirmTransaction(chatId);
        const { data } = confirmation;

        // Update transactionData state
        const newTransactionData = {
          source_address: data.parameters.source_address,
          from_network: data.parameters.from_network,
          to_network: data.parameters.to_network,
          from_asset: data.parameters.from_asset,
          to_asset: data.parameters.to_asset,
          amount: data.parameters.amount,
          slippage_tolerance: data.parameters.slippage_tolerance,
          deadline: data.parameters.deadline,
          max_gas_fee: data.parameters.max_gas_fee,
        };

        setTransactionData(newTransactionData); // Update the state with transaction data

        console.log('Updated transactionData:', newTransactionData);

        setIsLoadingPopup(false);
        setShowDetailsPopup(true);

        // Create a new order using the updated transaction data
        const createdOrder = await api.createOrder(newTransactionData);
        console.log('Order created successfully:', createdOrder);
      } catch (error) {
        console.error('Transaction failed:', error);
        alert('Transaction failed: ' + error.message);
      }

      setMessages((draft) => [
        ...draft,
        { role: 'user', content: trimmedMessage },
        { role: 'assistant', content: 'Thank you, your intent is stored.' },
      ]);
      setNewMessage('');

      if (!provider) {
        alert('Provider not available. Please log in.');
        return;
      }
      return;
    }

    // Normal message handling
    let chatIdOrNew = chatId;

    setMessages((draft) => [
      ...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', sources: [], loading: true },
    ]);
    setNewMessage('');

    try {
      // Create a chat session if it doesn't exist
      if (!chatId) {
        const { session_id } = await api.createChat();
        setChatId(session_id);
        chatIdOrNew = session_id;
      }

      // Send the message and handle the response
      const stream = await api.sendChatMessage(chatIdOrNew, trimmedMessage);
      setMessages((draft) => {
        draft[draft.length - 1].content += stream.response;
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  console.log('2 transactionData', transactionData);

  // Add transaction data to intents
  const addToIntents = () => {
    setCardData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: 'New Intent',
        description: 'Added via confirm command.',
        options: ['0.7 BTC', '1.2 BTC', '2.5 BTC'],
        transactionData,
      },
    ]);
    setShowDetailsPopup(false); // Close popup after adding
  };

  // Cleanup chat session on refresh/close
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (chatId) {
        try {
          await api.endSession(chatId);
        } catch (err) {
          console.error('Failed to end session:', err);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [chatId]);

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-start mt-10">
      <div className="relative max-w-4xl h-[80vh] flex flex-col gap-6 p-6 text-headline bg-background rounded-lg shadow-lg">
        {/* Welcome Message */}
        {messages.length === 0 ? (
          <>
            <div className="text-left font-urbanist text-sub-headline text-lg font-light space-y-2">
              <p>
                👋 <span className="text-headline font-semibold">Welcome!</span>
              </p>
              <p>
                I’m your Web3 assistant, powered by cutting-edge LLMs. From
                token swaps to bridging assets, I make blockchain simple and
                seamless.
              </p>
              <p>Ask away—let’s navigate Web3 together!</p>
            </div>
          </>
        ) : (
          <>
            <>
              <div className="text-left font-urbanist text-sub-headline text-lg font-light space-y-2">
                <p>
                  Great question! 🚀 I’m your Web3 assistant, here to make
                  everything from token swaps to bridging assets simple and
                  seamless—ask away!
                </p>
              </div>
            </>
          </>
        )}

        {/* Chat Messages */}
        <div className="flex-grow p-2 rounded-lg overflow-y-auto shadow-inner">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>

        {/* Chat Input */}
        <ChatInput
          newMessage={newMessage}
          isLoading={isLoading}
          setNewMessage={setNewMessage}
          submitNewMessage={submitNewMessage}
        />
      </div>

      <div className="ml-10 min-w-[400px] p-6 rounded-lg shadow-lg overflow-y-auto text-headline h-[80vh] bg-background">
        {/* Sidebar Heading */}
        <h2 className="text-xl font-bold mb-4">Your Intents</h2>

        {/* No Intents Message */}
        {cardData.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">No intents</p>
        ) : (
          // Render Cards
          cardData.map((card) => (
            <Card
              key={card.id}
              title="Intent Options"
              description="Choose your preferred intent from the available options."
              options={[
                { option: 'Option 1', address: '0x123...abc' },
                { option: 'Option 2', address: '0x456...def' },
                { option: 'Option 3', address: '0x789...ghi' },
              ]}
            />
          ))
        )}
      </div>

      {/* Loading Popup */}
      {isLoadingPopup && <LoadingPopup />}

      {/* Key-Value Pairs Popup */}
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-card-background p-6 rounded-lg shadow-xl w-[450px] max-w-full">
            {/* Title */}
            <h4 className="text-xl font-bold text-white mb-2 text-center">
              Transaction Details
            </h4>
            <p className="text-lg font-medium text-green-400 text-center mb-6">
              🎉 Hurray! Transaction successful!
            </p>

            {/* Transaction Data */}
            <div className="bg-background p-4 rounded-lg shadow-inner text-gray-300 mb-6">
              {Object.entries(transactionData).map(([key, value]) => {
                // Check for specific keys and truncate the value
                const displayValue =
                  key === 'source_address' && value
                    ? `${value.slice(0, 3)}...${value.slice(-3)}`
                    : value || 'N/A';

                return (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-600 py-2 last:border-none"
                  >
                    <span className="font-medium text-gray-400">{key}:</span>
                    <span className="text-gray-200">{displayValue}</span>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <button
              onClick={addToIntents}
              className="w-full px-4 py-2 bg-[#fff] text-black font-semibold rounded-md hover:bg-[#dadada] transition-all shadow-md"
            >
              Add to Intents
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
