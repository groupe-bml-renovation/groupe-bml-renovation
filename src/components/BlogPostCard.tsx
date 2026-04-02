import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../services/blogService';
import { OptimizedImage } from './OptimizedImage';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
// ... rest of component ...
  const publishedDate = post.published_at ? new Date(post.published_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <Link to={`/blog/${post.slug}`} className="h-full block group">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl overflow-hidden bg-white border-2 border-gray-100 group-hover:border-[#38bdf8] transition-all shadow-sm group-hover:shadow-lg cursor-pointer"
      >
        {post.featured_image_url && (
          <div className="relative overflow-hidden h-48 bg-gray-200">
            <OptimizedImage
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>
        )}

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#38bdf8] text-xs font-semibold rounded-full">
                {post.category}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {post.read_time} min
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow group-hover:text-[#38bdf8] transition-colors">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {publishedDate && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Calendar className="w-3 h-3" />
              {publishedDate}
            </div>
          )}

          <div className="inline-flex items-center gap-2 text-[#38bdf8] font-semibold group-hover:text-cyan-400 transition-colors mt-auto">
            Lire l'article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
