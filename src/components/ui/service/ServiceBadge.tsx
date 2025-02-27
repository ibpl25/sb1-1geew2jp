interface ServiceBadgeProps {
  title: string;
  highlight?: boolean;
}

export function ServiceBadge({ title, highlight }: ServiceBadgeProps) {
  if (!highlight) return null;

  return (
    <div className="absolute -right-12 top-6 rotate-45 bg-accent text-white py-1 px-12 text-sm font-medium shadow-lg">
      {title.includes('20') ? 'Best Value' : 'Most Popular'}
    </div>
  );
}