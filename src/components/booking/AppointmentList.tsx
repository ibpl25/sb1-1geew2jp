import { motion } from 'framer-motion';
import { Calendar, Clock, User, Loader2 } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';
import { Button } from '../ui/Button';

export function AppointmentList() {
  const { appointments, loading, error, formatAppointmentDate } = useAppointments();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Failed to load appointments. Please try again.
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No upcoming appointments</p>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/#services'}
        >
          Book a Lesson
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="font-medium">{appointment.type}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatAppointmentDate(appointment.datetime)}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {appointment.calendar}
                </div>
                {appointment.notes && (
                  <div className="text-gray-500 mt-2">
                    Notes: {appointment.notes}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {appointment.canClientReschedule && (
                <Button variant="secondary" size="sm">
                  Reschedule
                </Button>
              )}
              {appointment.canClientCancel && (
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}