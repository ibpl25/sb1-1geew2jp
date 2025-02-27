import { ACUITY_CONFIG } from './config';
import type { 
  AcuityAppointmentType, 
  AcuityAvailability,
  AcuityAppointment,
  AcuityClient 
} from './types';

// Create base64 encoded credentials
const credentials = btoa(`${ACUITY_CONFIG.userId}:${ACUITY_CONFIG.apiKey}`);

// Use proxy endpoint to avoid CORS issues
const PROXY_URL = '/.netlify/functions/acuity';

const headers = {
  'Authorization': `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    let message = 'API request failed';
    try {
      const data = JSON.parse(text);
      message = data.message || message;
    } catch (e) {
      // Use text as message if not JSON
      message = text || message;
    }
    throw new Error(message);
  }
  return response.json();
}

export async function getAppointmentTypes(): Promise<AcuityAppointmentType[]> {
  try {
    const response = await fetch(`${PROXY_URL}/appointment-types`, { headers });
    return handleResponse(response);
  } catch (error) {
    console.error('Acuity API error:', error);
    throw new Error('Failed to fetch appointment types. Please try again.');
  }
}

export async function getAvailability(
  appointmentTypeId: number,
  date: string
): Promise<AcuityAvailability[]> {
  try {
    const params = new URLSearchParams({
      appointmentTypeID: appointmentTypeId.toString(),
      date,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    const response = await fetch(
      `${PROXY_URL}/availability/times?${params}`,
      { headers }
    );
    
    return handleResponse(response);
  } catch (error) {
    console.error('Acuity API error:', error);
    throw new Error('Failed to fetch available times. Please try again.');
  }
}

export async function createClient(data: Partial<AcuityClient>): Promise<AcuityClient> {
  try {
    const response = await fetch(`${PROXY_URL}/clients`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Acuity API error:', error);
    throw new Error('Failed to create client profile. Please try again.');
  }
}

export async function createAppointment(
  appointmentTypeId: number,
  datetime: string,
  clientId: number,
  notes?: string
): Promise<AcuityAppointment> {
  try {
    const response = await fetch(`${PROXY_URL}/appointments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        appointmentTypeID: appointmentTypeId,
        datetime,
        clientID: clientId,
        notes,
      }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Acuity API error:', error);
    throw new Error('Failed to create appointment. Please try again.');
  }
}

export async function rescheduleAppointment(
  appointmentId: number,
  datetime: string
): Promise<AcuityAppointment> {
  try {
    const response = await fetch(`${PROXY_URL}/appointments/${appointmentId}/reschedule`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ datetime }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Acuity API error:', error);
    throw new Error('Failed to reschedule appointment. Please try again.');
  }
}

export async function cancelAppointment(appointmentId: number): Promise<void> {
  try {
    const response = await fetch(`${PROXY_URL}/appointments/${appointmentId}/cancel`, {
      method: 'PUT',
      headers,
    });
    
    await handleResponse(response);
  } catch (error) {
    console.error('Acuity API error:', error);
    throw new Error('Failed to cancel appointment. Please try again.');
  }
}