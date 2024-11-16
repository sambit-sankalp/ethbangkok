import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FetchingSolutionsPopup = () => {
  const iconRef = useRef(null);

  useEffect(() => {
    // Bounce animation for the fetching solutions icon
    gsap.fromTo(
      iconRef.current,
      { y: 0 },
      {
        y: -20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 0.8,
      }
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center text-white flex flex-col items-center gap-6">
        {/* Bouncing Icon */}
        <div className="relative">
          <img
            ref={iconRef}
            src="/images/dbfetch.png"
            alt="Solutions"
            className="h-20 w-20 rounded-full shadow-md"
          />
        </div>

        {/* Fetching Text */}
        <p className="mt-0 text-lg font-bold text-gray-300 animate-pulse">
          Fetching the solutions...
        </p>
      </div>
    </div>
  );
};

export default FetchingSolutionsPopup;
