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

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);

        if (staticImages && staticImages.length > 0) {
          setImages(staticImages);
          setError(null);
          setLoading(false);
          return;
        }

        const supabase = createSupabaseClient();
        const { data, error: supabaseError } = await supabase
          .from('project_gallery_images')
          .select('*')
          .eq('project_slug', projectSlug)
          .order('display_order', { ascending: true });

        if (supabaseError) {
          throw supabaseError;
        }

        setImages(data || []);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch gallery images');
        setError(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    if (projectSlug) {
      fetchGalleryImages();
    }
  }, [projectSlug, staticImages]);

  return { images, loading, error };
};
