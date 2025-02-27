import { CourseType } from '../types';

export const courses: CourseType[] = [
  {
    title: 'Single Lesson',
    subtitle: 'Perfect for trial or occasional learning',
    price: '$65',
    duration: '60 minutes',
    features: [
      'One-on-one instruction',
      'Flexible scheduling',
      'Customized curriculum',
      'Learning materials included'
    ],
  },
  {
    title: '10 Lesson Package',
    subtitle: 'Most Popular Choice',
    price: '$600',
    duration: 'Save $50',
    features: [
      'All single lesson features',
      'Priority scheduling',
      'Progress assessments',
      'Extended support hours'
    ],
    highlight: true,
  },
  {
    title: '20 Lesson Package',
    subtitle: 'Best Value',
    price: '$1,100',
    duration: 'Save $200',
    features: [
      'All package features',
      'Premium study materials',
      'Cultural workshops',
      'Conversation practice'
    ],
    highlight: true,
  },
  {
    title: 'Group Classes',
    subtitle: 'Learn Together',
    price: '$380',
    duration: '10 lessons',
    features: [
      'Small groups (6-8 students)',
      '90-minute sessions',
      'Interactive learning',
      'Conversation practice',
      'Cultural activities'
    ],
  },
];