import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  CreditCard,
  History,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../ui/Logo';
import { clsx } from 'clsx';

interface SidebarProps {
  onNavigate: (view: string) => void;
}

const navigation = [
  { name: 'Overview', view: '/', icon: User },
  { name: 'Schedule', view: '/schedule', icon: Calendar },
  { name: 'Payments', view: '/payments', icon: CreditCard },
  { name: 'History', view: '/history', icon: History },
  { name: 'Settings', view: '/settings', icon: Settings }
];

export function Sidebar({ onNavigate }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleNavigation = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const getIsActive = (view: string) => {
    if (view === '/' && location.pathname === '/dashboard') return true;
    return location.pathname === `/dashboard${view}`;
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:shadow-none',
        'transform transition-transform duration-300 ease-in-out lg:transform-none',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-center">
            <Link to="/" className="flex items-center justify-center">
              <Logo variant="dashboard" />
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/"
              className="flex items-center w-full px-4 py-2.5 text-gray-600 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors mb-2"
            >
              <Home className="w-5 h-5 mr-3" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="h-px bg-gray-200 my-2" />

            {navigation.map((item) => {
              const isActive = getIsActive(item.view);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.view)}
                  className={clsx(
                    'flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200',
                    'hover:bg-green-50 hover:text-green-700',
                    isActive 
                      ? 'bg-green-50 text-green-700 shadow-sm' 
                      : 'text-gray-600'
                  )}
                >
                  <item.icon className={clsx(
                    'w-5 h-5 mr-3 transition-transform duration-200',
                    isActive && 'scale-110'
                  )} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="ml-auto w-1.5 h-5 bg-green-700 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2.5 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}
    </>
  );
}