import { loadStripe } from '@stripe/stripe-js';
import type { BookingDetails } from '../types/booking';
import type { CourseType } from '../types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createPaymentSession(course: CourseType, bookingDetails: BookingDetails) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course,
        bookingDetails,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Payment session creation failed');
    }

    const session = await response.json();
    if (!session || !session.id) {
      throw new Error('Invalid session response');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) throw error;
  } catch (err) {
    console.error('Payment error:', err);
    throw err;
  }
}