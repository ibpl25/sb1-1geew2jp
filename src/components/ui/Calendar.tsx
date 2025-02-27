import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns';
import { Button } from './Button';
import type { BookingType } from '../../types/booking';

interface CalendarProps {
  bookings: BookingType[];
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export function Calendar({ bookings, onSelectDate, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getBookingsForDay = (day: Date) => {
    return bookings.filter(booking => 
      isSameDay(parseISO(booking.class_date), day)
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Button variant="secondary" onClick={prevMonth}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <Button variant="secondary" onClick={nextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 p-2 bg-gray-50 rounded-lg" />
        ))}

        {days.map(day => {
          const dayBookings = getBookingsForDay(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`h-24 p-2 rounded-lg transition-colors text-left ${
                isSelected
                  ? 'bg-green-100 hover:bg-green-200'
                  : isToday(day)
                  ? 'bg-green-50 border-2 border-green-500'
                  : isSameMonth(day, currentMonth)
                  ? 'bg-white hover:bg-gray-50'
                  : 'bg-gray-50'
              }`}
            >
              <span className={`text-sm font-medium ${
                isToday(day) ? 'text-green-700' : 'text-gray-900'
              }`}>
                {format(day, 'd')}
              </span>

              {dayBookings.length > 0 && (
                <div className="mt-1">
                  {dayBookings.map(booking => (
                    <div
                      key={booking.id}
                      className={`text-xs px-1 rounded mt-0.5 truncate ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {format(parseISO(booking.class_date), 'h:mm a')}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}