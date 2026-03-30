import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { FooterSection } from '../components/footer-section';
import BlogPostCard from '../components/BlogPostCard';
import { getBlogPostBySlug, getRelatedBlogPosts, type BlogPost } from '../services/blogService';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      const result = await getBlogPostBySlug(slug);

      if (result.success && result.data) {
        setPost(result.data);

        const relatedResult = await getRelatedBlogPosts(result.data.id, result.data.category, 3);
        if (relatedResult.success) {
          setRelatedPosts(relatedResult.data);
        }
      } else {
        setError('Article non trouvé');
      }

      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-[#38bdf8] rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">{error || 'Cet article n\'existe pas ou a été supprimé.'}</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#38bdf8] text-white font-semibold rounded-lg hover:bg-cyan-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = post.published_at ? new Date(post.published_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 pb-6"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#38bdf8] font-semibold hover:text-cyan-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </Link>
        </motion.div>

        {post.featured_image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-xl overflow-hidden h-96 bg-gray-200"
          >
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="mb-8 border-b-2 border-gray-100 pb-8">
            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span className="inline-block px-3 py-1 bg-blue-50 text-[#38bdf8] text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              )}
              {post.read_time && (
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min de lecture
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-xl text-gray-600 mb-6">
                {post.subtitle}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                {publishedDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <time dateTime={post.published_at || ''}>{publishedDate}</time>
                  </div>
                )}
                {post.author && (
                  <div className="text-gray-600">
                    Par <span className="font-semibold text-gray-900">{post.author}</span>
                  </div>
                )}
              </div>

              <button className="inline-flex items-center gap-2 px-4 py-2 text-[#38bdf8] border-2 border-[#38bdf8] rounded-lg hover:bg-blue-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>
          </header>

          <div className="prose prose-lg max-w-none mb-12 text-gray-700">
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n\n')
                  .map((paragraph: string) => {
                    if (paragraph.startsWith('##')) {
                      return `<h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${paragraph.replace(/^##\s*/, '')}</h2>`;
                    }
                    if (paragraph.startsWith('###')) {
                      return `<h3 class="text-2xl font-bold text-gray-900 mt-6 mb-3">${paragraph.replace(/^###\s*/, '')}</h3>`;
                    }
                    if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
                      const items = paragraph.split('\n').map((item: string) => `<li class="ml-4">${item.replace(/^[-•]\s*/, '')}</li>`).join('');
                      return `<ul class="list-disc space-y-2">${items}</ul>`;
                    }
                    if (/^\d+\)/.test(paragraph)) {
                      const items = paragraph.split('\n').map((item: string) => `<li class="ml-4">${item.replace(/^\d+\)\s*/, '')}</li>`).join('');
                      return `<ol class="list-decimal space-y-2">${items}</ol>`;
                    }
                    return `<p class="leading-relaxed">${paragraph}</p>`;
                  })
                  .join('')
              }}
            />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="border-t-2 border-gray-100 pt-8 mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Étiquettes</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-[#38bdf8] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t-2 border-gray-100 pt-12 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <FooterSection onNavigateToServices={() => {}} onNavigate={() => {}} />
    </div>
  );
}
