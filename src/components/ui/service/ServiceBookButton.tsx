import { Button } from '../Button';

interface ServiceBookButtonProps {
  highlight?: boolean;
  onClick: () => void;
}

export function ServiceBookButton({ highlight, onClick }: ServiceBookButtonProps) {
  return (
    <Button 
      variant={highlight ? 'primary' : 'secondary'}
      className={`w-full py-3 text-lg font-medium transition-all duration-300
        ${highlight ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={onClick}
    >
      Book Now
    </Button>
  );
}