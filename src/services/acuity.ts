import type { AcuityTimeSlot, AcuityAppointment } from '../lib/acuity/types';

// Get credentials from environment variables
const ACUITY_USER_ID = import.meta.env.VITE_ACUITY_USER_ID;
const ACUITY_API_KEY = import.meta.env.VITE_ACUITY_API_KEY;
const ACUITY_BASE_URL = 'https://acuityscheduling.com/api/v1';

// Create base64 encoded credentials
const credentials = btoa(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`);

// Headers for Acuity API requests
const headers = {
  'Authorization': `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

/**
 * Get available time slots for a specific appointment type and date
 */
export async function getAvailability(
  appointmentTypeId: number,
  date: string,
  timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): Promise<AcuityTimeSlot[]> {
  try {
    const params = new URLSearchParams({
      appointmentTypeID: appointmentTypeId.toString(),
      date,
      timezone,
    });

    const response = await fetch(`${ACUITY_BASE_URL}/availability/times?${params}`, {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch availability');
    }

    const data = await response.json();
    return data[0]?.times || [];
  } catch (error) {
    console.error('Acuity API error:', error);
    throw error;
  }
}

/**
 * Create a new appointment
 */
export async function createAppointment(
  appointmentTypeId: number,
  datetime: string,
  firstName: string,
  lastName: string,
  email: string,
  notes?: string
): Promise<AcuityAppointment> {
  try {
    const response = await fetch(`${ACUITY_BASE_URL}/appointments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        appointmentTypeID: appointmentTypeId,
        datetime,
        firstName,
        lastName,
        email,
        notes,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to create appointment');
    }

    return await response.json();
  } catch (error) {
    console.error('Acuity API error:', error);
    throw error;
  }
}

/**
 * Get appointments for a specific email
 */
export async function getAppointments(
  email: string,
  minDate?: string,
  maxDate?: string
): Promise<AcuityAppointment[]> {
  try {
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (minDate) params.append('minDate', minDate);
    if (maxDate) params.append('maxDate', maxDate);

    const response = await fetch(
      `${ACUITY_BASE_URL}/appointments${params.toString() ? '?' + params.toString() : ''}`,
      { headers }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch appointments');
    }

    return await response.json();
  } catch (error) {
    console.error('Acuity API error:', error);
    throw error;
  }
}