import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { useAuth } from '../../hooks/useAuth';
import { useAcuity } from '../../hooks/useAcuity';
import { DatePicker } from './DatePicker';
import { TimeSlotPicker } from './TimeSlotPicker';
import { AppointmentConfirmation } from './AppointmentConfirmation';
import { storeTempBooking } from '../../utils/storage';
import { toast } from 'sonner';
import type { ServiceType, ServiceOption } from '../../types';
import type { AcuityAppointment } from '../../lib/acuity/types';

interface BookingModalProps {
  service: ServiceType;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ service, isOpen, onClose }: BookingModalProps) {
  const { user } = useAuth();
  const { createBooking, loading: bookingLoading } = useAcuity();
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null);
  const [step, setStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    selectedDate: '',
    selectedTime: '',
    notes: ''
  });
  const [confirmedAppointment, setConfirmedAppointment] = useState<AcuityAppointment | null>(null);

  const handleOptionSelect = (option: ServiceOption) => {
    setSelectedOption(option);
    setStep(2);
    console.log('Selected option:', option);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleBookingSubmit();
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedOption(null);
      setBookingDetails({
        selectedDate: '',
        selectedTime: '',
        notes: ''
      });
    }
  };

  const validateBookingDetails = () => {
    if (!bookingDetails.selectedDate || !bookingDetails.selectedTime) {
      toast.error('Please select both a date and time');
      return false;
    }

    const selectedDateTime = new Date(`${bookingDetails.selectedDate}T${bookingDetails.selectedTime}`);
    const now = new Date();

    if (selectedDateTime < now) {
      toast.error('Please select a future date and time');
      return false;
    }

    // Ensure time is within business hours (9 AM - 8 PM EST)
    const hour = selectedDateTime.getHours();
    if (hour < 9 || hour >= 20) {
      toast.error('Please select a time between 9 AM and 8 PM EST');
      return false;
    }

    return true;
  };

  const handleBookingSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedOption) return;

    if (!validateBookingDetails()) return;

    // Store booking details before proceeding
    const bookingData = {
      courseId: selectedOption.id,
      studentName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      ...bookingDetails
    };

    // If user is not logged in, store booking and show auth modal
    if (!user) {
      storeTempBooking(bookingData);
      setShowAuthModal(true);
      return;
    }

    setIsProcessing(true);
    try {
      // Get Acuity appointment type ID based on selected option
      const appointmentTypeId = parseInt(selectedOption.id);
      
      // Ensure appointmentTypeId is a valid number
      if (isNaN(appointmentTypeId)) {
        console.error('Invalid appointment type ID:', selectedOption.id);
        throw new Error('Invalid appointment type ID');
      }
      
      const datetime = `${bookingDetails.selectedDate}T${bookingDetails.selectedTime}`;
      console.log('Booking appointment:', { appointmentTypeId, datetime, notes: bookingDetails.notes });

      const appointment = await createBooking(
        appointmentTypeId,
        datetime,
        bookingDetails.notes
      );

      setConfirmedAppointment(appointment);
      toast.success('Lesson booked successfully!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to book lesson');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6">
                {confirmedAppointment ? (
                  <AppointmentConfirmation
                    appointment={confirmedAppointment}
                    onClose={onClose}
                  />
                ) : (
                  <>
                    <div className="max-w-3xl mx-auto text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2 font-serif">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>

                    {step === 1 && (
                      <div className={`grid grid-cols-1 ${service.title === 'Private Lessons' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
                        {service.options.map((option) => (
                          !('options' in option) && (
                            <motion.div
                              key={option.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`relative flex flex-col h-full min-h-[520px] p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                                option.highlight
                                  ? 'bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              } border ${
                                option.highlight ? 'border-green-200' : 'border-gray-200'
                              } hover:border-green-300 group`}
                              onClick={() => handleOptionSelect(option)}
                            >
                              {option.bestValue && (
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-4 py-1.5 text-sm font-medium shadow-lg flex items-center gap-1.5">
                                  <Sparkles className="w-4 h-4" />
                                  Best Value
                                </div>
                              )}
                              {option.highlight && !option.bestValue && (
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-4 py-1.5 text-sm font-medium shadow-lg">
                                  Popular Choice
                                </div>
                              )}

                              <div className="text-center mb-6">
                                <h4 className={`text-xl font-bold mb-2 ${
                                  option.highlight ? 'text-green-800' : 'text-gray-900'
                                }`}>
                                  {option.title}
                                </h4>
                                <div className="flex flex-col items-center">
                                  <span className={`text-3xl font-bold mb-1 ${
                                    option.highlight ? 'text-green-700' : 'text-gray-900'
                                  }`}>
                                    {option.price}
                                  </span>
                                  <span className="text-gray-600">{option.duration}</span>
                                </div>
                              </div>

                              <div className="flex-grow space-y-3 mb-6">
                                {option.features.map((feature, index) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <div className={`rounded-full p-1 mt-0.5 flex-shrink-0 ${
                                      option.highlight 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-white text-gray-500'
                                    }`}>
                                      <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm text-gray-600 leading-tight line-clamp-2">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-auto">
                                <Button
                                  variant={option.highlight ? 'primary' : 'secondary'}
                                  className={`w-full py-2.5 ${
                                    option.highlight
                                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md'
                                      : 'bg-white hover:bg-gray-50'
                                  } group`}
                                >
                                  Select Package
                                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </div>
                            </motion.div>
                          )
                        ))}
                      </div>
                    )}

                    {step === 2 && selectedOption && (
                      <form onSubmit={handleBookingSubmit} className="max-w-2xl mx-auto space-y-6">
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="font-medium text-gray-700 mb-2">Selected Package:</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {selectedOption.title} - {selectedOption.price}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Appointment Type ID: {selectedOption.id}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <DatePicker
                            onSelect={(date) => {
                              console.log('Date selected in BookingModal:', date);
                              setBookingDetails(prev => ({
                                ...prev,
                                selectedDate: date,
                                // Clear selected time when date changes
                                selectedTime: ''
                              }));
                            }}
                            selectedDate={bookingDetails.selectedDate}
                          />

                          {bookingDetails.selectedDate && (
                            <TimeSlotPicker
                              appointmentTypeId={parseInt(selectedOption.id)}
                              date={bookingDetails.selectedDate}
                              onSelect={(time) => {
                                console.log('Time selected:', time);
                                setBookingDetails(prev => ({
                                  ...prev,
                                  selectedTime: time
                                }));
                              }}
                              selectedTime={bookingDetails.selectedTime}
                            />
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Additional Notes
                            </label>
                            <textarea
                              rows={4}
                              value={bookingDetails.notes}
                              onChange={(e) => setBookingDetails(prev => ({
                                ...prev,
                                notes: e.target.value
                              }))}
                              placeholder="Any specific topics or areas you'd like to focus on?"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>

                          <div className="flex justify-between gap-6">
                            <Button
                              variant="secondary"
                              onClick={handleBack}
                              className="px-8"
                              type="button"
                              disabled={isProcessing || bookingLoading}
                            >
                              Back
                            </Button>
                            <Button
                              variant="primary"
                              className="flex-1"
                              type="submit"
                              disabled={isProcessing || bookingLoading}
                            >
                              {isProcessing || bookingLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                'Book Lesson'
                              )}
                            </Button>
                          </div>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}