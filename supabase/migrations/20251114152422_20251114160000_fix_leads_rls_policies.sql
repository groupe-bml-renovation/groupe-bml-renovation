/*
  # Fix Leads Table RLS Policies

  1. Issue
    - The leads table has RLS enabled but incomplete policies
    - Anonymous users cannot insert new leads due to missing/restrictive policies
    - This blocks all form submissions from the application

  2. Changes
    - Drop existing restrictive policies
    - Create permissive INSERT policy for anonymous and authenticated users
    - Create SELECT policy for authenticated users only
    - Create UPDATE policy for authenticated users only
    - Create DELETE policy for authenticated users only
    - Ensure public form submissions work while protecting data access

  3. Security
    - RLS remains enabled
    - Only anonymous users can INSERT (no SELECT/UPDATE/DELETE)
    - Only authenticated users can SELECT, UPDATE, DELETE
    - Data is collected but protected from unauthorized access

  4. Notes
    - Form submissions require only INSERT permission
    - Admin/authenticated users need SELECT/UPDATE/DELETE for management
    - This configuration balances public access with data protection
*/

-- Drop existing overly-restrictive policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can view all leads" ON leads;

-- CREATE INSERT policy for public form submissions
CREATE POLICY "Allow public lead submissions"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- CREATE SELECT policy for authenticated users only (admin/staff)
CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- CREATE UPDATE policy for authenticated users only
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- CREATE DELETE policy for authenticated users only
CREATE POLICY "Authenticated users can delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);
