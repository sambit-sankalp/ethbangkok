import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
const AuthPage = ({
  address,
  userData,
  handleLogin,
  handleLogout,
  loading,
}) => {
  const navigate = useNavigate();

  // Redirect to chat page if already logged in
  useEffect(() => {
    if (address) {
      navigate('/chat'); // Navigate to Chat page
    }
  }, [address, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-montserrat">
      {/* Navbar */}
      <Navbar />

      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-20 bg-[#16161a] text-white">
        <h1 className="text-5xl font-bold max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
          User Sign-In
        </h1>
        <p className="text-lg max-w-xl mt-4 text-gray-300">
          Sign in to chat with our AI assistant and create blockchain intents
          effortlessly.
        </p>

        <div className="mt-10">
          {/* Show Sign In Button if not logged in */}
          {!address ? (
            <button
              onClick={handleLogin}
              className="px-8 py-4 bg-white text-black rounded-xl text-lg font-semibold transform transition hover:scale-105 hover:brightness-110 shadow-lg"
            >
              Login with Social
            </button>
          ) : (
            <div className="mt-6">
              <p className="text-lg font-semibold">
                Welcome, {userData?.name || 'User'}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white rounded-xl text-lg font-semibold transform transition hover:scale-105 hover:brightness-110"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && <p className="mt-4 text-sm text-gray-400">Loading...</p>}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AuthPage;
