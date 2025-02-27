import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Testimonials } from './components/sections/Testimonials';
import { BlogList } from './pages/blog/BlogList';
import { BlogPost } from './pages/blog/BlogPost';
import { Contact } from './components/sections/Contact';
import { Success } from './pages/booking/Success';
import { Cancel } from './pages/booking/Cancel';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Footer } from './components/ui/Footer';
import { ROUTES, isBookingRoute, isBlogRoute } from './utils/routes';
import { useHashScroll } from './utils/scroll';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function MainLayout() {
  useHashScroll();

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <BlogList />
        <Contact />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default function App() {
  useEffect(() => {
    const path = window.location.pathname;
    if (isBookingRoute(path)) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/blog/:id" element={<BlogPost id={1} />} />
        <Route path="/booking/success" element={<Success />} />
        <Route path="/booking/cancel" element={<Cancel />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}