/*
  # Add Appointment Date to Groupe BML Rénovation Leads

  1. New Columns
    - `appointment_date` (date, nullable) - Stores the preferred appointment date for the consultation

  2. Modified Tables
    - `Groupe BML Rénovation Leads`
      - Added `appointment_date` column to allow users to specify their preferred consultation appointment date

  3. Security
    - No RLS changes required; existing policies remain in effect

  4. Notes
    - Field is optional (nullable) to maintain backward compatibility
    - Allows users to indicate preferred appointment timing during consultation request
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Groupe BML Rénovation Leads' AND column_name = 'appointment_date'
  ) THEN
    ALTER TABLE "Groupe BML Rénovation Leads" ADD COLUMN appointment_date date;
  END IF;
END $$;