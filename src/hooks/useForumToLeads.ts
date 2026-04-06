import { useState, useCallback } from 'react';
import {
  convertForumPostToLead,
  convertMultipleForumPostsToLeads,
  getForumPostsWithExtractableInfo,
  type ConversionResult,
  type ExtractedLeadInfo
} from '../services/forumToLeadsService';
import type { Database } from '../lib/database.types';

type ForumPost = Database['public']['Tables']['forum_posts']['Row'];

interface UseForumToLeadsState {
  postsWithInfo: Array<ForumPost & { extractedInfo: ExtractedLeadInfo | null }> | null;
  loading: boolean;
  error: string | null;
  converting: boolean;
  conversionResults: ConversionResult[] | null;
}

interface UseForumToLeadsReturn extends UseForumToLeadsState {
  fetchPostsWithInfo: (limit?: number) => Promise<void>;
  convertPost: (postId: string) => Promise<boolean>;
  convertMultiplePosts: (postIds: string[]) => Promise<boolean>;
  clearResults: () => void;
}

export function useForumToLeads(): UseForumToLeadsReturn {
  const [state, setState] = useState<UseForumToLeadsState>({
    postsWithInfo: null,
    loading: false,
    error: null,
    converting: false,
    conversionResults: null
  });

  const fetchPostsWithInfo = useCallback(async (limit: number = 50) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const result = await getForumPostsWithExtractableInfo(limit);

    if (result.success) {
      setState(prev => ({
        ...prev,
        postsWithInfo: result.data,
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

  const convertPost = useCallback(async (postId: string): Promise<boolean> => {
    setState(prev => ({ ...prev, converting: true, error: null }));

    const result = await convertForumPostToLead(postId);

    if (result.success) {
      setState(prev => ({
        ...prev,
        converting: false,
        conversionResults: [result.data]
      }));
      return result.data.leadCreated;
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        converting: false
      }));
      return false;
    }
  }, []);

  const convertMultiplePosts = useCallback(async (postIds: string[]): Promise<boolean> => {
    setState(prev => ({ ...prev, converting: true, error: null }));

    const result = await convertMultipleForumPostsToLeads(postIds);

    if (result.success) {
      setState(prev => ({
        ...prev,
        converting: false,
        conversionResults: result.data.results
      }));
      return result.data.successful > 0;
    } else {
      setState(prev => ({
        ...prev,
        error: result.error,
        converting: false
      }));
      return false;
    }
  }, []);

  const clearResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      conversionResults: null
    }));
  }, []);

  return {
    ...state,
    fetchPostsWithInfo,
    convertPost,
    convertMultiplePosts,
    clearResults
  };
}
