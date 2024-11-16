import sendIcon from '../assets/images/send.svg';
import useAutosize from '../hooks/useAutosize';
import { useRef } from 'react';

function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage }) {
  const textareaRef = useAutosize(newMessage);
  const containerRef = useRef(null);

  // Focus the textarea when clicking on the input container
  const handleContainerClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  };

  return (
    <div className="sticky bottom-0 bg-background py-4">
      {/* Input Container */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="relative flex items-center bg-card-background rounded-full shadow-lg border border-secondary focus-within:ring-2 focus-within:ring-highlight cursor-text pl-4 py-2 pr-4"
      >
        {/* Auto-sizing Textarea */}
        <textarea
          ref={textareaRef}
          className="flex-grow max-h-[100px] py-1 px-2 bg-card-background text-headline placeholder:text-sub-headline rounded-full focus:outline-none"
          rows="1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{ resize: 'none' }} // Prevent resizing for cleaner UI
        />

        {/* Send Button */}
        <button
          onClick={submitNewMessage}
          disabled={isLoading || !newMessage.trim()}
          className={`flex-shrink-0 h-10 px-4 flex items-center gap-2 text-[#16161a] font-semibold text-sm rounded-full transition-colors 
    bg-[#fff]
    ${(isLoading || !newMessage.trim()) && 'opacity-50 cursor-not-allowed'}`}
        >
          <span>Send</span>
          <img src={sendIcon} alt="Send" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
