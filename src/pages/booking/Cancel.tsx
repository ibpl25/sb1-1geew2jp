import { XCircle } from 'lucide-react';
import { PaymentLayout } from '../../components/layout/PaymentLayout';
import { Button } from '../../components/ui/Button';

export function Cancel() {
  return (
    <PaymentLayout
      title="Booking Cancelled"
      subtitle="Your payment was not processed"
    >
      <div className="text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <p className="text-gray-600 mb-8">
          Don't worry! Your booking was cancelled and you haven't been charged.
        </p>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => window.location.href = '/#services'}
        >
          Try Booking Again
        </Button>
      </div>
    </PaymentLayout>
  );
}