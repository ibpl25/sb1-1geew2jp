import { CheckCircle } from 'lucide-react';
import { PaymentLayout } from '../../components/layout/PaymentLayout';

export function Success() {
  return (
    <PaymentLayout
      title="Booking Confirmed!"
      subtitle="Your Italian lesson has been successfully scheduled"
    >
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-700 mx-auto mb-6" />
        <div className="space-y-4 text-gray-600">
          <p>
            You will receive a confirmation email with your lesson details shortly.
          </p>
          <p>
            If you need to reschedule or have any questions, please contact us at{' '}
            <a href="mailto:ilbelpaeselinguistics@gmail.com" className="text-green-700 hover:underline">
              ilbelpaeselinguistics@gmail.com
            </a>
          </p>
        </div>
      </div>
    </PaymentLayout>
  );
}