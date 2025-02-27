import { useEffect } from 'react';
import { BlogHeader } from '../../components/blog/BlogHeader';
import { BlogImage } from '../../components/blog/BlogImage';
import { BlogNavigation } from '../../components/blog/BlogNavigation';
import { Markdown } from '../../components/ui/Markdown';
import { blogPosts } from '../../data/blog';
import { NotFound } from '../NotFound';

interface BlogPostProps {
  id: number;
}

export function BlogPost({ id }: BlogPostProps) {
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="bg-gray-50 pt-32 lg:pt-24">
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <BlogImage src={post.image} alt={post.title} />
        
        <div className="p-8">
          <BlogNavigation />
          <BlogHeader
            title={post.title}
            category={post.category}
            date={post.date}
            excerpt={post.excerpt}
          />
          <Markdown content={post.content} />
        </div>
      </article>
    </div>
  );
}