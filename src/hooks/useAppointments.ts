import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import type { AcuityAppointment } from '../lib/acuity/types';
import { toast } from 'sonner';

export function useAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AcuityAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAppointments() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Only fetch future appointments
        const minDate = new Date().toISOString().split('T')[0];
        console.log(`Fetching appointments for ${user.email} from ${minDate}`);
        
        // Use the direct Netlify function endpoint
        const response = await fetch(`/api/acuity/appointments?minDate=${minDate}&email=${encodeURIComponent(user.email || '')}`);

        if (!response.ok) {
          let errorMessage = 'Failed to fetch appointments';
          try {
            const errorData = await response.json();
            console.error('Failed to fetch appointments:', errorData);
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            const errorText = await response.text();
            console.error('Failed to fetch appointments (text):', errorText);
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Appointments data received:', data.length, 'appointments');
        
        // Sort appointments by date
        const sortedAppointments = Array.isArray(data) 
          ? data.sort((a: AcuityAppointment, b: AcuityAppointment) => 
              new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
            )
          : [];
        
        setAppointments(sortedAppointments);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
        setError('Failed to load appointments');
        toast.error('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

  const formatAppointmentDate = (datetime: string) => {
    return new Date(datetime).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return {
    appointments,
    loading,
    error,
    formatAppointmentDate,
  };
}