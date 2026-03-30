/*
  # Remove want_financial_advisor column from consultation_requests table

  1. Changes
    - Drop the `want_financial_advisor` column from the `consultation_requests` table
    - This field is no longer used in the quote request form
  
  2. Notes
    - Uses ALTER TABLE IF EXISTS to safely handle the removal
    - Existing data in this column will be discarded
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_requests' AND column_name = 'want_financial_advisor'
  ) THEN
    ALTER TABLE consultation_requests DROP COLUMN want_financial_advisor;
  END IF;
END $$;