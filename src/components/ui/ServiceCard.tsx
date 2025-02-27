import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import type { ServiceType } from '../../types';

interface ServiceCardProps {
  service: ServiceType;
  onBook: () => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  // Get the starting price from the lowest priced option
  const startingPrice = service.options.reduce((min, option) => {
    if ('options' in option) {
      // Handle grouped options
      const prices = option.options.map(opt => parseInt(opt.price.replace(/[^0-9]/g, '')));
      const minGroupPrice = Math.min(...prices);
      return minGroupPrice < min ? minGroupPrice : min;
    }
    // Handle regular options
    const price = parseInt(option.price.replace(/[^0-9]/g, ''));
    return price < min ? price : min;
  }, Infinity);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 group h-full"
    >
      <div className="relative h-40">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h3 className="text-2xl font-bold text-white font-serif mb-1">
            {service.title}
          </h3>
          <p className="text-white/90 text-sm">
            {service.title === 'Private Lessons' ? 'Starting from $55' : `Starting from $${startingPrice}`}
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        <Button
          variant="primary"
          className="w-full py-2 bg-green-700 hover:bg-green-800 transition-colors duration-300 group"
          onClick={onBook}
        >
          View Options
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}