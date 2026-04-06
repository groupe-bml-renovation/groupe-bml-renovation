/*
  # Remove Blog Post: Rénovations - Comment Réussir Vos Travaux

  1. Deletion
    - Removes the blog post: "Rénovations : comment réussir vos travaux et obtenir un résultat durable"
    - Slug: "renovations-comment-reussir-vos-travaux-resultat-durable"

  2. Notes
    - This blog post has been removed at user request
    - Maintains data integrity by using specific slug identifier
*/

DELETE FROM blog_posts
WHERE slug = 'renovations-comment-reussir-vos-travaux-resultat-durable';
