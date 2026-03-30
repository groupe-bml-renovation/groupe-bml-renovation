/*
  # Create Artisan Partner Applications Table

  1. New Tables
    - `artisan_partner_applications`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `trade_specialization` (text, required)
      - `years_experience` (integer)
      - `certifications` (text)
      - `service_areas` (text, required)
      - `insurance_details` (text)
      - `portfolio_url` (text)
      - `previous_projects` (text)
      - `employee_count` (integer)
      - `availability` (text, required)
      - `additional_info` (text)
      - `status` (text, default: 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `artisan_partner_applications` table
    - Add policy for public INSERT (anyone can submit applications)
    - Add policy for authenticated SELECT (only admins via service role)
*/

CREATE TABLE IF NOT EXISTS artisan_partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  trade_specialization text NOT NULL,
  years_experience integer,
  certifications text,
  service_areas text NOT NULL,
  insurance_details text,
  portfolio_url text,
  previous_projects text,
  employee_count integer,
  availability text NOT NULL,
  additional_info text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE artisan_partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit artisan partner applications"
  ON artisan_partner_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can view all artisan partner applications"
  ON artisan_partner_applications
  FOR SELECT
  TO service_role
  USING (true);
