import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../../data/contact';

export function ContactInfo() {
  const contactItems = [
    { icon: Mail, label: 'Email', value: contactInfo.email },
    { icon: Phone, label: 'Phone', value: contactInfo.phone },
    { icon: MapPin, label: 'Location', value: contactInfo.location },
    { icon: Clock, label: 'Office Hours', value: contactInfo.hours },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      <div className="space-y-6">
        {contactItems.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center">
            <Icon className="w-6 h-6 text-green-700 mr-4" />
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-gray-600">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}