import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase/client';
import { signUpSchema, signInSchema, type SignUpInput, type SignInInput } from '../../lib/auth/validation';
import { getTempBooking, clearTempBooking } from '../../utils/storage';

interface AuthFormProps {
  onSuccess?: () => void;
}

type AuthMode = 'signIn' | 'signUp';

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('signUp');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tempBooking = getTempBooking();

  useEffect(() => {
    // If there's a temporary booking, default to sign up
    if (tempBooking) {
      setMode('signUp');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm<SignUpInput | SignInInput>({
    resolver: zodResolver(mode === 'signIn' ? signInSchema : signUpSchema)
  });

  const toggleMode = () => {
    if (tempBooking && mode === 'signUp') {
      toast.error('Please create an account to complete your booking');
      return;
    }
    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
    reset();
    clearErrors();
  };

  const handleProfileCreation = async (userId: string, signUpData: SignUpInput) => {
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: signUpData.fullName,
          student_id: signUpData.studentId || null, // Make student_id optional
          phone: signUpData.phone || null, // Make phone optional
          terms_accepted: signUpData.termsAccepted
        });

      if (profileError) {
        // Handle specific profile creation errors
        if (profileError.message?.includes('profiles_student_id_key')) {
          throw new Error('This student ID is already registered. Please use a different one or leave it blank.');
        }
        throw profileError;
      }

      return { success: true };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Failed to create profile' };
    }
  };

  const onSubmit = async (data: SignUpInput | SignInInput) => {
    setIsLoading(true);
    clearErrors();

    try {
      if (mode === 'signUp') {
        const signUpData = data as SignUpInput;

        // First, check if email exists
        const { data: emailCheck } = await supabase.auth.signInWithPassword({
          email: signUpData.email,
          password: 'dummy-password-for-check'
        });

        if (emailCheck?.user) {
          setError('email', {
            type: 'manual',
            message: 'This email is already registered. Please sign in instead.'
          });
          return;
        }

        // Proceed with sign up
        const { error: authError, data: authData } = await supabase.auth.signUp({
          email: signUpData.email,
          password: signUpData.password,
          options: {
            data: {
              full_name: signUpData.fullName
            }
          }
        });

        if (authError) throw authError;

        if (authData.user) {
          const profileResult = await handleProfileCreation(authData.user.id, signUpData);
          
          if (profileResult.error) {
            // If profile creation fails, attempt to clean up the auth user
            await supabase.auth.admin.deleteUser(authData.user.id);
            throw new Error(profileResult.error);
          }

          toast.success('Account created successfully!');
          if (tempBooking) {
            clearTempBooking();
          }
          onSuccess?.();
        }
      } else {
        const signInData = data as SignInInput;
        const { error } = await supabase.auth.signInWithPassword({
          email: signInData.email,
          password: signInData.password
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('password', {
              type: 'manual',
              message: 'Invalid email or password'
            });
            return;
          }
          throw error;
        }

        toast.success('Signed in successfully!');
        onSuccess?.();
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-center mb-2 font-serif">
        {tempBooking ? 'Create Account to Complete Booking' : (mode === 'signIn' ? 'Sign In' : 'Create Account')}
      </h2>
      {tempBooking && (
        <p className="text-center text-gray-600 mb-6">
          You're almost there! Create an account to confirm your booking.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'signUp' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register('fullName')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID (Optional)
              </label>
              <input
                {...register('studentId')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.studentId && (
                <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {mode === 'signIn' && !tempBooking && (
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-green-600 hover:text-green-500"
            >
              Forgot password?
            </button>
          </div>
        )}

        {mode === 'signUp' && (
          <div className="flex items-start">
            <input
              {...register('termsAccepted')}
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label className="ml-2 text-sm text-gray-600">
              I accept the terms of service and privacy policy
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : tempBooking ? (
            'Create Account & Complete Booking'
          ) : mode === 'signIn' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {!tempBooking && (
        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === 'signIn' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleMode}
            className="text-green-600 hover:text-green-500 font-medium"
          >
            {mode === 'signIn' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      )}
    </motion.div>
  );
}