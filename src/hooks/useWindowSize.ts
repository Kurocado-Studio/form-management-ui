import { useEffect, useState } from 'react';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}
export type UseWindowSize = () => { size: WindowSize };

export const useWindowSize: UseWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const updateSize = (): void => {
      if (typeof window !== 'undefined') {
        const innerHeight = window.innerHeight;
        const innerWidth = window.innerWidth;

        setSize({ innerHeight, innerWidth });
      }
    };

    window.addEventListener('resize', updateSize);

    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { size };
};
