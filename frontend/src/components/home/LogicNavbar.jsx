import React from 'react';

const LogicNavbar = ({ handleLogout }) => {
  return (
    <header className="w-full sticky top-0 shrink-0 z-20 bg-[#16161a] shadow-md">
      <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-6">
        {/* Website Name */}
        <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-lg">
          Intent
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 tracking-wide">
            Flow
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-2 px-4 py-2 border border-gray-500 rounded-full bg-[#242629] text-white text-sm shadow-md">
                <span className="font-semibold">Hi,</span>
                <span>
                0x495...73D6
                </span>
              </span>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-white border-2 border-white text-black font-medium text-sm rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black shadow-md transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default LogicNavbar;
