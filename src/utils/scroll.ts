import { useEffect } from 'react';
import { isBlogRoute } from './routes';

export function scrollToSection(id: string) {
  // If we're on a blog page, redirect to homepage with hash
  if (isBlogRoute(window.location.pathname)) {
    window.location.href = `/#${id}`;
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export function useHashScroll() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        requestAnimationFrame(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);
}