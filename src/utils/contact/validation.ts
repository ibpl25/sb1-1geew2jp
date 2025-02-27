import type { ContactFormData } from '../../types/contact';

export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name?.trim()) {
    return 'Name is required';
  }

  if (!data.email?.trim()) {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return 'Please enter a valid email address';
  }

  if (!data.message?.trim()) {
    return 'Message is required';
  }

  return null;
}