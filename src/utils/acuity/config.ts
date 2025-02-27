import type { AcuityConfig } from './types';

export const ACUITY_CONFIG: AcuityConfig = {
  userId: import.meta.env.VITE_ACUITY_USER_ID || '',
  apiKey: import.meta.env.VITE_ACUITY_API_KEY || '',
  baseUrl: 'https://acuityscheduling.com/api/v1',
};