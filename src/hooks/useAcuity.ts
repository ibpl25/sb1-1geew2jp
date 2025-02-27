import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import type { AcuityAppointment, AcuityTimeSlot } from '../lib/acuity/types';

export function useAcuity() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAvailability = useCallback(async (
    appointmentTypeId: number,
    date: string
  ): Promise<AcuityTimeSlot[]> => {
    setLoading(true);
    setError(null);

    try {
      // Validate appointmentTypeId is a number
      if (isNaN(appointmentTypeId)) {
        console.error('Invalid appointment type ID:', appointmentTypeId);
        throw new Error('Invalid appointment type ID');
      }
      
      const timezone = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);
      
      console.log(`Fetching availability for appointment type ${appointmentTypeId} on ${date} with timezone ${timezone}`);
      
      // Use the direct Netlify function endpoint with proper query parameters
      const url = `/api/acuity/availability?appointmentTypeID=${appointmentTypeId}&date=${date}&timezone=${timezone}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch availability';
        try {
          const errorData = await response.json();
          console.error('Availability API error:', errorData);
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch (e) {
          const errorText = await response.text();
          console.error('Availability API error (text):', errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Availability data:', data);
      
      // Return the times array from the first availability object
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      
      return [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch availability';
      setError(message);
      console.error('Acuity availability error:', err);
      toast.error('Failed to load available time slots. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (
    appointmentTypeId: number,
    datetime: string,
    notes?: string
  ): Promise<AcuityAppointment> => {
    if (!user?.email) {
      throw new Error('User must be logged in to book appointments');
    }

    setLoading(true);
    setError(null);

    try {
      // Validate appointmentTypeId
      if (isNaN(appointmentTypeId)) {
        throw new Error('Invalid appointment type ID');
      }

      // Get user name from metadata
      const fullName = user.user_metadata?.full_name || '';
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      console.log('Creating booking with data:', {
        appointmentTypeId,
        datetime,
        firstName,
        lastName,
        email: user.email,
        notes
      });

      // Use the direct Netlify function endpoint
      const response = await fetch('/api/acuity/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentTypeId,
          datetime,
          firstName,
          lastName,
          email: user.email,
          notes,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create booking';
        try {
          const errorData = await response.json();
          console.error('Booking error response:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          const errorText = await response.text();
          console.error('Booking error response (text):', errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Booking created successfully:', data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking';
      setError(message);
      console.error('Acuity booking error:', err);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    loading,
    error,
    getAvailability,
    createBooking,
  };
}