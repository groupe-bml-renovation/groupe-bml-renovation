import {
  type DatabaseResult,
  createSuccess,
  createError,
  validateRequired,
  type PaginationOptions,
  type PaginationResult,
  calculatePagination
} from '../lib/db-utils';
import { createClient } from '@supabase/supabase-js';
import { staticBlogPosts } from '../data/blog-posts';

export interface BlogPostInput {
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  tags?: string[];
  featured_image_url?: string;
  meta_title?: string;
  meta_description?: string;
  read_time?: number;
  status?: 'draft' | 'published' | 'archived';
  published_at?: string;
  is_featured?: boolean;
}

export interface BlogPost extends BlogPostInput {
  id: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogQueryOptions extends PaginationOptions {
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  search?: string;
  is_featured?: boolean;
}

function validateBlogPostInput(data: BlogPostInput): string | null {
  const titleError = validateRequired(data.title, 'Titre');
  if (titleError) return titleError;

  const slugError = validateRequired(data.slug, 'Slug');
  if (slugError) return slugError;

  const excerptError = validateRequired(data.excerpt, 'Extrait');
  if (excerptError) return excerptError;

  const contentError = validateRequired(data.content, 'Contenu');
  if (contentError) return contentError;

  return null;
}

function createSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

function isSupabaseAvailable(): boolean {
  return !!createSupabaseClient();
}

export async function getBlogPosts(
  options?: BlogQueryOptions
): Promise<DatabaseResult<PaginationResult<BlogPost>>> {
  try {
    const supabase = createSupabaseClient();
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    if (supabase) {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (options?.category) {
        query = query.eq('category', options.category);
      }

      if (options?.is_featured) {
        query = query.eq('is_featured', true);
      }

      if (options?.search) {
        query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`);
      }

      const { data, error, count } = await query.range(offset, offset + limit - 1);

      if (error) {
        console.error('Database error fetching blog posts:', error);
        return createError('Erreur lors de la récupération des articles');
      }

      const total = count || 0;
      const paginationResult = calculatePagination(data || [], total, limit, offset) as PaginationResult<BlogPost>;

      return createSuccess(paginationResult);
    }

    let filtered = [...staticBlogPosts];

    if (options?.category) {
      filtered = filtered.filter(post => post.category === options.category);
    }

    if (options?.is_featured) {
      filtered = filtered.filter(post => post.is_featured === true);
    }

    if (options?.search) {
      const query = options.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());

    const total = filtered.length;
    const paginatedData = filtered.slice(offset, offset + limit);
    const paginationResult = calculatePagination(paginatedData, total, limit, offset) as PaginationResult<BlogPost>;

    return createSuccess(paginationResult);
  } catch (err) {
    console.error('Unexpected error fetching blog posts:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getBlogPostBySlug(slug: string): Promise<DatabaseResult<BlogPost | null>> {
  try {
    const supabase = createSupabaseClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error) {
        console.error('Database error fetching blog post:', error);
        return createError('Erreur lors de la récupération de l\'article');
      }

      if (data) {
        await supabase
          .from('blog_posts')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id)
          .select();
      }

      return createSuccess(data || null);
    }

    const post = staticBlogPosts.find(p => p.slug === slug && p.status === 'published') || null;
    return createSuccess(post);
  } catch (err) {
    console.error('Unexpected error fetching blog post:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getBlogPostById(id: string): Promise<DatabaseResult<BlogPost | null>> {
  try {
    const supabase = createSupabaseClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .maybeSingle();

      if (error) {
        console.error('Database error fetching blog post:', error);
        return createError('Erreur lors de la récupération de l\'article');
      }

      return createSuccess(data || null);
    }

    const post = staticBlogPosts.find(p => p.id === id && p.status === 'published') || null;
    return createSuccess(post);
  } catch (err) {
    console.error('Unexpected error fetching blog post:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getRelatedBlogPosts(
  currentPostId: string,
  category?: string,
  limit: number = 3
): Promise<DatabaseResult<BlogPost[]>> {
  try {
    const supabase = createSupabaseClient();

    if (supabase) {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Database error fetching related posts:', error);
        return createError('Erreur lors de la récupération des articles connexes');
      }

      return createSuccess(data || []);
    }

    let filtered = staticBlogPosts.filter(p => p.id !== currentPostId && p.status === 'published');

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    filtered.sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());

    return createSuccess(filtered.slice(0, limit));
  } catch (err) {
    console.error('Unexpected error fetching related posts:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getBlogCategories(): Promise<DatabaseResult<string[]>> {
  try {
    const supabase = createSupabaseClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category', { count: 'exact' })
        .eq('status', 'published')
        .not('category', 'is', null)
        .distinct();

      if (error) {
        console.error('Database error fetching categories:', error);
        return createError('Erreur lors de la récupération des catégories');
      }

      const categories = Array.from(
        new Set((data || []).map((item: { category: string | null }) => item.category).filter(Boolean))
      ) as string[];

      return createSuccess(categories);
    }

    const categories = Array.from(
      new Set(staticBlogPosts
        .filter(p => p.status === 'published' && p.category)
        .map(p => p.category!)
      )
    );

    return createSuccess(categories);
  } catch (err) {
    console.error('Unexpected error fetching categories:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getBlogPostsByCategory(
  category: string,
  options?: PaginationOptions
): Promise<DatabaseResult<PaginationResult<BlogPost>>> {
  try {
    const supabase = createSupabaseClient();
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    if (supabase) {
      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('category', category)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Database error fetching posts by category:', error);
        return createError('Erreur lors de la récupération des articles');
      }

      const total = count || 0;
      const paginationResult = calculatePagination(data || [], total, limit, offset) as PaginationResult<BlogPost>;

      return createSuccess(paginationResult);
    }

    let filtered = staticBlogPosts.filter(p => p.category === category && p.status === 'published');
    filtered.sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());

    const total = filtered.length;
    const paginatedData = filtered.slice(offset, offset + limit);
    const paginationResult = calculatePagination(paginatedData, total, limit, offset) as PaginationResult<BlogPost>;

    return createSuccess(paginationResult);
  } catch (err) {
    console.error('Unexpected error fetching posts by category:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getFeaturedBlogPosts(limit: number = 5): Promise<DatabaseResult<BlogPost[]>> {
  try {
    const supabase = createSupabaseClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Database error fetching featured posts:', error);
        return createError('Erreur lors de la récupération des articles en vedette');
      }

      return createSuccess(data || []);
    }

    let filtered = staticBlogPosts.filter(p => p.status === 'published' && p.is_featured);
    filtered.sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());

    return createSuccess(filtered.slice(0, limit));
  } catch (err) {
    console.error('Unexpected error fetching featured posts:', err);
    return createError('Une erreur inattendue est survenue');
  }
}
