/*
  # Fix Groupe BML Rénovation Leads RLS policies

  1. Issue
    - Previous policies were too restrictive
    - INSERT policy was rejecting form submissions

  2. Changes
    - Drop existing restrictive policies
    - Create new permissive INSERT policy that allows all authenticated and anonymous users
    - Keep SELECT policy for service role only

  3. Security Notes
    - INSERT policy uses USING (true) to allow form submissions from public
    - SELECT policy restricted to service role for admin access only
    - This allows public form submissions while protecting data from unauthorized reads
*/

DROP POLICY IF EXISTS "Allow public form submissions" ON "Groupe BML Rénovation Leads";
DROP POLICY IF EXISTS "Allow service role to read all leads" ON "Groupe BML Rénovation Leads";

CREATE POLICY "Allow anonymous form submissions"
  ON "Groupe BML Rénovation Leads"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role read all leads"
  ON "Groupe BML Rénovation Leads"
  FOR SELECT
  TO service_role
  USING (true);