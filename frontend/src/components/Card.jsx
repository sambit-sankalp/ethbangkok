import { useEffect, useState } from 'react';
import LoadingPopup from './LoadingPopup';
import FetchingSolutionsPopup from './FetchingPopup';

const Card = ({ title, description, transactionData, options, status, updateStatus }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Confirmed with ${selectedOption || 'No option selected'}!`);
      setIsLoading(false);
      setIsPopupOpen(false);
    }, 4000); 
  };

  useEffect(() => {
    setTimeout(() => {
      updateStatus('completed');
    }, 10000);
    // if (!isFetching) return;
    // setTimeout(() => {
      // setFetching(false);
      // setIsPopupOpen(true);
    // }, 4000);
  }, [isFetching]);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setFetching(true)}
        className={`p-4 rounded-2xl shadow-lg mb-4 transition-transform cursor-pointer ${
          status === 'completed' ? 'bg-black' : 'bg-card-background'
        }`}
      >
        {/* Title */}
        <h3 className="text-xl font-bold text-headline mb-2">ARB - ETH</h3>
        {/* Transaction Details */}
        <div className={`mt-4 text-sm text-gray-400 ${
          status === 'completed' ? 'bg-black' : 'bg-card-background'
        }`}>
          <p><strong>Source Address:</strong> 0x57...5a44</p>
          <p><strong>From Network:</strong> Arbitrum</p>
          <p><strong>To Network:</strong> Ethereum</p>
          <p><strong>From Asset:</strong> ETH</p>
          <p><strong>To Asset:</strong> USDC</p>
        </div>
        {/* Status */}
        <p
          className={`mt-4 text-sm font-medium ${
            status === 'completed' ? 'text-green-500' : 'text-gray-400'
          }`}
        >
          Status: {status}
        </p>
      </div>

      {/* Loading Popup */}
      {isFetching && <FetchingSolutionsPopup />}

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-card-background p-6 rounded-2xl shadow-2xl w-[450px] max-w-full relative">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>
            <h4 className="text-xl font-bold text-headline mb-6">{title}</h4>
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-300 mb-3">Select an Option</h5>
              <div className="flex flex-col gap-3">
                {options.map(({ option, address }, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center px-4 py-2 rounded-lg transition-all border-2 ${
                      selectedOption === option
                        ? 'bg-[#6943d6] text-white border-[#6943d6]'
                        : 'bg-transparent text-gray-400 border-[#6943d6] hover:bg-[#6943d6] hover:text-white'
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    <span className="text-sm font-medium">{option}</span>
                    <span className="text-base text-gray-300">{address}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleConfirm}
              className={`mt-6 w-full px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                selectedOption
                  ? 'bg-[#7f5af0] text-white hover:bg-[#6943d6]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedOption}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {isLoading && <LoadingPopup />}
    </>
  );
};

export default Card;