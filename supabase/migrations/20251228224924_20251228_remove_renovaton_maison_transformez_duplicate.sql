/*
  # Remove Duplicate Rénovation Maison Blog Post

  1. Deletion
    - Removes the duplicate blog post: "Rénovation maison : transformez votre habitat avec des experts du bâtiment"
    - Slug: "renovation-maison-transformez-habitat-experts"

  2. Notes
    - This was a duplicate of similar renovation guide content
    - Keeps the other comprehensive renovation guides intact
*/

DELETE FROM blog_posts
WHERE slug = 'renovation-maison-transformez-habitat-experts';
