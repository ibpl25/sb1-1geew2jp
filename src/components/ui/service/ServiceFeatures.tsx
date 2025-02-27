import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ServiceFeaturesProps {
  features: string[];
  highlight?: boolean;
}

export function ServiceFeatures({ features, highlight }: ServiceFeaturesProps) {
  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <motion.li 
          key={feature}
          className="flex items-start gap-2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            highlight ? 'text-green-700' : 'text-gray-600'
          }`} />
          <span className="text-sm text-gray-600 leading-tight">{feature}</span>
        </motion.li>
      ))}
    </ul>
  );
}