/*
  # Fix RLS Policy Performance Issues - Auth Function Call Optimization

  1. Performance Issue
    - Two RLS policies were re-evaluating auth.jwt() for each row
    - This causes suboptimal query performance at scale
    - Solution: Replace direct auth.jwt() calls with (select auth.jwt())

  2. Tables Fixed
    - `Jadder Rénovation`: Policy "Users can read own submissions"
    - `reviews`: Policy "Authenticated users can update own reviews"

  3. Changes
    - Drop inefficient policies
    - Recreate with optimized auth function calls using SELECT subqueries
    - Maintains same security and functionality with better performance
*/

-- Fix Jadder Rénovation table policy
DROP POLICY IF EXISTS "Users can read own submissions" ON "public"."Jadder Rénovation";

CREATE POLICY "Users can read own submissions"
  ON "public"."Jadder Rénovation"
  FOR SELECT
  TO authenticated
  USING (email = (select auth.jwt() ->> 'email'));

-- Fix reviews table policy
DROP POLICY IF EXISTS "Authenticated users can update own reviews" ON "public"."reviews";

CREATE POLICY "Authenticated users can update own reviews"
  ON "public"."reviews"
  FOR UPDATE
  TO authenticated
  USING (reviewer_name = (select auth.jwt() ->> 'name'))
  WITH CHECK (reviewer_name = (select auth.jwt() ->> 'name'));
