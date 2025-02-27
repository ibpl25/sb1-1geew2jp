import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import { Card } from '../Card';
import { AcuityScheduler } from '../AcuityScheduler';
import { ServiceBadge } from './ServiceBadge';
import type { CourseType } from '../../../types';
import { Check } from 'lucide-react';

interface ServiceCardProps {
  course: CourseType;
}

export function ServiceCard({ course }: ServiceCardProps) {
  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full flex"
      >
        <Card 
          className={`flex flex-col h-full relative overflow-hidden p-6 lg:p-8 w-full
            ${course.highlight ? 'shadow-xl ring-1 ring-green-700/10' : 'shadow-md'}
            ${course.highlight ? 'bg-gradient-to-b from-white to-green-50/30' : ''}`}
        >
          <ServiceBadge title={course.title} highlight={course.highlight} />
          
          <div className="flex flex-col h-full">
            {/* Header section */}
            <div className="text-center mb-6">
              <h3 className="text-2xl lg:text-2.5xl font-serif text-green-700 leading-tight mb-2">
                {course.title}
              </h3>
              <p className="text-sm lg:text-base text-gray-600 leading-tight mb-3">
                {course.subtitle}
              </p>
              <div className="flex flex-col items-center">
                <p className={`text-3xl lg:text-4xl font-bold mb-1 ${
                  course.highlight ? 'text-green-700' : 'text-gray-900'
                }`}>
                  {course.price}
                </p>
                <p className={`text-sm lg:text-base ${
                  course.highlight ? 'text-green-700 font-medium' : 'text-gray-600'
                }`}>
                  {course.duration}
                </p>
              </div>
            </div>
            
            {/* Features section */}
            <div className="flex-grow">
              <ul className="space-y-3">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      course.highlight ? 'text-green-700' : 'text-gray-600'
                    }`} />
                    <span className="text-sm lg:text-base text-gray-600 leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Button section - fixed at bottom */}
            <div className="mt-auto pt-6">
              <Button
                variant={course.highlight ? 'primary' : 'secondary'}
                className={`w-full py-4 text-lg font-medium transition-all duration-300
                  ${course.highlight ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setShowScheduler(true)}
              >
                Select Package
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {showScheduler && (
        <AcuityScheduler
          course={course}
          onClose={() => setShowScheduler(false)}
        />
      )}
    </>
  );
}