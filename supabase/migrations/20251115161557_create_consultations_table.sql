/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key) - Unique identifier
      - `work_type` (text) - Type of work requested
      - `budget` (text) - Estimated budget range
      - `first_name` (text) - Customer first name
      - `last_name` (text) - Customer last name
      - `email` (text) - Customer email address
      - `phone` (text) - Customer phone number
      - `address` (text) - Project address
      - `postal_code` (text) - Project postal code
      - `city` (text) - Project city
      - `project_description` (text) - Detailed project description
      - `status` (text) - Consultation status (new, contacted, scheduled, etc.)
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp

  2. Security
    - Enable RLS on `consultations` table
    - Add policy to allow anonymous users to insert new consultations
    - Add policy to allow authenticated users to read their own consultations (optional for future)

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting and filtering
*/

CREATE TABLE IF NOT EXISTS consultations (
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

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can insert consultations authenticated"
  ON consultations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS consultations_email_idx ON consultations(email);
CREATE INDEX IF NOT EXISTS consultations_created_at_idx ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS consultations_status_idx ON consultations(status);