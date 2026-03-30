/*
  # Consolidate and fix Groupe BML Rénovation Leads RLS policies

  1. Issue
    - Multiple overlapping INSERT policies causing conflicts
    - "Allow anonymous insert" and "Allow authenticated insert" policies are redundant
    - "Allow anonymous form submissions" policy exists but conflicts with above

  2. Changes
    - Drop all existing INSERT policies
    - Drop existing SELECT policy (we'll recreate a proper one)
    - Create single unified INSERT policy that allows both anon and authenticated
    - Create SELECT policy for service_role only (admin/backend access)
    - This resolves the RLS conflict that was blocking form submissions

  3. Security
    - Single INSERT policy with clear permissions
    - INSERT allows all anonymous and authenticated users
    - SELECT restricted to service_role only
    - No USING clause needed on INSERT (only WITH CHECK)
    - Proper separation of concerns

  4. Expected Result
    - Form submissions will succeed without RLS violations
    - Data remains protected from unauthorized reads
*/

DROP POLICY IF EXISTS "Allow anonymous insert" ON "Groupe BML Rénovation Leads";
DROP POLICY IF EXISTS "Allow authenticated insert" ON "Groupe BML Rénovation Leads";
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON "Groupe BML Rénovation Leads";
DROP POLICY IF EXISTS "Service role read all leads" ON "Groupe BML Rénovation Leads";

CREATE POLICY "Allow public form submissions"
  ON "Groupe BML Rénovation Leads"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role read all"
  ON "Groupe BML Rénovation Leads"
  FOR SELECT
  TO service_role
  USING (true);
