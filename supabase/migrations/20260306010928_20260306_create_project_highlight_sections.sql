/*
  # Create project highlight sections table

  1. New Tables
    - `project_highlight_sections`
      - `id` (uuid, primary key)
      - `project_slug` (text, unique, identifies which project this section belongs to)
      - `section_title` (text, display title for the section)
      - `section_description` (text, descriptive content)
      - `section_image_url` (text, image URL for left side)
      - `cta_button_text` (text, CTA button label)
      - `created_at` (timestamp, creation time)
      - `updated_at` (timestamp, last update time)

  2. Security
    - Enable RLS on `project_highlight_sections` table
    - Add policy for public read access (anyone can view published sections)

  3. Notes
    - This table stores custom highlight section content for project pages
    - Each project can have one highlight section with unique image and text
    - CTA button opens gallery modal for viewing project images
*/

CREATE TABLE IF NOT EXISTS project_highlight_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug text UNIQUE NOT NULL,
  section_title text NOT NULL,
  section_description text NOT NULL,
  section_image_url text NOT NULL,
  cta_button_text text NOT NULL DEFAULT 'Voir la galerie complète',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_highlight_sections_project_slug
  ON project_highlight_sections(project_slug);

ALTER TABLE project_highlight_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project highlight sections are publicly readable"
  ON project_highlight_sections
  FOR SELECT
  TO public
  USING (true);

INSERT INTO project_highlight_sections (
  project_slug,
  section_title,
  section_description,
  section_image_url,
  cta_button_text
) VALUES (
  'salle-bain-pmr',
  'Galerie Complète de la Rénovation',
  'Découvrez toutes les étapes de cette rénovation PMR, de la démolition initiale aux finitions. Nos photos montrent comment nous avons transformé cet espace en une salle de bain moderne, sécurisée et entièrement accessible aux personnes à mobilité réduite.',
  'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2003.png',
  'Voir la galerie complète'
) ON CONFLICT (project_slug) DO NOTHING;