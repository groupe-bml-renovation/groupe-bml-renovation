/*
  # Add Calendly booking fields to leads table

  1. New Columns
    - `calendly_event_uri` (text, nullable) - URI of the Calendly event
    - `calendly_scheduled_time` (timestamptz, nullable) - When the appointment is scheduled
    - `calendly_invitee_uri` (text, nullable) - URI of the invitee in Calendly
    - `calendly_booking_status` (text, nullable) - Status of the Calendly booking
  
  2. Changes
    - Adds Calendly integration columns to track scheduled appointments
    - Enables storing complete booking information with form submissions

  3. Notes
    - All new columns are nullable to maintain backward compatibility
    - Existing records will have NULL values for these fields
    - RLS policies remain unchanged as they protect table access at row level
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Groupe BML Rénovation Leads' AND column_name = 'calendly_event_uri'
  ) THEN
    ALTER TABLE "Groupe BML Rénovation Leads" ADD COLUMN calendly_event_uri text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Groupe BML Rénovation Leads' AND column_name = 'calendly_scheduled_time'
  ) THEN
    ALTER TABLE "Groupe BML Rénovation Leads" ADD COLUMN calendly_scheduled_time timestamptz;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Groupe BML Rénovation Leads' AND column_name = 'calendly_invitee_uri'
  ) THEN
    ALTER TABLE "Groupe BML Rénovation Leads" ADD COLUMN calendly_invitee_uri text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Groupe BML Rénovation Leads' AND column_name = 'calendly_booking_status'
  ) THEN
    ALTER TABLE "Groupe BML Rénovation Leads" ADD COLUMN calendly_booking_status text DEFAULT 'pending';
  END IF;
END $$;