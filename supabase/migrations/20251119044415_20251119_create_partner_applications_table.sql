/*
  # Create partner craftsman applications table

  1. New Tables
    - `partner_applications`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `trade_specialization` (text)
      - `certifications` (text)
      - `years_experience` (integer)
      - `service_areas` (text)
      - `insurance_details` (text)
      - `employee_count` (integer)
      - `availability` (text)
      - `additional_info` (text)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `partner_applications` table
    - Add policy for public insert access (no authentication required for form submission)
    - Add policy for admins to view all applications
*/

CREATE TABLE IF NOT EXISTS public.partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  trade_specialization text NOT NULL,
  certifications text,
  years_experience integer,
  service_areas text,
  insurance_details text,
  employee_count integer,
  availability text,
  additional_info text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit partner applications"
  ON public.partner_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own applications via email"
  ON public.partner_applications
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid() LIMIT 1));

CREATE POLICY "Service role can view all applications"
  ON public.partner_applications
  FOR SELECT
  TO service_role
  USING (true);
