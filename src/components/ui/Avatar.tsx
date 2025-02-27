import { clsx } from 'clsx';

interface AvatarProps {
  variant?: 'circle' | 'square' | 'hexagon';
  className?: string;
}

export function Avatar({ variant = 'circle', className }: AvatarProps) {
  return (
    <div
      className={clsx(
        'w-20 h-20 flex items-center justify-center',
        variant === 'circle' && 'rounded-full',
        variant === 'square' && 'rounded-lg rotate-45',
        variant === 'hexagon' && 'clip-path-hexagon',
        'bg-gradient-to-br from-green-100 to-green-200',
        className
      )}
    >
      <div className={clsx(
        'text-2xl font-bold text-green-700',
        variant === 'square' && '-rotate-45'
      )}>
        IL
      </div>
    </div>
  );
}