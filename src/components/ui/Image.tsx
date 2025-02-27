import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lowQuality?: string;
}

export function Image({ src, alt, className, lowQuality, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src]);

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {lowQuality && !loaded && !error && (
        <img
          src={lowQuality}
          alt={alt}
          className={`${className} blur-sm`}
          {...props}
        />
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="lazy"
          {...props}
        />
      )}
    </motion.div>
  );
}