import { useState } from 'react';
import { Button } from '../ui/Button';
import { createPaymentSession } from '../../utils/stripe';
import type { CourseType } from '../../types';
import type { BookingDetails } from '../../types/booking';

interface PaymentFormProps {
  course: CourseType;
  bookingDetails: BookingDetails;
  onClose: () => void;
}

export function PaymentForm({ course, bookingDetails, onClose }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await createPaymentSession({
        course,
        bookingDetails,
      });

      if (result.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Booking Summary</h4>
        <p className="text-sm text-gray-600">
          {course.title} - {course.price}<br />
          Date: {new Date(bookingDetails.selectedDate).toLocaleDateString()}<br />
          Time: {new Date(bookingDetails.selectedTime).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </p>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : `Pay ${course.price}`}
      </Button>
    </form>
  );
}