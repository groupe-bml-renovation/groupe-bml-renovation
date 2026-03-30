/*
  # Create project_gallery_images table

  1. New Tables
    - `project_gallery_images`
      - `id` (uuid, primary key)
      - `project_slug` (text) - references the project slug for gallery
      - `image_url` (text) - URL of the image
      - `caption` (text) - image caption/description
      - `display_order` (integer) - order to display images
      - `is_process_image` (boolean) - whether this shows renovation process
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `project_gallery_images` table
    - Add public read-only policy for viewing gallery images
    - Add restrictive policies for other operations

  3. Notes
    - Images are publicly readable for all users
    - Display order allows flexible gallery arrangement
    - is_process_image flag lets us filter process vs result images
*/

CREATE TABLE IF NOT EXISTS project_gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug text NOT NULL,
  image_url text NOT NULL,
  caption text DEFAULT ''::text,
  display_order integer DEFAULT 0,
  is_process_image boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_project_gallery_project_slug ON project_gallery_images(project_slug);
CREATE INDEX idx_project_gallery_display_order ON project_gallery_images(project_slug, display_order);

ALTER TABLE project_gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to gallery images"
  ON project_gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Deny all modifications"
  ON project_gallery_images
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
