import { clsx } from 'clsx';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';
  className?: string;
}

export function Typography({ children, variant = 'body', className }: TypographyProps) {
  const baseStyles = 'font-sans antialiased';
  
  const styles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold font-serif',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold font-serif',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold font-serif',
    h4: 'text-xl md:text-2xl lg:text-3xl font-bold font-serif',
    body: 'text-base md:text-lg leading-relaxed',
    small: 'text-sm md:text-base leading-relaxed',
  };

  const Component = variant.startsWith('h') ? variant : 'p';
  
  return (
    <Component className={clsx(baseStyles, styles[variant], className)}>
      {children}
    </Component>
  );
}