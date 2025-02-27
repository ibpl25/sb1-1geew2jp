import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '../../components/ui/Calendar';
import { useAppointments } from '../../hooks/useAppointments';
import { AppointmentList } from '../../components/booking/AppointmentList';
import { Loader2 } from 'lucide-react';

export function Schedule() {
  const { appointments, loading } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const bookings = appointments.map(appointment => ({
    id: appointment.id.toString(),
    class_date: appointment.datetime,
    status: 'confirmed',
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lesson Schedule</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <Calendar 
            bookings={bookings}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {selectedDate 
              ? format(selectedDate, 'MMMM d, yyyy')
              : 'Upcoming Lessons'
            }
          </h2>
          <AppointmentList />
        </div>
      </div>
    </div>
  );
}