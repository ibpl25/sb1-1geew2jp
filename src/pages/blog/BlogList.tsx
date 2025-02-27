import { Section } from '../../components/ui/Section';
import { BlogCard } from '../../components/ui/BlogCard';
import { blogPosts } from '../../data/blog';

export function BlogList() {
  return (
    <Section
      id="blog"
      title="Cultural Corner"
      subtitle="Insights into Italian language, culture, and lifestyle"
      className="bg-gray-50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </Section>
  );
}