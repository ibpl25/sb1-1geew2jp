import type { ServiceType } from '../types';

export const services: ServiceType[] = [
  {
    title: 'Private Lessons',
    description: 'Accelerate your Italian learning with personalized one-on-one instruction tailored to your goals, schedule, and learning style.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    options: [
      {
        id: 'single',
        title: 'Single Lesson',
        price: '$65',
        duration: '60 minutes',
        features: [
          'One-on-one instruction',
          'Flexible scheduling',
          'Learning materials included',
          'Perfect for trial or occasional learning',
          'Pay as you go'
        ]
      },
      {
        id: 'package-10',
        title: '10 Lesson Package',
        price: '$580',
        duration: '60 minutes each',
        features: [
          'Only $58 per lesson (Save $70)',
          'Customized curriculum',
          'Learning materials included',
          'Flexible scheduling',
          'Email support & feedback between lessons'
        ],
        highlight: true
      },
      {
        id: 'package-20',
        title: '20 Lesson Package',
        price: '$1,100',
        duration: '60 minutes each',
        features: [
          'Only $55 per lesson (Save $200)',
          'Most economical choice',
          'Comprehensive learning materials',
          'Priority scheduling',
          'Extended email support'
        ],
        highlight: true,
        bestValue: true
      }
    ]
  },
  {
    title: 'Conversation Practice',
    description: 'Build confidence and fluency through engaging Italian conversation sessions focused on real-world communication skills.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    options: [
      {
        id: '30min-single',
        title: '30-Minute Session',
        price: '$30',
        duration: '30 minutes',
        features: [
          'Focused conversation practice',
          'Personalized topic selection',
          'Real-time feedback & corrections',
          'Flexible scheduling options',
          'Perfect for busy schedules'
        ]
      },
      {
        id: '30min-package',
        title: '10 x 30-Minute Package',
        price: '$250',
        duration: '30 minutes each',
        features: [
          'Save $50 on regular price',
          'Personalized learning plan',
          'Progress tracking & feedback',
          'Flexible session scheduling',
          'Email support between sessions'
        ],
        highlight: true
      },
      {
        id: '45min-single',
        title: '45-Minute Session',
        price: '$40',
        duration: '45 minutes',
        features: [
          'Extended practice duration',
          'In-depth cultural discussions',
          'Comprehensive feedback',
          'Flexible topic selection',
          'Perfect for deeper learning'
        ]
      },
      {
        id: '45min-package',
        title: '10 x 45-Minute Package',
        price: '$350',
        duration: '45 minutes each',
        features: [
          'Save $50 on regular price',
          'Extended learning sessions',
          'Detailed progress tracking',
          'Priority booking options',
          'Enhanced email support'
        ],
        highlight: true,
        bestValue: true
      }
    ]
  }
];