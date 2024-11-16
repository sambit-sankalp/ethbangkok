import { useEffect, useState } from 'react';
import LoadingPopup from './LoadingPopup';
import FetchingSolutionsPopup from './FetchingPopup';

const Card = ({ title, description, transactionData, options }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isFetching, setFetching] = useState(false); // Track loading state

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Confirmed with ${selectedOption || 'No option selected'}!`);
      setIsLoading(false);
      setIsPopupOpen(false);
    }, 4000); // Simulate loading for 4 seconds
  };

  useEffect(() => {
    setTimeout(() => {
      setFetching(false);
      setIsPopupOpen(true);
    }, 4000); // Simulate loading for 4 seconds
  }, [isFetching]);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setFetching(true)} // Open popup on card click
        className="p-4 bg-card-background rounded-2xl shadow-lg mb-4 hover:scale-[1.02] transition-transform cursor-pointer"
      >
        {/* Title */}
        <h3 className="text-xl font-bold text-headline mb-2">{title}</h3>
        {/* Description */}
        <p className="text-sm text-sub-headline">{description}</p>
      </div>

      {/* Loading Popup */}
      {isFetching && <FetchingSolutionsPopup />}

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-card-background p-6 rounded-2xl shadow-2xl w-[450px] max-w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Popup Header */}
            <h4 className="text-xl font-bold text-headline mb-6">{title}</h4>

            {/* Options Section */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-300 mb-3">
                Select an Option
              </h5>
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

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className={`mt-6 w-full px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                selectedOption
                  ? 'bg-[#7f5af0] text-white hover:bg-[#6943d6]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedOption} // Disable if no option selected
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
