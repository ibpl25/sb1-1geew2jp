interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-lg ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}