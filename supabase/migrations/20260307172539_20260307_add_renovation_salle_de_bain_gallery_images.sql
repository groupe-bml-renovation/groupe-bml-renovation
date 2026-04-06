/*
  # Add Bathroom Renovation Gallery Images
  
  1. Gallery Images
    - `project_slug`: renovation-salle-de-bain
    - `image_url`: Pexels stock images for bathroom renovation process
    - `caption`: Descriptive captions for each image
    - `display_order`: Sequential order for gallery display
    - `is_process_image`: true for all (project process photos)
  
  2. Images Added
    - Image 1: Initial state before renovation
    - Image 2: Tile laying phase
    - Image 3: Sanitary installation phase
    - Image 4: Final result - Modern renovated bathroom
    
  3. Purpose
    - Displays in ProjectProcessGallery component on project detail page
    - Shows renovation workflow and transformation
*/

INSERT INTO project_gallery_images (project_slug, image_url, caption, display_order, is_process_image)
VALUES
  ('renovation-salle-de-bain', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?w=1000&auto=format&fit=crop', 'État initial - Salle de bain avant rénovation', 1, true),
  ('renovation-salle-de-bain', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?w=1000&auto=format&fit=crop', 'Phase de réalisation - Pose du carrelage moderne', 2, true),
  ('renovation-salle-de-bain', 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?w=1000&auto=format&fit=crop', 'Installation des sanitaires et accessoires', 3, true),
  ('renovation-salle-de-bain', 'https://images.pexels.com/photos/2343694/pexels-photo-2343694.jpeg?w=1000&auto=format&fit=crop', 'Résultat final - Salle de bain rénovée et moderne', 4, true)
ON CONFLICT DO NOTHING;
