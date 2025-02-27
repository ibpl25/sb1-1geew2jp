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
  notes?: string;
  canClientCancel: boolean;
  canClientReschedule: boolean;
  client?: {
    email: string;
  };
}

export interface AcuityTimeSlot {
  time: string;
  available: boolean;
}

export interface AcuityAvailability {
  date: string;
  times: AcuityTimeSlot[];
}