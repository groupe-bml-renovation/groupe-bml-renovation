/*
  # Update Blog Post Images with CDN URLs

  1. Update blog_posts table
    - Replace featured_image_url for all 10 blog posts with custom CDN URLs from R2 bucket
    - Preserves all existing blog post data (title, content, metadata, etc.)
  
  2. Image Updates
    - Guide Complet de la Rénovation de Salle de Bain
    - Tendances Modernes en Rénovation de Cuisine
    - Améliorer la Qualité de l'Air Intérieur par la Ventilation
    - Les Meilleurs Matériaux pour les Sols de Maison Moderne
    - Peinture Intérieure : Couleurs Tendance et Techniques
    - Électricité Domestique : Normes de Sécurité et Mises à Jour
    - Rénovation PMR : Adapter Votre Maison à Vos Besoins
    - Menuiserie Moderne : Portes et Fenêtres de Qualité
    - Financement et Aides à la Rénovation : Guide Complet
    - Rénovation de Maison Ancienne : Défis et Solutions

  3. Security
    - No changes to RLS policies - existing blog_posts table RLS remains in effect
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'blog_posts'
  ) THEN
    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Guide%20Complet%20de%20la%20Re%CC%81novation%20de%20Salle%20de%20Bain.png'
    WHERE title = 'Guide Complet de la Rénovation de Salle de Bain';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Tendances%20Modernes%20en%20Re%CC%81novation%20de%20Cuisine.png'
    WHERE title = 'Tendances Modernes en Rénovation de Cuisine';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Ame%CC%81liorer%20la%20Qualite%CC%81%20de%20l''Air%20Inte%CC%81rieur%20par%20la%20Ventilation.png'
    WHERE title = 'Améliorer la Qualité de l''Air Intérieur par la Ventilation';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Les%20Meilleurs%20Mate%CC%81riaux%20pour%20les%20Sols%20de%20Maison%20Moderne.png'
    WHERE title = 'Les Meilleurs Matériaux pour les Sols de Maison Moderne';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Peinture%20Inte%CC%81rieure%20%20Couleurs%20Tendance%20et%20Techniques.png'
    WHERE title = 'Peinture Intérieure : Couleurs Tendance et Techniques';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/E%CC%81lectricite%CC%81%20Domestique%20-%20Normes%20de%20Se%CC%81curite%CC%81%20et%20Mises%20a%CC%80%20Jour.png'
    WHERE title = 'Électricité Domestique : Normes de Sécurité et Mises à Jour';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Re%CC%81novation%20PMR%20-%20Adapter%20Votre%20Maison%20a%CC%80%20Vos%20Besoins.png'
    WHERE title = 'Rénovation PMR : Adapter Votre Maison à Vos Besoins';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Menuiserie%20Moderne%20-%20Portes%20et%20Fene%CC%82tres%20de%20Qualite%CC%81.png'
    WHERE title = 'Menuiserie Moderne : Portes et Fenêtres de Qualité';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Financement%20et%20Aides%20a%CC%80%20la%20Re%CC%81novation%20-%20Guide%20Complet.png'
    WHERE title = 'Financement et Aides à la Rénovation : Guide Complet';

    UPDATE blog_posts SET featured_image_url = 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Re%CC%81novation%20de%20Maison%20Ancienne%20-%20De%CC%81fis%20et%20Solutions.png'
    WHERE title = 'Rénovation de Maison Ancienne : Défis et Solutions';
  END IF;
END $$;
