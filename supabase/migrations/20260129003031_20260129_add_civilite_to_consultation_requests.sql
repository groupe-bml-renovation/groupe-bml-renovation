/*
  # Add civilite field to consultation_requests table

  1. Changes
    - Add `civilite` column to `consultation_requests` table
      - Type: text
      - Allowed values: 'M' (Monsieur) or 'Mme' (Madame)
      - NOT NULL with default value 'M'

  2. Purpose
    - Collect gender/civility information from customers for personalized communication
    - Enables better customer service and communication preferences

  3. Constraints
    - Check constraint to ensure only 'M' or 'Mme' are stored
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_requests' AND column_name = 'civilite'
  ) THEN
    ALTER TABLE consultation_requests
    ADD COLUMN civilite text DEFAULT 'M' NOT NULL
    CHECK (civilite IN ('M', 'Mme'));
  END IF;
END $$;
