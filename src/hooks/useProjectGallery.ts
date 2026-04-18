import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface GalleryImage {
  id: string;
  project_slug: string;
  image_url: string;
  caption: string;
  display_order: number;
  is_process_image: boolean;
  created_at?: string;
}

interface UseProjectGalleryResult {
  images: GalleryImage[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
}

function createSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export const useProjectGallery = (
  projectSlug: string,
  staticImages?: GalleryImage[]
): UseProjectGalleryResult => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  const fetchGalleryImages = async (pageIndex: number) => {
    try {
      if (pageIndex === 0) setLoading(true);

      if (staticImages && staticImages.length > 0) {
        setImages(staticImages);
        setError(null);
        setLoading(false);
        setHasMore(false);
        return;
      }

      const supabase = createSupabaseClient();
      const from = pageIndex * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error: supabaseError } = await supabase
        .from('project_gallery_images')
        .select('*')
        .eq('project_slug', projectSlug)
        .order('display_order', { ascending: true })
        .range(from, to);

      if (supabaseError) throw supabaseError;

      if (data) {
        setImages(prev => pageIndex === 0 ? data : [...prev, ...data]);
        setHasMore(data.length === PAGE_SIZE);
      }
      
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch gallery images');
      setError(error);
    } finally {
      if (pageIndex === 0) setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    if (projectSlug) {
      fetchGalleryImages(0);
    }
  }, [projectSlug, staticImages]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGalleryImages(nextPage);
    }
  };

  return { images, loading, error, hasMore, loadMore };
};
