export interface ExchangeLevel {
  id: string;
  label: string;
  description: string;
}

export interface ExchangeTopic {
  id: string;
  label: string;
  icon: string;
}

export interface ExchangeSession {
  id: string;
  title: string;
  description: string;
  level: string;
  topics: string[];
  duration: number;
  price: number;
}

export interface ExchangeBooking {
  sessionId: string;
  date: string;
  time: string;
  studentLevel: string;
  selectedTopics: string[];
  notes?: string;
  recurring?: boolean;
}

export interface ExchangeFeedback {
  sessionId: string;
  rating: number;
  comment: string;
  areas: string[];
}