import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Eye, Trash2, RefreshCw } from 'lucide-react';
import { getForumPosts, type ForumQueryOptions } from '../services/forumService';
import type { Database } from '../lib/database.types';

type ForumPost = Database['public']['Tables']['forum_posts']['Row'];

interface ForumPostsTableProps {
  onSelectPost?: (post: ForumPost) => void;
  refresh?: boolean;
}

export function ForumPostsTable({ onSelectPost, refresh = false }: ForumPostsTableProps) {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForum, setSelectedForum] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [forums, setForums] = useState<string[]>([]);

  useEffect(() => {
    loadPosts();
  }, [searchTerm, selectedForum, sortBy, refresh]);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    const options: ForumQueryOptions = {
      limit: 50,
      offset: 0,
      source_forum: selectedForum || undefined,
      search: searchTerm || undefined
    };

    const result = await getForumPosts(options);

    if (result.success) {
      setPosts(result.data.items || []);
      const uniqueForums = Array.from(new Set((result.data.items || []).map(p => p.source_forum)));
      setForums(uniqueForums.sort());
    } else {
      setError(result.error || 'Failed to load forum posts');
    }

    setLoading(false);
  };

  const getSourceColor = (source: string): string => {
    const colors: Record<string, string> = {
      'StackExchange': 'bg-orange-100 text-orange-800',
      'Reddit': 'bg-red-100 text-red-800',
      'GitHub': 'bg-gray-800 text-white',
      'DigitalOcean': 'bg-blue-100 text-blue-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Forum Posts</h2>
        <button
          onClick={loadPosts}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={selectedForum}
            onChange={(e) => setSelectedForum(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Forums</option>
            {forums.map(forum => (
              <option key={forum} value={forum}>{forum}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>

          <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 flex items-center">
            {loading ? 'Loading...' : `${posts.length} post${posts.length !== 1 ? 's' : ''}`}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-600">
          <p>No forum posts found</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin">
            <RefreshCw className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <div
              className="p-4 cursor-pointer flex items-start gap-4"
              onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getSourceColor(post.source_forum)}`}>
                    {post.source_forum}
                  </span>
                </div>

                <p className="text-sm text-gray-600 truncate">{post.content.substring(0, 100)}...</p>

                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>By {post.author}</span>
                  <span>{formatDate(post.created_at)}</span>
                  {post.likes_count > 0 && <span>{post.likes_count} likes</span>}
                  {post.replies_count > 0 && <span>{post.replies_count} replies</span>}
                </div>
              </div>

              {expandedId === post.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              )}
            </div>

            {expandedId === post.id && (
              <div className="border-t border-gray-200 px-4 py-4 bg-gray-50 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Full Content</h4>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                {post.category && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-xs">Category</h4>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {post.category}
                    </span>
                  </div>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-xs">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-1 text-xs">Source</h4>
                  <a
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs break-all"
                  >
                    {post.source_url}
                  </a>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPost?.(post);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
