export interface BookingType {
  id: string;
  student_id: string;
  class_date: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingDetails {
  courseId: string;
  studentName: string;
  email: string;
  selectedDate: string;
  selectedTime: string;
  notes?: string;
}