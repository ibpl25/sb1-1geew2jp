import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from './ui/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { scrollToSection } from '../utils/scroll';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Benvenuti',
    subtitle: 'Welcome to Il Bel Paese Linguistics',
  },
  {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Impara l\'italiano',
    subtitle: 'Learn Italian with Native Speakers',
  },
  {
    image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Cultura italiana',
    subtitle: 'Experience Italian Culture',
  },
];

export default function Hero() {
  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={`${slide.title} - Il Bel Paese Linguistics`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center text-white px-4 max-w-4xl mx-auto"
                >
                  <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-serif"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl lg:text-4xl mb-12 font-serif"
                  >
                    {slide.subtitle}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      icon={BookOpen}
                      className="bg-green-700 hover:bg-green-800 shadow-lg hover:shadow-xl transition-all min-w-[200px]"
                      onClick={() => scrollToSection('services')}
                    >
                      Book a Lesson
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all min-w-[200px]"
                      onClick={() => scrollToSection('about')}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}