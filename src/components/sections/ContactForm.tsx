import { useState } from 'react';
import { Button } from '../ui/Button';
import { sendContactMessage } from '../../utils/contact/api';
import type { ContactFormData } from '../../types/contact';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      await sendContactMessage(data);
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center py-8">
          <p className="text-green-700 font-medium mb-4">
            Thank you for your message! We'll get back to you soon.
          </p>
          <Button
            variant="primary"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
      <div className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        <FormField
          label="Name"
          name="name"
          type="text"
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
        />
        <FormField
          label="Message"
          name="message"
          type="textarea"
          required
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'textarea';
  required?: boolean;
}

function FormField({ label, name, type, required }: FormFieldProps) {
  const baseClassName = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent";
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          className={baseClassName}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={baseClassName}
        />
      )}
    </div>
  );
}