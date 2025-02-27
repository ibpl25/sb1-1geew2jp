import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './Button';
import type { CourseType } from '../../types';

interface CourseCardProps {
  course: CourseType;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 font-serif">{course.title}</h3>
        <p className="text-3xl font-bold text-green-700 mb-1">{course.price}</p>
        <p className="text-gray-600">per {course.duration}</p>
      </div>
      <ul className="space-y-4 mb-8">
        {course.features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className="w-5 h-5 text-green-700 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant="primary" className="w-full">
        Get Started
      </Button>
    </motion.div>
  );
}