import React, { useState, useEffect } from 'react';
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
} from '@web3auth/base';
import { BrowserProvider } from 'ethers';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { decodeToken, Web3Auth } from '@web3auth/single-factor-auth';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
} from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

// const clientId = 'VYDh3cKkTV6gUfFHQAuzV87ZKHo6Vd6t';
// IMP START - Blockchain Calls
import RPC from './ethersRPC';
// import RPC from "./viemRPC";
// import RPC from "./web3RPC";
// IMP END - Blockchain Calls
// IMP START - Dashboard Registration
const clientId =
  'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ'; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration
// IMP START - Verifier Creation
const verifier = 'w3a-firebase-demo';
// IMP END - Verifier Creation
// IMP START - Chain Config
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0xaa36a7',
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: 'Ethereum Sepolia Testnet',
  blockExplorerUrl: 'https://sepolia.etherscan.io',
  ticker: 'ETH',
  tickerName: 'Ethereum',
  logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
};
// IMP END - Chain Config
// IMP START - SDK Initialization
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});
const web3auth = new Web3Auth({
  clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});
// IMP END - SDK Initialization
// IMP START - Auth Provider Login
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0nd9YsPLu-tpdCrsXn8wgsWVAiYEpQ_E',
  authDomain: 'web3auth-oauth-logins.firebaseapp.com',
  projectId: 'web3auth-oauth-logins',
  storageBucket: 'web3auth-oauth-logins.appspot.com',
  messagingSenderId: '461819774167',
  appId: '1:461819774167:web:e74addfb6cc88f3b5b9c92',
};

const App = () => {
  // const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState({});
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router's navigation hook

  const [loggedIn, setLoggedIn] = useState(false);
  // Firebase Initialisation
  const app = initializeApp(firebaseConfig);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const web3auth = new Web3Auth({
  //         clientId,
  //         chainConfig: {
  //           chainNamespace: CHAIN_NAMESPACES.EIP155,
  //           chainId: '0xaa36a7',
  //           rpcTarget:
  //             'https://eth-sepolia.g.alchemy.com/v2/tiEhnsFVpY2MVCkwQHUsKReA5RGhS0x2',
  //         },
  //       });

  //       setWeb3auth(web3auth);
  //       await web3auth.initModal();

  //       if (web3auth.status === 'connected') {
  //         const provider = await web3auth.connect();
  //         setProvider(provider);
  //         const browserProvider = new BrowserProvider(provider);
  //         const signer = await browserProvider.getSigner();
  //         // setAddress(await signer.getAddress());
  //         const user = await web3auth.getUserInfo();
  //         setUserData(user);
  //         // navigate("/chat"); // Navigate to Chat page on successful login
  //       }
  //     } catch (error) {
  //       console.error('Initialization error:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   init();
  // }, [navigate]);

  // const handleLogin = async () => {
  //   try {
  //     const web3authProvider = await web3auth.connect();
  //     setProvider(web3authProvider);
  //     const browserProvider = new BrowserProvider(web3authProvider);
  //     const signer = await browserProvider.getSigner();
  //     setAddress(await signer.getAddress());
  //     const user = await web3auth.getUserInfo();
  //     console.log(signer.getAddress());
  //     setUserData(user);
  //     navigate('/chat'); // Navigate to Chat page on successful login
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.init();
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function uiConsole(...args) {
    const el = document.querySelector('#console>p');
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  const login = async () => {
    try {
      if (!web3auth) {
        uiConsole('Web3Auth not initialized yet');
        return;
      }

      // Check if already connected
      if (provider) {
        toast.info('Already connected. Redirecting to chat page.');
        navigate('/chat');
        return;
      }

      // Auth Provider Login
      const loginRes = await signInWithGoogle();
      const idToken = await loginRes.user.getIdToken(true);
      const { payload } = decodeToken(idToken);

      // Web3Auth Login
      const web3authProvider = await web3auth.connect({
        verifier,
        verifierId: payload.sub,
        idToken,
      });

      if (web3authProvider) {
        setLoggedIn(true);
        setProvider(web3authProvider);
        navigate('/chat');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    await signOut(getAuth(app));
    setProvider(null);
    setLoggedIn(false);
    uiConsole('logged out');
  };

  // const handleLogout = async () => {
  //   await web3auth.logout();
  //   setProvider(null);
  //   setAddress('');
  //   setUserData({});
  //   navigate('/'); // Navigate back to the login page
  // };

  // if (loading) {
  //   return <LoadingPopup />;
  // }

  return (
    <>
      {/* Toast Notifications Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/user"
          element={<AuthPage handleLogin={login} handleLogout={logout} />}
        />
        <Route
          path="/chat"
          element={<ChatPage provider={provider} handleLogout={logout} />}
        />
      </Routes>
    </>
  );
};

export default App;
