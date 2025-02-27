import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, format, parseISO } from 'date-fns';

interface DatePickerProps {
  onSelect: (date: string) => void;
  selectedDate?: string;
  minDate?: Date;
}

export function DatePicker({ onSelect, selectedDate, minDate = new Date() }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const isDateDisabled = (date: Date) => {
    return date < minDate || date.getDay() === 0; // Disable Sundays
  };

  // Parse the selectedDate string to a Date object if it exists
  const selectedDateObj = selectedDate ? parseISO(selectedDate) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={prevMonth}
          disabled={currentMonth <= minDate}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <Button variant="secondary" onClick={nextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12" />
        ))}

        {days.map(day => {
          const isDisabled = isDateDisabled(day);
          const isSelected = selectedDateObj && isSameDay(day, selectedDateObj);
          
          return (
            <Button
              key={day.toISOString()}
              variant={isSelected ? 'primary' : 'secondary'}
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  const formattedDate = format(day, 'yyyy-MM-dd');
                  console.log('Selected date:', formattedDate);
                  onSelect(formattedDate);
                }
              }}
              className={`
                h-12 relative
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${isSelected ? 'bg-green-700 text-white' : ''}
                ${isToday(day) ? 'font-bold' : ''}
              `}
            >
              {format(day, 'd')}
            </Button>
          );
        })}
      </div>
    </div>
  );
}