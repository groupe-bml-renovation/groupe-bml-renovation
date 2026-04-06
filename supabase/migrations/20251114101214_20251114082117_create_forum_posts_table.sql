/*
  # Create forum posts table

  1. New Tables
    - `forum_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `source_url` (text, required)
      - `source_forum` (text, required)
      - `source_id` (text, required)
      - `category` (text, optional)
      - `tags` (text array, optional)
      - `likes_count` (integer, default 0)
      - `replies_count` (integer, default 0)
      - `created_at` (timestamp, required)
      - `scraped_at` (timestamp, auto-set)
      - `updated_at` (timestamp, auto-set)
      - `is_active` (boolean, default true)

  2. Security
    - Enable RLS on `forum_posts` table
    - Add policy for public select access
    - Add policy for authenticated users to insert posts

  3. Indexes
    - Index on source_forum for filtering by forum
    - Index on created_at for sorting
    - Index on category for filtering
*/

CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  source_url text NOT NULL,
  source_forum text NOT NULL,
  source_id text NOT NULL UNIQUE,
  category text,
  tags text[] DEFAULT '{}',
  likes_count integer DEFAULT 0,
  replies_count integer DEFAULT 0,
  created_at timestamptz NOT NULL,
  scraped_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active forum posts"
  ON forum_posts
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert forum posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS forum_posts_source_forum_idx ON forum_posts(source_forum);
CREATE INDEX IF NOT EXISTS forum_posts_created_at_idx ON forum_posts(created_at);
CREATE INDEX IF NOT EXISTS forum_posts_category_idx ON forum_posts(category);
CREATE INDEX IF NOT EXISTS forum_posts_is_active_idx ON forum_posts(is_active);
