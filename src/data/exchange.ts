import type { ExchangeLevel, ExchangeTopic, ExchangeSession } from '../types/exchange';

export const proficiencyLevels: ExchangeLevel[] = [
  { id: 'beginner', label: 'Beginner (A1-A2)', description: 'Basic communication and everyday phrases' },
  { id: 'intermediate', label: 'Intermediate (B1-B2)', description: 'Comfortable conversations on familiar topics' },
  { id: 'advanced', label: 'Advanced (C1-C2)', description: 'Complex discussions and cultural nuances' },
];

export const conversationTopics: ExchangeTopic[] = [
  { id: 'culture', label: 'Italian Culture', icon: 'Landmark' },
  { id: 'travel', label: 'Travel & Tourism', icon: 'Plane' },
  { id: 'food', label: 'Food & Cuisine', icon: 'UtensilsCrossed' },
  { id: 'arts', label: 'Arts & Literature', icon: 'Palette' },
  { id: 'business', label: 'Business Italian', icon: 'Briefcase' },
  { id: 'daily', label: 'Daily Life', icon: 'Coffee' },
];

export const sampleSessions: ExchangeSession[] = [
  {
    id: '1',
    title: 'Italian Culture & Traditions',
    description: 'Practice conversational Italian while discussing cultural festivals and traditions.',
    level: 'beginner',
    topics: ['culture', 'daily'],
    duration: 30,
    price: 25,
  },
  {
    id: '2',
    title: 'Travel & Regional Dialects',
    description: 'Learn about different Italian regions and their unique linguistic characteristics.',
    level: 'intermediate',
    topics: ['travel', 'culture'],
    duration: 30,
    price: 25,
  },
  {
    id: '3',
    title: 'Business Italian Practice',
    description: 'Perfect your professional Italian vocabulary and communication skills.',
    level: 'advanced',
    topics: ['business'],
    duration: 30,
    price: 30,
  },
];