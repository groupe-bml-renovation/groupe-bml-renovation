/*
  # Insert gallery images for Renovation Sejour project

  1. New Data
    - Insert 4 gallery images for the "renovation-sejour" project
    - Images show the renovation process stages
    - Display order and captions configured for the project gallery
  
  2. Details
    - Project slug: renovation-sejour
    - Total images: 4
    - All marked as process images
    - Each image has French captions describing the renovation stage
*/

INSERT INTO public.project_gallery_images (
  project_slug,
  image_url,
  caption,
  display_order,
  is_process_image
) VALUES
  (
    'renovation-sejour',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%20Hero%20-%20After.png',
    'État initial - Séjour avant rénovation',
    1,
    true
  ),
  (
    'renovation-sejour',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%20Sejour%2042000%E2%82%AC%203mois%20-%2002.png',
    'Phase de réalisation - Restructuration et démolition sélective',
    2,
    true
  ),
  (
    'renovation-sejour',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%20Sejour%2042000%E2%82%AC%203mois%20-%2003.png',
    'Installation du gros œuvre et éclairage LED',
    3,
    true
  ),
  (
    'renovation-sejour',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%20Sejour%2042000%E2%82%AC%203mois%20-%2004.png',
    'Finitions - Peinture, revêtements et aménagements',
    4,
    true
  ),
  (
    'renovation-sejour',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2002%20-%20Before.png',
    'Résultat final - Séjour rénové haut de gamme avec ambiance chaleureuse',
    5,
    true
  );
