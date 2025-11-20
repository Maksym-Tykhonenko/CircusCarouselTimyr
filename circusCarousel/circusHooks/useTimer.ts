import { useEffect, useRef, useState } from 'react';

export function useTimer(
  isActive: boolean,
  initial: number,
  onFinished: () => void,
) {
  const [seconds, setSeconds] = useState(initial);
  const savedInitial = useRef(initial);

  useEffect(() => {
    savedInitial.current = initial;
  }, [initial]);

  useEffect(() => {
    if (!isActive) {
      setSeconds(savedInitial.current);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinished();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onFinished]);

  return seconds;
}



