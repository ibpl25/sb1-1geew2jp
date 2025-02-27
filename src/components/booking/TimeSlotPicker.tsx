import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { useAcuity } from '../../hooks/useAcuity';
import { Loader2 } from 'lucide-react';
import type { AcuityTimeSlot } from '../../lib/acuity/types';

interface TimeSlotPickerProps {
  appointmentTypeId: number;
  date: string;
  onSelect: (time: string) => void;
  selectedTime?: string;
}

export function TimeSlotPicker({ appointmentTypeId, date, onSelect, selectedTime }: TimeSlotPickerProps) {
  const { getAvailability, loading: acuityLoading, error: acuityError } = useAcuity();
  const [timeSlots, setTimeSlots] = useState<AcuityTimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        // Validate appointmentTypeId is a number
        if (isNaN(appointmentTypeId)) {
          console.error('Invalid appointment type ID:', appointmentTypeId);
          setError('Invalid appointment type ID');
          return;
        }
        
        setLoading(true);
        console.log(`Fetching time slots for appointment type ${appointmentTypeId} on ${date}`);
        
        const slots = await getAvailability(appointmentTypeId, date);
        console.log('Time slots received:', slots);
        setTimeSlots(slots);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch time slots:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch time slots');
      } finally {
        setLoading(false);
      }
    }

    if (date && !isNaN(appointmentTypeId)) {
      fetchAvailability();
    } else {
      // Reset time slots if date or appointmentTypeId is invalid
      setTimeSlots([]);
    }
  }, [date, appointmentTypeId, getAvailability]);

  if (loading || acuityLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-green-700" />
      </div>
    );
  }

  if (error || acuityError) {
    return (
      <div className="text-red-600 text-center py-4">
        {error || acuityError || 'Failed to load available time slots. Please try again.'}
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className="text-gray-600 text-center py-4">
        No available time slots for this date. Please select another date.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium">
        Available Times - {new Date(date).toLocaleDateString()}
      </h4>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {timeSlots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          const timeString = new Date(slot.time).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
          });

          return (
            <Button
              key={slot.time}
              variant={isSelected ? 'primary' : 'secondary'}
              disabled={!slot.available}
              onClick={() => {
                if (slot.available) {
                  console.log('Selected time slot:', slot.time);
                  onSelect(slot.time);
                }
              }}
              className={`
                ${!slot.available && 'opacity-50 cursor-not-allowed'}
                ${isSelected && 'bg-green-700 text-white'}
              `}
            >
              {timeString}
            </Button>
          );
        })}
      </div>
    </div>
  );
}