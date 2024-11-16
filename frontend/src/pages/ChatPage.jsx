import { Web3Auth } from '@web3auth/modal';
import Chatbot from '../components/Chatbot';
import { useEffect, useState } from 'react';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';

function Chat() {
  const clientId = 'VYDh3cKkTV6gUfFHQAuzV87ZKHo6Vd6t'; // Replace with your Web3Auth Client ID
  const [provider, setProvider] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0xaa36a7', // Sepolia Testnet Chain ID
            rpcTarget:
              'https://eth-sepolia.g.alchemy.com/v2/tiEhnsFVpY2MVCkwQHUsKReA5RGhS0x2', // RPC URL for Sepolia
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();

        if (web3auth.status === 'connected') {
          const web3authProvider = await web3auth.connect();
          setProvider(web3authProvider);
        }
      } catch (error) {
        console.error('Web3Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initWeb3Auth();
  }, []);

  const handleLogout = async () => {
    try {
      if (web3auth) {
        await web3auth.logout();
      }
      setProvider(null);
      setAddress('');
      setUserData({});
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen text-main">
      {/* Header */}
      <Navbar />

      {/* Chat Section */}
      <div className="w-full flex flex-col min-h-[90vh] bg-[#16161a] text-headline">
        {loading ? (
          <div className="flex items-center justify-center h-full text-sub-headline">
            Initializing Web3Auth...
          </div>
        ) : (
          <Chatbot provider={provider} />
        )}
      </div>
    </div>
  );
}

export default Chat;
