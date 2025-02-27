import { Sparkles } from 'lucide-react';
import type { CourseType } from '../../../types';

interface ServiceHeaderProps {
  course: CourseType;
}

export function ServiceHeader({ course }: ServiceHeaderProps) {
  return (
    <div className="text-center mb-3">
      {course.highlight && (
        <Sparkles className="w-4 h-4 text-gold absolute top-2 left-2" />
      )}
      <h3 className="text-xl font-serif text-green-700 leading-tight mb-0.5">{course.title}</h3>
      <p className="text-sm text-gray-600 leading-tight mb-2">{course.subtitle}</p>
      <div className={`text-3xl font-bold leading-none mb-0.5 ${course.highlight ? 'text-green-700' : 'text-gray-900'}`}>
        {course.price}
      </div>
      <p className={`text-sm leading-tight ${course.highlight ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
        {course.duration}
      </p>
    </div>
  );
}