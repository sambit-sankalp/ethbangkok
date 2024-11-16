import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 shrink-0 z-20 bg-[#16161a] shadow-md">
      <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-6">
        {/* Website Name */}
        <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-lg">
          Phoenix
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 tracking-wide">
            Fi
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/user">
            <button className="px-5 py-2 bg-white border-2 border-white text-black font-medium text-sm rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black shadow-md transition-all">
              User
            </button>
          </Link>
          <button
            onClick={() => window.open('https://example.com/solver', '_blank')}
            className="px-5 py-2 bg-transparent border-2 border-white text-white font-medium text-sm rounded-full hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black shadow-md transition-all"
          >
            Solver
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
