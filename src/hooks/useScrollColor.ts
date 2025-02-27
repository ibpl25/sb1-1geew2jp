import { useState, useEffect } from 'react';

export function useScrollColor(threshold = 100): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeDark = window.scrollY > threshold;
      setIsDark(shouldBeDark);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isDark;
}