import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useBookings } from '../../hooks/useBookings';
import { format, isFuture } from 'date-fns';

export function Overview() {
  const { user } = useAuth();
  const { bookings, loading } = useBookings();

  // Get next lesson
  const nextLesson = bookings
    .filter(booking => booking.status === 'confirmed' && isFuture(new Date(booking.class_date)))
    .sort((a, b) => new Date(a.class_date).getTime() - new Date(b.class_date).getTime())[0];

  // Calculate total completed lessons
  const completedLessons = bookings.filter(booking => booking.status === 'completed').length;

  const stats = [
    {
      label: 'Next Lesson',
      value: nextLesson
        ? format(new Date(nextLesson.class_date), 'MMM d, yyyy h:mm a')
        : 'No upcoming lessons',
      icon: Calendar,
    },
    {
      label: 'Completed Lessons',
      value: `${completedLessons}`,
      icon: Clock,
    },
    {
      label: 'Current Level',
      value: user?.user_metadata.level || 'Not assessed',
      icon: GraduationCap,
    },
    {
      label: 'Credits',
      value: `${user?.user_metadata.credits || 0} lessons`,
      icon: CreditCard,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome back, {user?.user_metadata.full_name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Upcoming Lessons</h2>
          <div className="space-y-4">
            {bookings
              .filter(booking => booking.status === 'confirmed' && isFuture(new Date(booking.class_date)))
              .slice(0, 3)
              .map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Italian Lesson</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(booking.class_date), 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                  <button className="text-sm text-green-700 hover:text-green-800">
                    View Details
                  </button>
                </div>
              ))}
            {bookings.filter(b => b.status === 'confirmed' && isFuture(new Date(b.class_date))).length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming lessons</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Progress</h2>
          <div className="space-y-4">
            {bookings
              .filter(booking => booking.status === 'completed')
              .slice(0, 3)
              .map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Completed Lesson</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(booking.class_date), 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                  <button className="text-sm text-green-700 hover:text-green-800">
                    View Details
                  </button>
                </div>
              ))}
            {bookings.filter(b => b.status === 'completed').length === 0 && (
              <p className="text-gray-500 text-center py-4">No completed lessons yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}