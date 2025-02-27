import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function Card({ title, subtitle, children, className, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={clsx(
        'bg-white rounded-xl shadow-md overflow-hidden border border-gray-100',
        'transition-all duration-300 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="p-6 border-b border-gray-100">
          {title && <h3 className="text-xl font-semibold text-gray-900 font-serif">{title}</h3>}
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}