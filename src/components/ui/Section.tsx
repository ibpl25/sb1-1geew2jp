import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Divider } from './Divider';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'italian';
}

export function Section({ 
  title, 
  subtitle, 
  fullWidth, 
  variant = 'default',
  children, 
  className, 
  ...props 
}: SectionProps) {
  return (
    <section 
      className={clsx(
        'pt-24 pb-16 md:pt-28 md:pb-20',
        variant === 'italian' && 'bg-cream-50 bg-italian-pattern',
        className
      )} 
      {...props}
    >
      <div className={clsx(fullWidth ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8')}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          {variant === 'italian' && (
            <span className="text-green-700 font-normal italic block text-xl mb-1">
              Our Services
            </span>
          )}
          <h2 className={clsx(
            'text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight mb-2',
            variant === 'italian' ? 'text-green-700' : 'text-gray-900'
          )}>
            {variant === 'italian' ? 'Learn Italian with Us' : title}
          </h2>
          <Divider color="green" />
          {subtitle && (
            <p className={clsx(
              'text-lg max-w-3xl mx-auto font-serif mt-2',
              variant === 'italian' ? 'text-gray-700' : 'text-gray-600 italic'
            )}>
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}