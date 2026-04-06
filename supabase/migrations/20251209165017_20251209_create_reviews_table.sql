/*
  # Create reviews table

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `name` (text) - Reviewer name
      - `text` (text) - Review content
      - `role` (text) - Review category/type
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `reviews` table
    - Add policy for public read access (reviews are public)
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  text text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are publicly readable"
  ON reviews
  FOR SELECT
  TO public
  USING (true);