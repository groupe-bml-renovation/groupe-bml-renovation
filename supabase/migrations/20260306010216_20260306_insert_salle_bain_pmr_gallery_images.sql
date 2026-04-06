/*
  # Insert Salle de Bain PMR Project Gallery Images

  1. New Data
    - Insert 5 gallery images showing different stages of the PMR bathroom renovation
    - Images are sourced from existing CDN URLs used in the project
    - Each image has a descriptive caption in French
    - Images are marked as process images to show renovation stages
    - Ordered by display order for proper sequence

  2. Project Details
    - Project slug: "salle-bain-pmr"
    - Total images: 5 showing the renovation progression
    - All images are accessible renovation stage photos
    - Proper captions for each stage of work
*/

INSERT INTO project_gallery_images (
  project_slug,
  image_url,
  caption,
  display_order,
  is_process_image,
  created_at
) VALUES
(
  'salle-bain-pmr',
  'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2004.png',
  'État initial - Salle de bain avant rénovation',
  1,
  true,
  now()
),
(
  'salle-bain-pmr',
  'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2007.png',
  'Phase de réalisation - Douche accessible et équipements',
  2,
  true,
  now()
),
(
  'salle-bain-pmr',
  'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2005.png',
  'Résultat final - Salle de bain PMR rénovée et accessible',
  3,
  true,
  now()
),
(
  'salle-bain-pmr',
  'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2001.png',
  'Vue générale du projet terminé',
  4,
  true,
  now()
),
(
  'salle-bain-pmr',
  'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2002.png',
  'Détails des finitions et barres d appui',
  5,
  true,
  now()
)
ON CONFLICT DO NOTHING;
