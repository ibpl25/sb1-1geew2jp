import type { ContactFormData, ContactResponse } from '../../types/contact';
import { validateContactForm } from './validation';

const API_URL = '/api/contact.php';

export async function sendContactMessage(data: ContactFormData): Promise<ContactResponse> {
  try {
    const validationError = validateContactForm(data);
    if (validationError) {
      throw new Error(validationError);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
}