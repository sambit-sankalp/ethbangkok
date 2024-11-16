import Markdown from 'react-markdown';
import userIcon from '../assets/images/boy.svg';
import errorIcon from '../assets/images/error.svg';
import useAutoScroll from '../hooks/useAutoScroll';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const messageVariants = {
  hidden: (custom) => ({
    opacity: 0,
    scale: 0.5,
    x: custom === 'user' ? 20 : -20,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    x: -20,
  },
};

const LoadingDots = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const dots = loaderRef.current.querySelectorAll('.dot');
    gsap.to(dots, {
      y: -10,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 0.5,
    });
  }, []);

  return (
    <div ref={loaderRef} className="flex gap-2">
      <div className="dot w-3 h-3 bg-[#7f5af0] rounded-full"></div>
      <div className="dot w-3 h-3 bg-[#ff477e] rounded-full"></div>
      <div className="dot w-3 h-3 bg-[#2cb67d] rounded-full"></div>
    </div>
  );
};
const NoMessagesPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.img
        src="/images/chatbot-g.png"
        alt="chatbot"
        className="h-28 w-28 mb-2 bg-[#16161a] rounded-full p-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.p
        className="text-sub-headline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        No messages yet! Start the conversation.
      </motion.p>
    </div>
  );
};

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(messages);

  return (
    <div
      ref={scrollContentRef}
      className={`grow space-y-6 px-4 py-6 min-h-[35vh] min-w-full rounded-lg bg-background text-headline ${
        messages.length === 0
          ? 'flex justify-center items-center overflow-hidden'
          : 'overflow-y-auto'
      }`}
      style={{ maxHeight: '100%' }}
    >
      {messages.length === 0 ? (
        <NoMessagesPlaceholder />
      ) : (
        messages.map(({ role, content, loading, error }, idx) => (
          <motion.div
            key={idx}
            custom={role}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`flex ${
              role === 'user' ? 'justify-end' : 'justify-start'
            } items-end gap-3`}
          >
            {role !== 'user' && (
              <img
                className="h-10 w-10 rounded-full bg-[#16161a] p-0.5 shrink-0"
                src="/images/chatbot-g.png"
                alt="assistant"
              />
            )}
            <div
              className={`flex flex-col px-4 py-3 rounded-2xl shadow-md ${
                role === 'user'
                  ? 'bg-[#9b5de5] text-main rounded-br-none'
                  : 'bg-card-background text-sub-headline rounded-bl-none'
              }`}
              style={{
                maxWidth: '75%',
                wordBreak: 'break-word',
              }}
            >
              <div className="markdown-container">
                {loading && !content ? (
                  <LoadingDots />
                ) : role === 'assistant' ? (
                  <Markdown className="text-gray-300">{content}</Markdown>
                ) : (
                  <div className="whitespace-pre-line">{content}</div>
                )}
              </div>
              {error && (
                <div
                  className={`flex items-center gap-1 text-sm text-red-500 ${
                    content && 'mt-2'
                  }`}
                >
                  <img className="h-5 w-5" src={errorIcon} alt="error" />
                  <span>Error generating the response</span>
                </div>
              )}
            </div>
            {role === 'user' && (
              <img
                className="h-10 w-10 rounded-full shrink-0"
                src={userIcon}
                alt="user"
              />
            )}
          </motion.div>
        ))
      )}
    </div>
  );
}

export default ChatMessages;
