export interface AcuityConfig {
  userId: string;
  apiKey: string;
  baseUrl: string;
}

export interface AcuityAppointment {
  id: number;
  datetime: string;
  type: string;
  calendar: string;
  duration: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface AcuityTimeSlot {
  time: string;
  available: boolean;
}

export interface AcuityAvailability {
  date: string;
  times: AcuityTimeSlot[];
}