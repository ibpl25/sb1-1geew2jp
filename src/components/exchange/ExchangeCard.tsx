import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ExchangeSession } from '../../types/exchange';
import { proficiencyLevels, conversationTopics } from '../../data/exchange';

interface ExchangeCardProps {
  session: ExchangeSession;
  onBook: (session: ExchangeSession) => void;
}

export function ExchangeCard({ session, onBook }: ExchangeCardProps) {
  const level = proficiencyLevels.find(l => l.id === session.level);
  const topics = session.topics.map(t => 
    conversationTopics.find(topic => topic.id === t)?.label
  ).filter(Boolean);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{session.description}</p>
          </div>
          <span className="text-lg font-bold text-green-700">${session.price}</span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {session.duration} minutes
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {level?.label}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => onBook(session)}
        >
          Book Session
        </Button>
      </div>
    </motion.div>
  );
}