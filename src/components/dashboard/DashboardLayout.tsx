import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onNavigate: (view: string) => void;
}

export function DashboardLayout({ children, onNavigate }: DashboardLayoutProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Set up session timeout
    let timeoutId: number;

    const resetTimeout = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        // Handle session timeout
        window.location.href = '/';
      }, 30 * 60 * 1000); // 30 minutes
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimeout));
    resetTimeout();

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, resetTimeout));
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" />
      </div>
    );
  }

  if (!user) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={onNavigate} />
      <main className="flex-1 p-8 lg:ml-64">
        {children}
      </main>
    </div>
  );
}