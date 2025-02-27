import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { isBlogRoute } from '../../utils/routes';

interface LogoProps {
  variant?: 'header' | 'footer' | 'dashboard';
}

export function Logo({ variant = 'header' }: LogoProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const opacityReverse = useTransform(scrollY, [0, 100], [0, 1]);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const isInBlog = isBlogRoute(window.location.pathname);

  if (variant === 'dashboard') {
    return (
      <div 
        className="w-[280px] h-[70px] cursor-pointer"
        onClick={handleLogoClick}
      >
        <img 
          src="https://i.ibb.co/GkTVsFm/Il-Bel-Paese-Linguistics-1.png"
          alt="Il Bel Paese Linguistics"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div 
        className="cursor-pointer select-none -ml-24"
        onClick={handleLogoClick}
        role="link"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleLogoClick();
        }}
        aria-label="Return to homepage"
      >
        <div className="w-[400px] h-[100px]">
          <img 
            src="https://i.ibb.co/GkTVsFm/Il-Bel-Paese-Linguistics-1.png"
            alt="Il Bel Paese Linguistics - Return to homepage"
            className="w-full h-full object-contain brightness-0 invert"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative cursor-pointer select-none -ml-8 sm:-ml-12 md:-ml-16 lg:-ml-24"
      onClick={handleLogoClick}
      role="link"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleLogoClick();
      }}
      aria-label="Return to homepage"
    >
      <div className="w-[200px] h-[50px] md:w-[250px] md:h-[60px] lg:w-[300px] lg:h-[70px]">
        {isInBlog ? (
          <img 
            src="https://i.ibb.co/GkTVsFm/Il-Bel-Paese-Linguistics-1.png"
            alt="Il Bel Paese Linguistics - Return to homepage"
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <motion.img 
              style={{ opacity }}
              src="https://i.ibb.co/GkTVsFm/Il-Bel-Paese-Linguistics-1.png"
              alt="Il Bel Paese Linguistics - Return to homepage"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <motion.img 
              style={{ opacity: opacityReverse }}
              src="https://i.ibb.co/GkTVsFm/Il-Bel-Paese-Linguistics-1.png"
              alt="Il Bel Paese Linguistics - Return to homepage"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </>
        )}
      </div>
    </div>
  );
}