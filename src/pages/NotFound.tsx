import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 font-serif">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The requested article could not be found.</p>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/#blog'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>
    </div>
  );
}