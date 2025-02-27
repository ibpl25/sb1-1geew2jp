import { Menu } from 'lucide-react';
import { useScrollColor } from '../../../hooks/useScrollColor';
import { isBlogRoute } from '../../../utils/routes';

interface MenuIconProps {
  onClick: () => void;
}

export function MenuIcon({ onClick }: MenuIconProps) {
  const isDark = useScrollColor();
  const isInBlog = isBlogRoute(window.location.pathname);

  // Always use dark color in blog pages, otherwise use scroll-based color
  const iconColor = isInBlog || isDark ? 'text-gray-900' : 'text-white';

  return (
    <button
      onClick={onClick}
      className="p-3 rounded-lg backdrop-blur-sm transition-all duration-300"
      aria-label="Toggle menu"
    >
      <Menu 
        className={`h-6 w-6 transition-colors duration-300 ${iconColor}`}
      />
    </button>
  );
}