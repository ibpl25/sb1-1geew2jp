import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'The Art of Italian Conversation',
    excerpt: 'Master the nuances of everyday Italian dialogue with these essential tips.',
    image: 'https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 15, 2024',
    category: 'Language Tips',
  },
  {
    title: 'Regional Dialects of Italy',
    excerpt: 'Explore the rich diversity of Italian dialects across different regions.',
    image: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 10, 2024',
    category: 'Culture',
  },
  {
    title: 'Italian Cuisine & Language',
    excerpt: 'Learn Italian through the lens of its world-renowned culinary traditions.',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'March 5, 2024',
    category: 'Food & Culture',
  },
];

export function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section
      id="blog"
      title="Cultural Corner"
      subtitle="Insights into Italian language, culture, and lifestyle"
    >
      <div
        ref={ref}
        className="grid md:grid-cols-3 gap-8"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-green-700 font-medium inline-flex items-center hover:text-green-800">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}