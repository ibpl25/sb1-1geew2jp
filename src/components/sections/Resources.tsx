import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Download, Video, Book, Users } from 'lucide-react';

const resources = [
  {
    icon: Book,
    title: 'Study Materials',
    description: 'Access our curated collection of Italian learning resources, textbooks, and practice exercises.',
  },
  {
    icon: Video,
    title: 'Video Lessons',
    description: 'Watch recorded lessons and cultural insights from our expert instructors.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join our vibrant community of Italian language learners for practice and support.',
  },
  {
    icon: Download,
    title: 'Downloads',
    description: 'Get worksheets, vocabulary lists, and grammar guides for offline study.',
  },
];

export function Resources() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section
      id="resources"
      title="Learning Resources"
      subtitle="Everything you need to succeed in your Italian journey"
      className="bg-green-50"
    >
      <div
        ref={ref}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="text-center">
                <resource.icon className="w-12 h-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}