import { GraduationCap, Users, Heart } from 'lucide-react';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Instruction',
    description: 'Learn from certified native Italian speakers with years of teaching experience.',
  },
  {
    icon: Users,
    title: 'Personalized Learning',
    description: 'Tailored lessons that adapt to your learning style and goals.',
  },
  {
    icon: Heart,
    title: 'Cultural Immersion',
    description: 'Experience Italian culture through language, traditions, and customs.',
  },
];

export function About() {
  return (
    <>
      <Section
        id="about"
        title="About Il Bel Paese Linguistics"
        subtitle="Your journey to Italian fluency starts here"
        fullWidth
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-1 transition-all duration-300"
            >
              <feature.icon className="w-16 h-16 text-green-700 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 font-serif">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="relative h-[600px] my-24">
        <ParallaxBanner
          layers={[
            {
              image: 'https://images.unsplash.com/photo-1527269534026-c86f4e9fd8c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
              speed: -20,
            },
          ]}
          className="h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <h3 className="text-4xl font-bold mb-6 font-serif">Our Teaching Philosophy</h3>
                <p className="text-xl mb-6 leading-relaxed">
                  At Il Bel Paese Linguistics, we believe that learning Italian should be an
                  immersive and enjoyable experience. Our teaching methodology combines
                  traditional language instruction with modern technology and real-world
                  practice.
                </p>
                <p className="text-xl leading-relaxed">
                  Whether you're a beginner or advanced learner, our experienced instructors
                  will guide you through a personalized learning journey that helps you achieve
                  your language goals effectively and confidently.
                </p>
              </motion.div>
            </div>
          </div>
        </ParallaxBanner>
      </div>
    </>
  );
}