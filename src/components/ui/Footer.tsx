import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { scrollToSection } from '../../utils/scroll';

const navigation = [
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex justify-center lg:justify-start">
              <Logo variant="footer" />
            </div>
            <p className="text-sm leading-relaxed">
              Experience the joy of learning Italian with native speakers. Join our community and embark on a journey through language and culture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2" />
                <a 
                  href="mailto:ilbelpaeselinguistics@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  ilbelpaeselinguistics@gmail.com
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" />
                <a 
                  href="tel:+13477054678"
                  className="hover:text-white transition-colors"
                >
                  +1 347 705 4678
                </a>
              </li>
              <li className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Virtual lessons worldwide</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="https://acuityscheduling.com/schedule.php?owner=34363375"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Book on Acuity
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {currentYear} Il Bel Paese Linguistics. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}