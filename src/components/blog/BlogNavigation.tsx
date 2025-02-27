import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { scrollToSection } from '../../utils/scroll';

export function BlogNavigation() {
  const handleBackToBlog = () => {
    if (window.location.pathname === '/') {
      scrollToSection('blog');
      return;
    }

    window.location.href = '/#blog';
    requestAnimationFrame(() => {
      scrollToSection('blog');
    });
  };

  return (
    <Button
      variant="secondary"
      className="mb-8"
      onClick={handleBackToBlog}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Blog
    </Button>
  );
}