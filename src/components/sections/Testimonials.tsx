import { Section } from '../ui/Section';
import { TestimonialsCarousel } from '../ui/TestimonialsCarousel';
import { testimonials } from '../../data/testimonials';

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      title="Student Success Stories"
      subtitle="Hear from our amazing students"
      className="bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </Section>
  );
}