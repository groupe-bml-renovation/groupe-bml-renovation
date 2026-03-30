/*
  # Update Blog Post Image

  1. Updates
    - Update featured_image_url for "Rénovation : comment réussir vos travaux et obtenir un résultat durable" blog post
    - Changed from Pexels image to new custom image
*/

UPDATE blog_posts
SET featured_image_url = 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Gemini_Generated_Image_fj821efj821efj82.png'
WHERE slug = 'renovation-reussir-travaux-resultat-durable';