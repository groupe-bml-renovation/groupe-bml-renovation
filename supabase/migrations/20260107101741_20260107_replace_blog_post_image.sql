/*
  # Replace Blog Post Featured Image

  1. Image Update
    - Replace old Pexels image with new R2 image
    - Updates all blog posts using the old Pexels URL
    - New image: Gemini Generated Image from R2

  2. Changes
    - featured_image_url: Updated from Pexels to R2 custom image for all matching blog posts
*/

UPDATE public.blog_posts
SET featured_image_url = 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Gemini_Generated_Image_3134sd3134sd3134.png'
WHERE featured_image_url = 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200';