/*
  # Create Bathroom Renovation Project Highlight Section
  
  1. Project Highlight Section
    - `project_slug`: renovation-salle-de-bain
    - `section_title`: Descriptive title for the highlight section
    - `section_description`: Detailed description of the project
    - `section_image_url`: Featured image for the highlight section
    - `cta_button_text`: Call-to-action button text
  
  2. Purpose
    - Displays prominent section highlighting key project aspects
    - Shows before/during/after transformation
    - Encourages user engagement with CTA button
*/

INSERT INTO project_highlight_sections (project_slug, section_title, section_description, section_image_url, cta_button_text)
VALUES
  ('renovation-salle-de-bain', 'Transformation Moderne d''une Salle de Bain', 'Découvrez comment nous avons transformé une salle de bain ordinaire en un espace moderne, fonctionnel et élégant. Ce projet a été complété en 7 jours avec un budget optimisé de 7 900€. Nos équipes ont géré l''intégralité de la rénovation : plomberie, carrelage, peinture, électricité et installation des sanitaires. Le résultat est une salle de bain haut de gamme avec finitions premium.', 'https://images.pexels.com/photos/2343694/pexels-photo-2343694.jpeg?w=1200&auto=format&fit=crop', 'Voir la galerie complète')
ON CONFLICT (project_slug) DO NOTHING;
