import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ExchangeSession, ExchangeBooking } from '../../types/exchange';
import { proficiencyLevels, conversationTopics } from '../../data/exchange';

interface ExchangeModalProps {
  session: ExchangeSession;
  isOpen: boolean;
  onClose: () => void;
  onBook: (booking: ExchangeBooking) => void;
}

export function ExchangeModal({ session, isOpen, onClose, onBook }: ExchangeModalProps) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Partial<ExchangeBooking>>({
    sessionId: session.id,
    selectedTopics: [], // Initialize empty array
    recurring: false, // Initialize boolean
    studentLevel: '', // Initialize empty string
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (booking.date && booking.time && booking.studentLevel && booking.selectedTopics?.length) {
      onBook(booking as ExchangeBooking);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-xl bg-white rounded-xl shadow-xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{session.title}</h3>
              <p className="text-gray-600">${session.price} - {session.duration} minutes</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Proficiency Level
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={booking.studentLevel}
                      onChange={(e) => setBooking({ ...booking, studentLevel: e.target.value })}
                      required
                    >
                      <option value="">Select your level</option>
                      {proficiencyLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conversation Topics
                    </label>
                    <div className="space-y-2">
                      {conversationTopics.map((topic) => (
                        <label key={topic.id} className="flex items-center">
                          <input
                            type="checkbox"
                            value={topic.id}
                            checked={booking.selectedTopics?.includes(topic.id)}
                            onChange={(e) => {
                              const topics = booking.selectedTopics || [];
                              setBooking({
                                ...booking,
                                selectedTopics: e.target.checked
                                  ? [...topics, topic.id]
                                  : topics.filter(t => t !== topic.id)
                              });
                            }}
                            className="mr-2"
                          />
                          {topic.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!booking.studentLevel || !booking.selectedTopics?.length}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={booking.time}
                        onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes for Your Conversation Partner
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows={4}
                      value={booking.notes}
                      onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                      placeholder="Any specific topics or areas you'd like to focus on?"
                    />
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={booking.recurring}
                      onChange={(e) => setBooking({ ...booking, recurring: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="recurring" className="text-sm text-gray-700">
                      Make this a weekly recurring session
                    </label>
                  </div>

                  <div className="flex justify-between gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                    >
                      Book Session
                    </Button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}