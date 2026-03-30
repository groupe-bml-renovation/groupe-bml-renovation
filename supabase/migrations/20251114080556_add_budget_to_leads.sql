/*
  # Add budget column to leads table

  1. Changes
    - Add `budget` column to track estimated project budget from forms
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'budget'
  ) THEN
    ALTER TABLE leads ADD COLUMN budget text;
  END IF;
END $$;
