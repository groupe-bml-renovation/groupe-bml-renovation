/*
  # Create forum posts table for storing scraped forum data

  1. New Tables
    - `forum_posts`
      - `id` (uuid, primary key) - Unique identifier for each forum post
      - `title` (text) - Forum post title
      - `content` (text) - Full post content/body
      - `author` (text) - Original post author name
      - `source_url` (text) - URL to the original forum post
      - `source_forum` (text) - Name of the forum website (e.g., "Reddit", "StackOverflow")
      - `source_id` (text, unique) - External identifier from the forum (prevents duplicates)
      - `category` (text, nullable) - Forum category or topic classification
      - `tags` (text[], nullable) - Array of tags associated with the post
      - `likes_count` (integer) - Number of likes/upvotes on the post
      - `replies_count` (integer) - Number of replies/comments
      - `created_at` (timestamptz) - When the post was created on the forum
      - `scraped_at` (timestamptz) - When the post was scraped into our database
      - `updated_at` (timestamptz) - When the post was last updated
      - `is_active` (boolean) - Whether the post is still available/relevant

  2. Security
    - Enable RLS on `forum_posts` table
    - Add policy for public read access (forum data is typically public)
    - Add policy for service role to insert/update/delete (for scraping operations)

  3. Indexes
    - Index on `source_id` for duplicate prevention
    - Index on `source_forum` for filtering by forum source
    - Index on `scraped_at` for chronological queries
    - Index on `category` for category-based filtering
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

CREATE INDEX IF NOT EXISTS idx_forum_posts_source_id ON forum_posts(source_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_source_forum ON forum_posts(source_forum);
CREATE INDEX IF NOT EXISTS idx_forum_posts_scraped_at ON forum_posts(scraped_at);
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author ON forum_posts(author);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public forum posts"
  ON forum_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can manage forum posts"
  ON forum_posts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
