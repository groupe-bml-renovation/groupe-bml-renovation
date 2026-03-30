/*
  # Update Rénovation séjour gallery images

  1. Updates
    - Replace all 5 gallery images for the "renovation-sejour" project
    - Updates image URLs to point to new photos
    - Maintains the same display order (1-5)
    - Updates captions to match new images
  
  2. Images Updated
    - Image 1: G BML - 02 - 01.JPG (Initial state)
    - Image 2: G BML - 02 - 02.JPG (Demolition phase)
    - Image 3: G BML - 02 - 04.JPG (Installation phase)
    - Image 4: G BML - 02 - 03.JPG (Finishing phase)
    - Image 5: G BML - 02 - 05.JPG (Final result)
*/

UPDATE project_gallery_images
SET image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%2001.JPG',
    caption = 'Vue initiale du séjour avant rénovation'
WHERE project_slug = 'renovation-sejour' AND display_order = 1;

UPDATE project_gallery_images
SET image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%2002.JPG',
    caption = 'Phase de démolition et restructuration'
WHERE project_slug = 'renovation-sejour' AND display_order = 2;

UPDATE project_gallery_images
SET image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%2004.JPG',
    caption = 'Installation des systèmes et aménagements'
WHERE project_slug = 'renovation-sejour' AND display_order = 3;

UPDATE project_gallery_images
SET image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%2003.JPG',
    caption = 'Finitions et détails des revêtements'
WHERE project_slug = 'renovation-sejour' AND display_order = 4;

UPDATE project_gallery_images
SET image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%2005.JPG',
    caption = 'Résultat final - Séjour rénové haut de gamme'
WHERE project_slug = 'renovation-sejour' AND display_order = 5;