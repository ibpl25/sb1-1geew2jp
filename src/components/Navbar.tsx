import { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';
import { MenuIcon } from './ui/menu/MenuIcon';
import { AuthModal } from './auth/AuthModal';
import { useAuth } from '../hooks/useAuth';
import { scrollToSection } from '../utils/scroll';
import { isBlogRoute } from '../utils/routes';

interface NavItem {
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { scrollY } = useScroll();
  const { user, signOut } = useAuth();
  const isInBlog = isBlogRoute(window.location.pathname);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 1)']
  );
  
  const textColor = useTransform(
    scrollY,
    [0, 100],
    [isInBlog ? 'rgb(31, 41, 55)' : 'rgb(31, 41, 55)', 'rgb(31, 41, 55)']
  );

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  const handleAuthClick = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor }}
        className="fixed w-full z-50 transition-shadow backdrop-blur-sm border-b border-gray-200/50 py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute left-0 flex-shrink-0">
              <Logo />
            </div>
            
            <div className="hidden md:flex items-center justify-center flex-1 mx-auto">
              <div className="flex space-x-24">
                {navItems.map(({ label, id }) => (
                  <motion.button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    style={{ color: textColor }}
                    className="text-lg font-medium hover:text-green-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="absolute right-0 hidden md:flex items-center space-x-4">
              <Button 
                variant="primary"
                onClick={() => handleNavClick('services')}
              >
                Book Now
              </Button>
              <Button
                variant="secondary"
                onClick={handleAuthClick}
                icon={LogIn}
              >
                {user ? 'Dashboard' : 'Sign In'}
              </Button>
            </div>

            <div className="md:hidden absolute right-0">
              <MenuIcon onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white md:hidden z-40"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <Logo />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-900"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t space-y-4">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => handleNavClick('services')}
              >
                Book Now
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleAuthClick}
                icon={LogIn}
              >
                {user ? 'Dashboard' : 'Sign In'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}