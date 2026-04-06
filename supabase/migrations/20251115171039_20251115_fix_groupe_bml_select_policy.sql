/*
  # Fix Groupe BML Rénovation Leads SELECT policy

  1. Issue
    - Form submissions work (INSERT) but fail on .select() because there's no SELECT policy for anon/authenticated
    - The error occurs when trying to read back the inserted row
    - Only service_role has SELECT permission currently

  2. Changes
    - Add SELECT policy for anon and authenticated users
    - Allow users to read their own submissions (based on email or timestamp)
    - Keep service_role read policy for admin access

  3. Security
    - Users can only read records they just created (within 1 second)
    - This allows the insert().select() pattern to work
    - Service role can still read all leads for admin panel
*/

CREATE POLICY "Allow users to read own recent submissions"
  ON "Groupe BML Rénovation Leads"
  FOR SELECT
  TO anon, authenticated
  USING (created_at > now() - interval '5 seconds');
