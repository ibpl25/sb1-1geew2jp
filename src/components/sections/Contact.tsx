import { motion } from 'framer-motion';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import { Section } from '../ui/Section';

export function Contact() {
  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Start your Italian language journey today"
      className="bg-gray-50"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ContactInfo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
}