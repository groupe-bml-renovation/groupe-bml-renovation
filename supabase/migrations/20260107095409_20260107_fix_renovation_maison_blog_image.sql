/*
  # Update Rénovation Maison Blog Post Featured Image (Correct Slug)

  1. Image Update
    - Update featured image for "Rénovation maison : votre guide pour transformer votre habitat avec Groupe BML Rénovation"
    - Replace with custom R2 image
    - Slug: renovation-maison-guide-transformer-habitat-groupe-bml
*/

UPDATE public.blog_posts
SET featured_image_url = 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Gemini_Generated_Image_2nfhno2nfhno2nfh.png'
WHERE slug = 'renovation-maison-guide-transformer-habitat-groupe-bml';