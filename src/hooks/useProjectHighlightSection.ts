import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface HighlightSection {
  id: string;
  project_slug: string;
  section_title: string;
  section_description: string;
  section_image_url: string;
  cta_button_text: string;
  created_at: string;
  updated_at: string;
}

interface UseProjectHighlightSectionResult {
  section: HighlightSection | null;
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

export const useProjectHighlightSection = (projectSlug: string): UseProjectHighlightSectionResult => {
  const [section, setSection] = useState<HighlightSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHighlightSection = async () => {
      try {
        setLoading(true);
        const supabase = createSupabaseClient();
        const { data, error: supabaseError } = await supabase
          .from('project_highlight_sections')
          .select('*')
          .eq('project_slug', projectSlug)
          .maybeSingle();

        if (supabaseError) {
          throw supabaseError;
        }

        setSection(data || null);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch highlight section');
        setError(error);
        setSection(null);
      } finally {
        setLoading(false);
      }
    };

    if (projectSlug) {
      fetchHighlightSection();
    }
  }, [projectSlug]);

  return { section, loading, error };
};
