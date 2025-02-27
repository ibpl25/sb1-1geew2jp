import type { BookingDetails } from '../types/booking';

const STORAGE_KEY = 'temp_booking';

export function storeTempBooking(booking: BookingDetails): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
}

export function getTempBooking(): BookingDetails | null {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function clearTempBooking(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}