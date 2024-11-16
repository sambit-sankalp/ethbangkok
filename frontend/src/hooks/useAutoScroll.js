import { useEffect, useRef, useState } from 'react';

function useAutoScroll(messages) {
  const scrollContentRef = useRef(null);
  const [disableAutoScroll, setDisableAutoScroll] = useState(false);

  useEffect(() => {
    const container = scrollContentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
      setDisableAutoScroll(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!disableAutoScroll) {
      const container = scrollContentRef.current;
      container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, disableAutoScroll]);

  return scrollContentRef;
}

export default useAutoScroll;
