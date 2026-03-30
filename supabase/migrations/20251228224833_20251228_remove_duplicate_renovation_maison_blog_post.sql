/*
  # Remove Duplicate Rénovation Maison Blog Post

  1. Deletion
    - Removes the duplicate blog post: "Rénovation maison : votre guide pour transformer votre habitat avec Groupe BML Rénovation"
    - This post was a duplicate of similar renovation guide content
    - Slug: "renovation-maison-guide-transformation-complete"

  2. Notes
    - Keeps the other two comprehensive renovation guides
    - Maintains data integrity by using specific slug identifier
*/

DELETE FROM blog_posts
WHERE slug = 'renovation-maison-guide-transformation-complete';
