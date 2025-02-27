export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_POST: '/blog/:id',
  BOOKING_SUCCESS: '/booking/success',
  BOOKING_CANCEL: '/booking/cancel',
  DASHBOARD: '/dashboard',
  DASHBOARD_SCHEDULE: '/dashboard/schedule',
  DASHBOARD_PAYMENTS: '/dashboard/payments',
  DASHBOARD_HISTORY: '/dashboard/history',
  DASHBOARD_SETTINGS: '/dashboard/settings',
} as const;

export function isBookingRoute(path: string): boolean {
  return [ROUTES.BOOKING_SUCCESS, ROUTES.BOOKING_CANCEL].includes(path as any);
}

export function isBlogRoute(path: string): boolean {
  return path.startsWith('/blog');
}

export function isDashboardRoute(path: string): boolean {
  return path.startsWith('/dashboard');
}