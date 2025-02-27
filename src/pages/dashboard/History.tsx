import { Book } from 'lucide-react';

export function History() {
  const lessons = [
    {
      id: 1,
      date: 'March 10, 2024',
      topic: 'Past Perfect Tense',
      instructor: 'Jenny',
      duration: '60 min',
      notes: 'Reviewed past perfect tense usage and completed practice exercises'
    },
    {
      id: 2,
      date: 'March 3, 2024',
      topic: 'Conversation Practice',
      instructor: 'Jenny',
      duration: '60 min',
      notes: 'Discussed Italian cuisine and cultural traditions'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lesson History</h1>
      
      <div className="space-y-4">
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Book className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold">{lesson.topic}</h3>
                  <p className="text-sm text-gray-500">
                    {lesson.date} • {lesson.duration} • with {lesson.instructor}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">{lesson.notes}</p>
                </div>
              </div>
              <button className="text-sm text-green-700 hover:text-green-800">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}