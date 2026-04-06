/*
  # Insert 10 New Blog Posts with Featured Images
  
  1. New Blog Posts
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
    
  2. Details
    - Each blog post includes featured_image_url from the provided CSV
    - All posts are set to 'published' status
    - Created timestamps are set to now()
*/

INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  featured_image_url,
  status,
  published_at,
  created_at,
  updated_at
) VALUES
  (
    'Guide Complet de la Rénovation de Salle de Bain',
    'guide-complet-renovation-salle-bain',
    'Tout ce que vous devez savoir pour rénover votre salle de bain',
    'Guide complet pour la rénovation de salle de bain...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Guide%20Complet%20de%20la%20Re%CC%81novation%20de%20Salle%20de%20Bain.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Tendances Modernes en Rénovation de Cuisine',
    'tendances-modernes-renovation-cuisine',
    'Découvrez les tendances actuelles pour votre cuisine',
    'Tendances modernes en rénovation de cuisine...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Tendances%20Modernes%20en%20Re%CC%81novation%20de%20Cuisine.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Améliorer la Qualité de l''Air Intérieur par la Ventilation',
    'ameliorer-qualite-air-interieur-ventilation',
    'Solutions de ventilation pour un air intérieur sain',
    'Améliorer la qualité de l''air intérieur par la ventilation...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Ame%CC%81liorer%20la%20Qualite%CC%81%20de%20l''Air%20Inte%CC%81rieur%20par%20la%20Ventilation.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Les Meilleurs Matériaux pour les Sols de Maison Moderne',
    'meilleurs-materiaux-sols-maison-moderne',
    'Sélection des meilleurs matériaux pour vos sols',
    'Les meilleurs matériaux pour les sols de maison moderne...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Les%20Meilleurs%20Mate%CC%81riaux%20pour%20les%20Sols%20de%20Maison%20Moderne.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Peinture Intérieure : Couleurs Tendance et Techniques',
    'peinture-interieure-couleurs-tendance-techniques',
    'Guide des couleurs tendance et techniques de peinture',
    'Peinture intérieure : couleurs tendance et techniques...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Peinture%20Inte%CC%81rieure%20%20Couleurs%20Tendance%20et%20Techniques.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Électricité Domestique : Normes de Sécurité et Mises à Jour',
    'electricite-domestique-normes-securite-mises-a-jour',
    'Comprendre les normes électriques et les mises à jour requises',
    'Électricité domestique : normes de sécurité et mises à jour...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/E%CC%81lectricite%CC%81%20Domestique%20-%20Normes%20de%20Se%CC%81curite%CC%81%20et%20Mises%20a%CC%80%20Jour.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Rénovation PMR : Adapter Votre Maison à Vos Besoins',
    'renovation-pmr-adapter-maison-besoins',
    'Solutions pour adapter votre maison aux personnes à mobilité réduite',
    'Rénovation PMR : adapter votre maison à vos besoins...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Re%CC%81novation%20PMR%20-%20Adapter%20Votre%20Maison%20a%CC%80%20Vos%20Besoins.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Menuiserie Moderne : Portes et Fenêtres de Qualité',
    'menuiserie-moderne-portes-fenetres-qualite',
    'Guide complet sur les portes et fenêtres modernes',
    'Menuiserie moderne : portes et fenêtres de qualité...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Menuiserie%20Moderne%20-%20Portes%20et%20Fene%CC%82tres%20de%20Qualite%CC%81.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Financement et Aides à la Rénovation : Guide Complet',
    'financement-aides-renovation-guide-complet',
    'Découvrez toutes les options de financement et d''aides disponibles',
    'Financement et aides à la rénovation : guide complet...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Financement%20et%20Aides%20a%CC%80%20la%20Re%CC%81novation%20-%20Guide%20Complet.png',
    'published',
    now(),
    now(),
    now()
  ),
  (
    'Rénovation de Maison Ancienne : Défis et Solutions',
    'renovation-maison-ancienne-defis-solutions',
    'Solutions pour relever les défis de la rénovation ancienne',
    'Rénovation de maison ancienne : défis et solutions...',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Re%CC%81novation%20de%20Maison%20Ancienne%20-%20De%CC%81fis%20et%20Solutions.png',
    'published',
    now(),
    now(),
    now()
  )
ON CONFLICT (slug) DO UPDATE SET
  featured_image_url = EXCLUDED.featured_image_url,
  updated_at = now();
