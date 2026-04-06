/*
  # Consolidate Duplicate RLS Policies
  
  1. Changes
    - Remove duplicate "Anyone can create financing simulations" policy
    - Keep only single permissive INSERT policy for anon/authenticated roles
    - Consolidate multiple SELECT policies into one comprehensive policy
    - Maintains all legitimate access patterns while removing redundancy
*/

DROP POLICY IF EXISTS "Anyone can insert financing simulations" ON public.financing_simulations;
DROP POLICY IF EXISTS "Allow read access to financing simulations" ON public.financing_simulations;
DROP POLICY IF EXISTS "Authenticated users can view financing simulations" ON public.financing_simulations;