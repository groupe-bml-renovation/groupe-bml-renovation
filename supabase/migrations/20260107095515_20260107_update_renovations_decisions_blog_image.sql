/*
  # Update Rénovations 9 Décisions Blog Post Featured Image

  1. Image Update
    - Update featured image for "Rénovations : 9 décisions clés pour un chantier réussi (du plan aux finitions)"
    - Replace with custom R2 image
    - Slug: renovations-9-decisions-cles-chantier-reussi
*/

UPDATE public.blog_posts
SET featured_image_url = 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Gemini_Generated_Image_489r4489r4489r44.png'
WHERE slug = 'renovations-9-decisions-cles-chantier-reussi';