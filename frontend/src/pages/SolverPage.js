import { Web3Auth } from '@web3auth/modal';
import { useEffect, useState } from 'react';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Navbar from '../components/home/Navbar';

function SolverPage() {
  const clientId = 'VYDh3cKkTV6gUfFHQAuzV87ZKHo6Vd6t'; // Replace with your Web3Auth Client ID
  const [provider, setProvider] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]); // State for orders
  const navigate = useNavigate();

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0xaa36a7', // Sepolia Testnet Chain ID
            rpcTarget:
              'https://eth-sepolia.g.alchemy.com/v2/tiEhnsFVpY2MVCkwQHUsKReA5RGhS0x2', // RPC URL for Sepolia
          },
        });

        setWeb3auth(web3authInstance);
        await web3authInstance.initModal();
      } catch (error) {
        console.error('Web3Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initWeb3Auth();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/orders'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = async () => {
    if (web3auth) {
      try {
        await web3auth.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    // Clear state
    setProvider(null);
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="min-h-screen to-[#242629] text-main">
      {/* Header */}
      <Navbar />

      {/* Chat Section */}
      <div className="w-full flex flex-col min-h-screen bg-background text-headline">
        {loading ? (
          <div className="flex items-center justify-center h-full text-sub-headline">
            Initializing Web3Auth...
          </div>
        ) : (
          <Table orders={orders} />
        )}
      </div>
    </div>
  );
}

export default SolverPage;
