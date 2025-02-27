import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';
import type { BookingType } from '../types/booking';

export function useBookings() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('class_bookings')
        .select('*, profiles(full_name)')
        .order('class_date', { ascending: true });

      if (error) throw error;

      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  return { bookings, loading, error, refetch: fetchBookings };
}