import { useState, useCallback } from 'react';
import type { ForumPostInput, ForumQueryOptions } from '../services/forumService';
import { submitForumPost, getForumPosts, updateForumPost } from '../services/forumService';
import type { Database } from '../lib/database.types';

type ForumPost = Database['public']['Tables']['forum_posts']['Row'];

interface UseForumPostsState {
  posts: ForumPost[] | null;
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
}

interface UseForumPostsReturn extends UseForumPostsState {
  submitNewPost: (data: ForumPostInput) => Promise<boolean>;
  fetchPosts: (options?: ForumQueryOptions) => Promise<void>;
  refreshPosts: (options?: ForumQueryOptions) => Promise<void>;
  updateExistingPost: (id: string, updates: Partial<ForumPostInput>) => Promise<boolean>;
}

export function useForumPosts(): UseForumPostsReturn {
  const [state, setState] = useState<UseForumPostsState>({
    posts: null,
    loading: false,
    error: null,
    total: 0,
    hasMore: false
  });

  const fetchPosts = useCallback(async (options?: ForumQueryOptions) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await getForumPosts(options);

    if (result.success) {
      setState(prev => ({
        ...prev,
        posts: result.data.data,
        total: result.data.total,
        hasMore: result.data.hasMore,
        loading: false
      }));
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        loading: false
      }));
    }
  }, []);

  const submitNewPost = useCallback(async (data: ForumPostInput): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await submitForumPost(data);

    if (result.success) {
      setState(prev => ({ ...prev, loading: false }));
      await fetchPosts();
      return true;
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        loading: false
      }));
      return false;
    }
  }, [fetchPosts]);

  const updateExistingPost = useCallback(async (id: string, updates: Partial<ForumPostInput>): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await updateForumPost(id, updates);

    if (result.success) {
      setState(prev => ({ ...prev, loading: false }));
      await fetchPosts();
      return true;
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        loading: false
      }));
      return false;
    }
  }, [fetchPosts]);

  const refreshPosts = useCallback(async (options?: ForumQueryOptions) => {
    await fetchPosts(options);
  }, [fetchPosts]);

  return {
    ...state,
    submitNewPost,
    fetchPosts,
    refreshPosts,
    updateExistingPost
  };
}
