import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { StarRating } from './StarRating';
import type { TestimonialType } from '../../types';

interface TestimonialProps {
  testimonial: TestimonialType;
  index: number;
}

export function Testimonial({ testimonial, index }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg p-8 relative group hover:shadow-xl transition-shadow duration-300"
    >
      <Quote className="absolute top-4 right-4 w-8 h-8 text-green-100 transition-colors duration-300 group-hover:text-green-200" />
      <div className="relative">
        <StarRating rating={testimonial.rating} className="mb-4" />
        <p className="text-gray-600 mb-6 italic leading-relaxed">{testimonial.text}</p>
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
        </div>
      </div>
    </motion.div>
  );
}