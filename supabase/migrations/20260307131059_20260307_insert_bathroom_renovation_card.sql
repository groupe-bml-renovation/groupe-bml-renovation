/*
  # Add Bathroom Renovation Project Card
  
  1. New Project
    - Rénovation salle de bain
    - Price: 7,900€
    - Duration: 7 days
    - A modern bathroom renovation project card
  
  2. Details
    - Displays in the "Nos projets réalisés" carousel section
    - Uses Pexels stock image for visual appeal
    - Categorized under "Salle de Bain"
    - Published and visible to all users
*/

INSERT INTO featured_projects (
  company_name,
  project_title,
  description,
  image_url,
  cost,
  duration_value,
  duration_unit,
  location,
  is_published,
  display_order,
  slug,
  detailed_description,
  services_provided,
  client_name
) VALUES (
  'Groupe BML Rénovation',
  'Rénovation salle de bain',
  'Transformation complète d''une salle de bain avec modernisation, aménagement optimisé et finitions premium',
  'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2005%20-%20Hero%20-%20After.jpeg.png',
  7900,
  7,
  'jours',
  'France',
  true,
  15,
  'renovation-salle-de-bain-simple',
  'Rénovation complète d''une salle de bain incluant remplacement des sanitaires, carrelage moderne, peinture et finitions de qualité professionnelle. Transformation d''un espace fonctionnel en salle de bain moderne et élégante.',
  ARRAY['Plomberie', 'Carrelage', 'Peinture', 'Électricité', 'Sanitaires'],
  'Client BML Rénovation'
)
ON CONFLICT (slug) DO NOTHING;
