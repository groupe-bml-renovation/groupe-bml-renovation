/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `contact_name` (text, required) - stores the contact person name
      - `company_name` (text, required) - stores the company name
      - `email` (text, required)
      - `phone` (text, optional)
      - `subject` (text, optional)
      - `notes` (text, required) - stores the message/description
      - `budget` (text, optional)
      - `source` (text, indicates where the form was submitted from - 'home' or 'contact')
      - `status` (text, default 'new' for lead tracking)
      - `created_at` (timestamp, automatically set)
      - `updated_at` (timestamp, automatically updated)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for inserting new leads (public)
    - Add policy for admin to view all leads (authenticated users)

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  company_name text NOT NULL DEFAULT 'Non spécifié',
  email text NOT NULL,
  phone text,
  subject text,
  notes text NOT NULL,
  budget text,
  source text NOT NULL DEFAULT 'home',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads(source);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
