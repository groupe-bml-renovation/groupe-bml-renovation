import React from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import type { BlogPost } from '../services/blogService';

interface BlogPostListProps {
  posts: BlogPost[];
  loading?: boolean;
  error?: string | null;
}

export default function BlogPostList({ posts, loading = false, error = null }: BlogPostListProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-50 rounded-2xl p-8 border-2 border-red-200 text-center"
      >
        <p className="text-red-700 font-medium">{error}</p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-gray-200 h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-16 text-center border-2 border-gray-200"
      >
        <div className="max-w-md mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#38bdf8]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.754-1 4.5 4.5 0 11-3.385 4.98z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Aucun article trouvé
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <BlogPostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
}
