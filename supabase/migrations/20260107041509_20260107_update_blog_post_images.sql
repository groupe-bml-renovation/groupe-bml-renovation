/*
  # Update Blog Post Featured Images

  1. Image Updates
    - Assign unique, distinct renovation and home design images to each blog post
    - Each image reflects the specific focus and tone of its article
    - All images sourced from Pexels (free to use)

  2. Blog Posts Updated
    - "renover-maison-guide-terrain": Modern kitchen renovation (practical focus)
    - "renovation-maison-guide-transformation-complete": Contemporary home interior (transformation)
    - "renovation-maison-guide-complet-reussir-travaux": Construction/renovation work (process focus)
    - "renovation-reussir-travaux-resultat-durable": Finished modern home (results focus)

  3. Visual Consistency
    - All images professional quality, similar dimensions
    - Diverse yet cohesive visual theme
    - Each distinct enough to improve page visual variety
*/

UPDATE public.blog_posts
SET featured_image_url = 'https://images.pexels.com/photos/3862623/pexels-photo-3862623.jpeg?auto=compress&cs=tinysrgb&w=1200'
WHERE slug = 'renover-maison-guide-terrain';

UPDATE public.blog_posts
SET featured_image_url = 'https://images.pexels.com/photos/5490209/pexels-photo-5490209.jpeg?auto=compress&cs=tinysrgb&w=1200'
WHERE slug = 'renovation-maison-guide-transformation-complete';

UPDATE public.blog_posts
SET featured_image_url = 'https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?auto=compress&cs=tinysrgb&w=1200'
WHERE slug = 'renovation-maison-guide-complet-reussir-travaux';

UPDATE public.blog_posts
SET featured_image_url = 'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1200'
WHERE slug = 'renovation-reussir-travaux-resultat-durable';
