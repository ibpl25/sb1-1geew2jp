import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface PaymentLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function PaymentLayout({ children, title, subtitle }: PaymentLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 font-serif">{title}</h1>
        <p className="text-gray-600 text-center mb-8">{subtitle}</p>
        {children}
        <div className="mt-8">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}