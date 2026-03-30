/*
  # Create franchise applications table

  1. New Tables
    - `franchise_applications`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `experience_years` (integer)
      - `investment_capacity` (text)
      - `desired_location` (text)
      - `business_background` (text)
      - `timeline` (text)
      - `additional_info` (text)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `franchise_applications` table
    - Add policy for public insert access (no authentication required for form submission)
    - Add policy for admins to view all applications
*/

CREATE TABLE IF NOT EXISTS public.franchise_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience_years integer,
  investment_capacity text,
  desired_location text,
  business_background text,
  timeline text,
  additional_info text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.franchise_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit franchise applications"
  ON public.franchise_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own applications via email"
  ON public.franchise_applications
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid() LIMIT 1));

CREATE POLICY "Service role can view all applications"
  ON public.franchise_applications
  FOR SELECT
  TO service_role
  USING (true);
