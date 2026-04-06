/*
  # Create Groupe BML Rénovation Leads table

  1. New Tables
    - `"Groupe BML Rénovation Leads"`
      - `id` (uuid, primary key)
      - `work_type` (text, required)
      - `budget` (text, optional)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `address` (text, required)
      - `postal_code` (text, optional)
      - `city` (text, optional)
      - `project_description` (text, required)
      - `status` (text, default: 'new')
      - `created_at` (timestamp, auto)
      - `updated_at` (timestamp, auto)

  2. Security
    - Enable RLS on the table
    - Add policy for public inserts (form submissions)
    - Add policy for service role reads (admin access)

  3. Notes
    - Table name uses exact French naming as requested
    - Designed to store consultation/lead form submissions
    - All required form fields are NOT NULL
    - Optional fields allow NULL values
*/

CREATE TABLE IF NOT EXISTS "Groupe BML Rénovation Leads" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_type text NOT NULL,
  budget text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  postal_code text,
  city text,
  project_description text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE "Groupe BML Rénovation Leads" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public form submissions"
  ON "Groupe BML Rénovation Leads"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all leads"
  ON "Groupe BML Rénovation Leads"
  FOR SELECT
  TO service_role
  USING (true);