import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingPopup = ({ iconSrc = '/images/chatbot-g.png' }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    // Rotate the chatbot icon
    gsap.to(iconRef.current, {
      rotate: 360,
      repeat: -1,
      ease: 'linear',
      duration: 2,
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center text-white flex flex-col items-center gap-6">
        {/* Rotating Chatbot Icon */}
        <div className="relative">
          <img
            ref={iconRef}
            src="/images/chatbot-g.png"
            alt="Chatbot"
            className="h-20 w-20 rounded-full shadow-md"
          />
        </div>

        {/* Loading Text */}
        <p className="mt-0 text-lg font-bold text-gray-300 animate-pulse">
          Processing your request...
        </p>
      </div>
    </div>
  );
};

export default LoadingPopup;
