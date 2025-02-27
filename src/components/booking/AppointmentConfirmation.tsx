import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import type { AcuityAppointment } from '../../lib/acuity/types';

interface AppointmentConfirmationProps {
  appointment: AcuityAppointment;
  onClose: () => void;
}

export function AppointmentConfirmation({ appointment, onClose }: AppointmentConfirmationProps) {
  return (
    <div className="text-center py-8">
      <CheckCircle className="w-16 h-16 text-green-700 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Booking Confirmed!
      </h3>
      <p className="text-gray-600 mb-6">
        Your lesson has been scheduled for{' '}
        {new Date(appointment.datetime).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })}
      </p>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          A confirmation email has been sent to {appointment.client.email}
        </p>
        <Button
          variant="primary"
          onClick={onClose}
          className="w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
}