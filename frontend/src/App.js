import React, { useState, useEffect } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { BrowserProvider } from 'ethers';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import SolverPage from './pages/SolverPage';
import HomePage from './pages/HomePage';
import LoadingPopup from './components/LoadingPopup';

const clientId = 'VYDh3cKkTV6gUfFHQAuzV87ZKHo6Vd6t';

const App = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router's navigation hook
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0xaa36a7',
            rpcTarget:
              'https://eth-sepolia.g.alchemy.com/v2/tiEhnsFVpY2MVCkwQHUsKReA5RGhS0x2',
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();

        if (web3auth.status === 'connected') {
          const provider = await web3auth.connect();
          setProvider(provider);
          const browserProvider = new BrowserProvider(provider);
          const signer = await browserProvider.getSigner();
          // setAddress(await signer.getAddress());
          const user = await web3auth.getUserInfo();
          setUserData(user);
          // navigate("/chat"); // Navigate to Chat page on successful login
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      const browserProvider = new BrowserProvider(web3authProvider);
      const signer = await browserProvider.getSigner();
      setAddress(await signer.getAddress());
      const user = await web3auth.getUserInfo();
      setUserData(user);
      navigate('/chat'); // Navigate to Chat page on successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await web3auth.logout();
    setProvider(null);
    setAddress('');
    setUserData({});
    navigate('/'); // Navigate back to the login page
  };

  if (loading) {
    return <LoadingPopup />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/user"
        element={
          <AuthPage
            address={address}
            userData={userData}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        }
      />

      <Route path="/solver" element={<SolverPage />} />
      <Route
        path="/chat"
        element={<ChatPage provider={provider} address={address} />}
      />
    </Routes>
  );
};

export default App;
