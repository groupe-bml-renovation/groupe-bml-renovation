/*
  # Create Service Areas and Locations Tables

  1. New Tables
    - `service_areas`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the service area (commune/city)
      - `region` (text) - Region name (e.g., "Isère")
      - `postal_code` (text) - Postal code
      - `latitude` (numeric) - Geographic latitude
      - `longitude` (numeric) - Geographic longitude
      - `is_primary` (boolean) - True for Grenoble (primary service area)
      - `description` (text) - Brief description of the area
      - `created_at` (timestamp)

    - `local_seo_keywords`
      - `id` (uuid, primary key)
      - `keyword` (text) - SEO keyword with location
      - `service_area_id` (uuid) - FK to service_areas
      - `search_volume` (integer) - Estimated monthly searches
      - `difficulty` (integer) - SEO difficulty score
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Create public read policy for service_areas
    - Create public read policy for local_seo_keywords

  3. Indexes
    - Add index on service_areas(is_primary, name)
    - Add index on local_seo_keywords(service_area_id)
*/

CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  postal_code text,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  is_primary boolean DEFAULT false,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, region)
);

CREATE TABLE IF NOT EXISTS local_seo_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  service_area_id uuid NOT NULL REFERENCES service_areas(id) ON DELETE CASCADE,
  search_volume integer,
  difficulty integer,
  created_at timestamptz DEFAULT now(),
  UNIQUE(keyword, service_area_id)
);

ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_seo_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service areas are publicly readable"
  ON service_areas FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Local SEO keywords are publicly readable"
  ON local_seo_keywords FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_service_areas_primary ON service_areas(is_primary, name);
CREATE INDEX IF NOT EXISTS idx_local_seo_keywords_area ON local_seo_keywords(service_area_id);

INSERT INTO service_areas (name, region, postal_code, latitude, longitude, is_primary, description)
VALUES
  ('Grenoble', 'Isère', '38000', 45.1885, 5.7245, true, 'Siège principal et zone d''intervention prioritaire'),
  ('Échirolles', 'Isère', '38130', 45.1667, 5.7333, false, 'Zone d''intervention étendue en Isère'),
  ('Meylan', 'Isère', '38240', 45.2167, 5.7667, false, 'Zone d''intervention étendue en Isère'),
  ('Fontaine', 'Isère', '38600', 45.1917, 5.6750, false, 'Zone d''intervention étendue en Isère'),
  ('Saint-Martin-d''Hères', 'Isère', '38400', 45.1500, 5.7667, false, 'Zone d''intervention étendue en Isère'),
  ('Voiron', 'Isère', '38500', 45.3667, 5.5833, false, 'Zone d''intervention étendue en Isère')
ON CONFLICT (name, region) DO NOTHING;
