/*
  # Insert Renovation Bureau Gallery Images

  1. New Data
    - Insert gallery images for the "Renovation Bureau" project
    - Images show the progression from initial state through various construction phases to final result
  
  2. Gallery Images
    - 5 images documenting the complete office renovation project
    - Each image includes captions and display order
    - All marked as process images for the project gallery
  
  3. Project Details
    - Project: Rénovation Bureau Complet
    - Budget: 62,000 EUR
    - Duration: 4 months
    - Images capture: Initial state, restructuring, sanitary equipment, electrical system, final result
*/

INSERT INTO project_gallery_images (project_slug, image_url, caption, display_order, is_process_image)
VALUES
  ('renovation-bureau', 'https://images.pexels.com/photos/3729465/pexels-photo-3729465.jpeg?auto=compress&cs=tinysrgb&w=1200', 'État initial - Bureau avant rénovation', 1, true),
  ('renovation-bureau', 'https://images.pexels.com/photos/3729467/pexels-photo-3729467.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Phase de restructuration et aménagement', 2, true),
  ('renovation-bureau', 'https://images.pexels.com/photos/3769536/pexels-photo-3769536.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Installation des équipements sanitaires', 3, true),
  ('renovation-bureau', 'https://images.pexels.com/photos/3729470/pexels-photo-3729470.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Installation du système électrique et éclairage LED', 4, true),
  ('renovation-bureau', 'https://images.pexels.com/photos/3769548/pexels-photo-3769548.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Résultat final - Bureau rénové haut de gamme', 5, true)
ON CONFLICT DO NOTHING;
