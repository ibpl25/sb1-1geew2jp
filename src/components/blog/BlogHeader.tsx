import { formatDate } from '../../utils/date';

interface BlogHeaderProps {
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

export function BlogHeader({ title, category, date, excerpt }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
          {category}
        </span>
        <time className="text-sm text-gray-500">
          {formatDate(date)}
        </time>
      </div>
      <h1 className="text-4xl font-bold mb-4 font-serif">{title}</h1>
      <p className="text-xl text-gray-600">{excerpt}</p>
    </header>
  );
}