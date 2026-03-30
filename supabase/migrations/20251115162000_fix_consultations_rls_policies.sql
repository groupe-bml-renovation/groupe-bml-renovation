/*
  # Fix consultations table RLS policies

  1. Security Updates
    - Remove restrictive RLS policies that prevent public inserts
    - Add permissive policies that allow anyone to insert consultations
    - Add policies for reading consultations (for future admin access)
*/

DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;
  DROP POLICY IF EXISTS "Anyone can insert consultations authenticated" ON consultations;
END $$;

CREATE POLICY "Allow anyone to insert consultations"
  ON consultations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to consultations"
  ON consultations
  FOR SELECT
  USING (true);