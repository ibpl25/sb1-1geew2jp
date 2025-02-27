import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { CourseType } from '../../types';

interface AcuitySchedulerProps {
  course: CourseType;
  onClose: () => void;
}

export function AcuityScheduler({ course, onClose }: AcuitySchedulerProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Get the correct Acuity URL based on course type
  const getAcuityUrl = () => {
    const baseParams = [
      'owner=34363375',
      'embedded=true'
    ].join('&');
    
    switch (course.title) {
      case 'Single Lesson':
        return `https://app.acuityscheduling.com/schedule.php?${baseParams}&appointmentType=72570827`;
      case 'Group Classes':
        return `https://app.acuityscheduling.com/schedule.php?${baseParams}&appointmentType=72571089`;
      case '10 Lesson Package':
        return `https://app.acuityscheduling.com/catalog.php?${baseParams}&action=addCart&clear=1&id=1891787`;
      case '20 Lesson Package':
        return `https://app.acuityscheduling.com/catalog.php?${baseParams}&action=addCart&clear=1&id=1891788`;
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-6">
      <div className="relative w-full max-w-5xl h-[80vh] bg-white rounded-xl shadow-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close scheduler"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-full h-full overflow-hidden">
          <iframe
            src={getAcuityUrl()}
            title="Schedule Appointment"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full"
            style={{
              border: 'none',
              margin: 0,
              padding: '40px 16px 16px',
              WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
            }}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}