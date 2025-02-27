import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { ServiceCard } from '../ui/ServiceCard';
import { BookingModal } from '../booking/BookingModal';
import { services } from '../../data/services';
import type { ServiceType } from '../../types';

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  return (
    <Section
      id="services"
      title="Learning Programs"
      subtitle="Choose your ideal Italian learning journey"
      variant="italian"
      className="bg-cream-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="h-full"
          >
            <ServiceCard
              service={service}
              onBook={() => setSelectedService(service)}
            />
          </motion.div>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          isOpen={true}
          onClose={() => setSelectedService(null)}
        />
      )}
    </Section>
  );
}