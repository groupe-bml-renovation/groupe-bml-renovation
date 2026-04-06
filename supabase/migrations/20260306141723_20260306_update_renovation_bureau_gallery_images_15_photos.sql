/*
  # Update Renovation Bureau Gallery with 15 Real Project Photos

  1. Changes
    - Delete existing 5 placeholder images for "renovation-bureau" project
    - Insert 15 new images from Cloudflare R2 showing complete renovation progression
    - First image is before state, remaining 14 show the completed renovation
    - Images ordered to show the transformation journey

  2. Images Added
    - Before state: G BML - 03 - Before.png (the initial condition)
    - After renovation: G BML - 03 - 01 through G BML - 03 - 14 (14 photos of completed work)

  3. Data Structure
    - project_slug: "renovation-bureau"
    - All images hosted on Cloudflare R2
    - display_order: Sequential 1-15 for proper gallery ordering
    - is_process_image: true for all images to mark as project documentation
*/

DELETE FROM project_gallery_images WHERE project_slug = 'renovation-bureau';

INSERT INTO project_gallery_images (project_slug, image_url, caption, display_order, is_process_image) VALUES
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%20Before.png', 'État initial - Bureau avant rénovation', 1, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2001.jpeg', 'Espace rénové - Vue 1', 2, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2002.jpeg', 'Espace rénové - Vue 2', 3, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2003.jpeg', 'Espace rénové - Vue 3', 4, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2004.jpeg', 'Espace rénové - Vue 4', 5, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2005.jpeg', 'Espace rénové - Vue 5', 6, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2006.jpeg', 'Espace rénové - Vue 6', 7, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2007.jpeg', 'Espace rénové - Vue 7', 8, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2008.jpeg', 'Espace rénové - Vue 8', 9, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2009.jpeg', 'Espace rénové - Vue 9', 10, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2010.jpeg', 'Espace rénové - Vue 10', 11, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2011.jpeg', 'Espace rénové - Vue 11', 12, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2012.jpeg', 'Espace rénové - Vue 12', 13, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2013.jpeg', 'Espace rénové - Vue 13', 14, true),
  ('renovation-bureau', 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%2014.jpeg', 'Espace rénové - Vue 14', 15, true);
