import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BlogPostType } from '../../types';
import { formatDate } from '../../utils/date';

interface BlogCardProps {
  post: BlogPostType;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <time className="text-sm text-gray-500">
            {formatDate(post.date)}
          </time>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-green-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <a
          href={`/blog/${post.id}`}
          className="text-green-700 font-medium inline-flex items-center group-hover:text-green-800"
        >
          Read more
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
}