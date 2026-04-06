/*
  # Insert Façade de maison project card

  1. New Project
    - Adds a new featured project card for "Façade de maison"
    - Budget: 3500€
    - Duration: 1 week
    - Category: Façade Renovation
  2. Details
    - Project title: "Façade de maison"
    - Description: Complete facade renovation with high-quality finishes
    - Display order: Set to show in carousel rotation
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
  detailed_description,
  services_provided,
  slug
) VALUES (
  'Groupe BML Rénovation',
  'Façade de maison',
  'Rénovation complète de façade avec ravalement, nettoyage haute pression, jointoiement, peinture premium et finitions de qualité pour une maison comme neuve.',
  'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2004%20-%20Hero%20-%20Before.png',
  3500,
  1,
  'semaine',
  'France',
  true,
  13,
  'Rénovation complète de façade incluant ravalement de surface, nettoyage haute pression, réparation et jointoiement des fissures, peinture de façade premium avec finitions de qualité professionnelle pour restaurer l''aspect esthétique de la maison et améliorer sa durabilité.',
  ARRAY['Ravalement de façade', 'Nettoyage haute pression', 'Jointoiement', 'Peinture premium', 'Réparation des microfissures'],
  'facade-de-maison'
) ON CONFLICT (slug) DO NOTHING;