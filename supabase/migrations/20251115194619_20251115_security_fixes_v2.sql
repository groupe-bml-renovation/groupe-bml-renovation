/*
  # Security Fixes: RLS Performance, Unused Indexes, and Function Security

  This migration addresses multiple security and performance issues:

  ## RLS Performance Optimization
  - Fixed "Jadder Rénovation" RLS policy to use (select auth.uid()) instead of direct auth.uid() call
  - Fixed "reviews" RLS policy to use (select auth.uid()) instead of direct auth.uid() call
  
  ## Unused Indexes Removal
  - Removed unused indexes from garage_de_berriat_contacts, reviews, and Groupe BML Rénovation Leads

  ## Function Search Path Security
  - Immobilized search_path for trigger functions to prevent role-based mutations
*/

-- RLS Performance Fixes: Replace auth.uid() calls with (select auth.uid()) subqueries

-- Fix Jadder Rénovation RLS policy
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'Jadder Rénovation'
    AND policyname = 'Users can read own submissions'
  ) THEN
    DROP POLICY "Users can read own submissions" ON "public"."Jadder Rénovation";
  END IF;
END $$;

CREATE POLICY "Users can read own submissions"
  ON "public"."Jadder Rénovation" FOR SELECT
  TO authenticated
  USING (email = (select auth.jwt() ->> 'email'));

-- Fix reviews RLS policy
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'reviews'
    AND policyname = 'Authenticated users can update own reviews'
  ) THEN
    DROP POLICY "Authenticated users can update own reviews" ON "public"."reviews";
  END IF;
END $$;

CREATE POLICY "Authenticated users can update own reviews"
  ON "public"."reviews" FOR UPDATE
  TO authenticated
  USING (reviewer_name = (select auth.jwt() ->> 'name'))
  WITH CHECK (reviewer_name = (select auth.jwt() ->> 'name'));

-- Drop unused indexes from garage_de_berriat_contacts
DROP INDEX IF EXISTS idx_garage_contacts_email;
DROP INDEX IF EXISTS idx_garage_contacts_created_at;

-- Drop unused indexes from reviews
DROP INDEX IF EXISTS idx_reviews_date;
DROP INDEX IF EXISTS idx_reviews_rating;
DROP INDEX IF EXISTS idx_reviews_visible;
DROP INDEX IF EXISTS idx_reviews_source;
DROP INDEX IF EXISTS idx_reviews_featured;

-- Drop unused indexes from Groupe BML Rénovation Leads
DROP INDEX IF EXISTS groupe_bml_leads_created_at_idx;
DROP INDEX IF EXISTS groupe_bml_leads_status_idx;
DROP INDEX IF EXISTS groupe_bml_leads_email_idx;

-- Fix search_path mutability in trigger functions
-- Recreate update_garage_contacts_updated_at with immutable search_path
DROP FUNCTION IF EXISTS public.update_garage_contacts_updated_at() CASCADE;

CREATE FUNCTION public.update_garage_contacts_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate update_jadder_renovation_updated_at with immutable search_path
DROP FUNCTION IF EXISTS public.update_jadder_renovation_updated_at() CASCADE;

CREATE FUNCTION public.update_jadder_renovation_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate update_updated_at_column with immutable search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate update_review_stats with immutable search_path
DROP FUNCTION IF EXISTS public.update_review_stats() CASCADE;

CREATE FUNCTION public.update_review_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Recreate the triggers
CREATE TRIGGER update_garage_de_berriat_contacts_updated_at
  BEFORE UPDATE ON public.garage_de_berriat_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_garage_contacts_updated_at();

CREATE TRIGGER update_jadder_renovation_updated_at
  BEFORE UPDATE ON "public"."Jadder Rénovation"
  FOR EACH ROW
  EXECUTE FUNCTION public.update_jadder_renovation_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
