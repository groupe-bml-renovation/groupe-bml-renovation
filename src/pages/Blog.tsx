import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import BlogPostList from '../components/BlogPostList';
import { getBlogPosts, getBlogCategories, type BlogPost } from '../services/blogService';
import { getCanonicalUrl } from '../lib/seo-utils';

interface BlogPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export default function Blog({ onBack, onNavigate }: BlogPageProps) {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/blog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getBlogCategories();
      if (result.success) {
        setCategories(result.data);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const postsResult = await getBlogPosts({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: searchQuery || undefined
      });

      if (postsResult.success) {
        setPosts(postsResult.data.data);
      } else {
        setError(postsResult.error);
      }

      setLoading(false);
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery]);

  const pageTitle = isGrenoble
    ? 'Blog Rénovation Grenoble | Conseils et Inspirations'
    : 'Blog Rénovation | Conseils et Inspirations';
  const metaDescription = isGrenoble
    ? 'Découvrez nos conseils en rénovation à Grenoble et en Isère. Articles, inspirations et tendances pour transformer votre espace.'
    : 'Explorez nos articles pour trouver des inspirations, des conseils pratiques et les dernières tendances en rénovation.';
  const metaKeywords = isGrenoble
    ? 'rénovation Grenoble, rénovation Isère, conseils rénovation, aménagement Grenoble, transformation maison'
    : 'rénovation, transformation, aménagement, conseils rénovation';
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-0 bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-5xl mx-auto px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
              Notre Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {isGrenoble ? (
                <>Découvrez nos <span className="text-[#38bdf8]">conseils en rénovation à Grenoble</span></>
              ) : (
                <>Découvrez nos <span className="text-[#38bdf8]">conseils en rénovation</span></>
              )}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {isGrenoble
                ? 'Explorez nos articles dédiés à la rénovation en Isère. Trouvez inspirations, conseils pratiques et tendances actuelles pour transformer votre espace à Grenoble et région.'
                : 'Explorez nos articles pour trouver des inspirations, des conseils pratiques et les dernières tendances en matière de rénovation et d\'aménagement.'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto pb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#38bdf8] transition-colors text-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        <div>
          {/* Main Content */}
          <div>
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#38bdf8] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tous les articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                      selectedCategory === category
                        ? 'bg-[#38bdf8] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Blog Posts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <BlogPostList posts={posts} loading={loading} error={error} />
            </motion.div>
          </div>
        </div>
      </div>

      <FooterSection onNavigateToServices={() => {}} onNavigate={() => {}} />
    </div>
  );
}
