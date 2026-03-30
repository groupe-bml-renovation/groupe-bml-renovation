/*
  # Insert PMR Bathroom Project Gallery Images

  1. Data
    - Insert gallery images for the "Salle de bain PMR" project
    - Images show renovation process and final results
    - Display order controls the sequence in gallery
    - is_process_image marks images showing the work process

  2. Images
    - Process images showing different stages of renovation
    - Result images showing final bathroom after renovation
    - All images from the existing project image set
*/

INSERT INTO project_gallery_images (project_slug, image_url, caption, display_order, is_process_image)
VALUES
  ('projet-salle-bain-pmr', 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2001.png', 'Avant rénovation - État initial de la salle de bain', 1, true),
  ('projet-salle-bain-pmr', 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2004.png', 'Préparation et démolition - Enlèvement des anciens équipements', 2, true),
  ('projet-salle-bain-pmr', 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2005.png', 'Installation de la douche accessible - Nouvelle douche PMR avec barre de maintien', 3, true),
  ('projet-salle-bain-pmr', 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2007.png', 'Salle de bain PMR terminée - Aménagement complet conforme aux normes d''accessibilité', 4, false);
