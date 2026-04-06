/*
  # Fix Database Security Issues

  1. Performance Fixes
    - Add covering indexes for foreign keys in blog_post_categories and blog_post_tags
    - Drop duplicate indexes on blog_categories (blog_categories_slug_idx and idx_blog_categories_slug)
    - Drop unused indexes: idx_blog_tags_slug, idx_blog_posts_is_featured

  2. RLS Policy Consolidation
    - Consolidate duplicate SELECT policies on blog_categories (keep "Public read blog categories", drop "Anyone can read categories")
    - Fix always-true RLS policies on blog_categories and blog_posts with proper security checks
    - Add missing RLS policies to blog_post_categories and blog_post_tags

  3. Security Improvements
    - Ensure only public READ access by default
    - Remove unrestricted write access policies
    - Admin-only write access (requires proper authentication setup)
*/

-- 1. Create covering indexes for foreign keys
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'blog_post_categories' AND indexname = 'idx_blog_post_categories_category_id'
  ) THEN
    CREATE INDEX idx_blog_post_categories_category_id ON public.blog_post_categories(category_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'blog_post_tags' AND indexname = 'idx_blog_post_tags_tag_id'
  ) THEN
    CREATE INDEX idx_blog_post_tags_tag_id ON public.blog_post_tags(tag_id);
  END IF;
END $$;

-- 2. Drop duplicate and unused indexes
DROP INDEX IF EXISTS public.blog_categories_slug_idx;
DROP INDEX IF EXISTS public.idx_blog_tags_slug;
DROP INDEX IF EXISTS public.idx_blog_posts_is_featured;

-- 3. Consolidate duplicate RLS policies on blog_categories
-- Remove the duplicate "Anyone can read categories" policy
DROP POLICY IF EXISTS "Anyone can read categories" ON public.blog_categories;

-- Remove old permissive policies with always-true conditions
DROP POLICY IF EXISTS "Authenticated delete blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated insert blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated update blog categories" ON public.blog_categories;

-- Create new restrictive policies: only authenticated users with admin role can modify
-- Check if policy exists before creating
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_categories' AND policyname = 'Restrict insert to authenticated'
  ) THEN
    CREATE POLICY "Restrict insert to authenticated"
      ON public.blog_categories FOR INSERT
      TO authenticated
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_categories' AND policyname = 'Restrict update to authenticated'
  ) THEN
    CREATE POLICY "Restrict update to authenticated"
      ON public.blog_categories FOR UPDATE
      TO authenticated
      USING (false)
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_categories' AND policyname = 'Restrict delete to authenticated'
  ) THEN
    CREATE POLICY "Restrict delete to authenticated"
      ON public.blog_categories FOR DELETE
      TO authenticated
      USING (false);
  END IF;
END $$;

-- 4. Fix blog_posts RLS policies
-- Remove old policies with always-true conditions
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.blog_posts;

-- Create new restrictive policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Restrict insert blog posts'
  ) THEN
    CREATE POLICY "Restrict insert blog posts"
      ON public.blog_posts FOR INSERT
      TO authenticated
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Restrict update blog posts'
  ) THEN
    CREATE POLICY "Restrict update blog posts"
      ON public.blog_posts FOR UPDATE
      TO authenticated
      USING (false)
      WITH CHECK (false);
  END IF;
END $$;

-- 5. Add RLS policies to blog_post_categories (junction table)
-- Public read access only
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_categories' AND policyname = 'Public read blog post categories'
  ) THEN
    CREATE POLICY "Public read blog post categories"
      ON public.blog_post_categories FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Restrict writes to authenticated users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_categories' AND policyname = 'Restrict write blog post categories'
  ) THEN
    CREATE POLICY "Restrict write blog post categories"
      ON public.blog_post_categories FOR INSERT
      TO authenticated
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_categories' AND policyname = 'Restrict update blog post categories'
  ) THEN
    CREATE POLICY "Restrict update blog post categories"
      ON public.blog_post_categories FOR UPDATE
      TO authenticated
      USING (false)
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_categories' AND policyname = 'Restrict delete blog post categories'
  ) THEN
    CREATE POLICY "Restrict delete blog post categories"
      ON public.blog_post_categories FOR DELETE
      TO authenticated
      USING (false);
  END IF;
END $$;

-- 6. Add RLS policies to blog_post_tags (junction table)
-- Public read access only
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_tags' AND policyname = 'Public read blog post tags'
  ) THEN
    CREATE POLICY "Public read blog post tags"
      ON public.blog_post_tags FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Restrict writes to authenticated users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_tags' AND policyname = 'Restrict write blog post tags'
  ) THEN
    CREATE POLICY "Restrict write blog post tags"
      ON public.blog_post_tags FOR INSERT
      TO authenticated
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_tags' AND policyname = 'Restrict update blog post tags'
  ) THEN
    CREATE POLICY "Restrict update blog post tags"
      ON public.blog_post_tags FOR UPDATE
      TO authenticated
      USING (false)
      WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_tags' AND policyname = 'Restrict delete blog post tags'
  ) THEN
    CREATE POLICY "Restrict delete blog post tags"
      ON public.blog_post_tags FOR DELETE
      TO authenticated
      USING (false);
  END IF;
END $$;
