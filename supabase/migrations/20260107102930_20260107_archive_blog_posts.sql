/*
  # Archive three blog posts

  1. Changes
    - Archive three blog posts that are being removed from publication
    - Posts will no longer appear in the blog listing but data is preserved
  
  2. Posts Being Archived
    - "Rénovation : comment réussir vos travaux et obtenir un résultat durable"
    - "Rénover une maison : étapes, budget et conseils pour un projet réussi"
    - "Renovation maison : le guide complet pour réussir vos travaux (et éviter les pièges)"
*/

UPDATE blog_posts
SET status = 'archived'
WHERE id IN (
  '11656b58-e342-49d8-90d7-51862a8de4f5',
  '5ee9c629-5326-4abb-956c-24c525e65475',
  '29e4a58d-bcd8-406f-91b6-5c632621f211'
);
