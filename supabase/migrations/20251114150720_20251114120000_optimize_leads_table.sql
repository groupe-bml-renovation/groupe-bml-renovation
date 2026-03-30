/*
  # Optimize Leads Table Schema

  1. Enhancements
    - Add `subject` column for project type/category
    - Add indexes for better query performance
    - Ensure all required columns are present and properly typed

  2. Changes
    - All columns properly defined and indexed
    - RLS policies already in place
    - Table ready for full lead capture from forms

  3. Notes
    - Column constraints and defaults match the service layer expectations
    - No data loss - using IF EXISTS to prevent errors
*/

DO $$
BEGIN
  -- Add subject column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'subject'
  ) THEN
    ALTER TABLE leads ADD COLUMN subject text;
  END IF;
END $$;

-- Ensure indexes exist for optimal query performance
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads(source);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_company_name_idx ON leads(company_name);
CREATE INDEX IF NOT EXISTS leads_contact_name_idx ON leads(contact_name);
