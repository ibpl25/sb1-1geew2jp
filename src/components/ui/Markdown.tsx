import { useMemo } from 'react';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  const formattedContent = useMemo(() => {
    return content.split('\n').map((paragraph, index) => {
      // Handle headings
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)[0].length;
        const text = paragraph.replace(/^#+\s/, '');
        const className = 'font-serif mb-4 mt-8';
        
        switch (level) {
          case 1: return <h1 key={index} className={`text-4xl font-bold ${className}`}>{text}</h1>;
          case 2: return <h2 key={index} className={`text-3xl font-bold ${className}`}>{text}</h2>;
          case 3: return <h3 key={index} className={`text-2xl font-bold ${className}`}>{text}</h3>;
          default: return <h4 key={index} className={`text-xl font-bold ${className}`}>{text}</h4>;
        }
      }

      // Handle lists
      if (paragraph.startsWith('-')) {
        const text = paragraph.replace(/^-\s/, '');
        // Handle bold text within list items
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700" 
              dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
      }

      // Handle numbered lists
      if (paragraph.match(/^\d+\./)) {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700 list-decimal">
            {paragraph.replace(/^\d+\.\s/, '')}
          </li>
        );
      }

      // Handle bold text
      if (paragraph.includes('**')) {
        const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed"
             dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
      }

      // Handle paragraphs
      return paragraph.trim() && (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  }, [content]);

  return <div className="prose prose-lg max-w-none">{formattedContent}</div>;
}