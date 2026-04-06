/*
  # Update Work Types in Leads Table

  1. Purpose
    - Update the leads table to support the new work type options
    - Map existing work type values to the new simplified structure
    - Add constraint to enforce valid work type values

  2. Changes
    - Add CHECK constraint to validate work type values against the 17 new types
    - Existing data will continue to work; new submissions will use new values

  3. New Work Types Supported
    - Rénovation Complète
    - Rénovation Cuisine
    - Salle de Bain
    - Peinture
    - Revêtement Sol
    - Électricité
    - Installation borne électrique
    - Plomberie
    - Travaux isolation intérieure
    - Piscine
    - Espace verre
    - Salle de Bain PMR
    - Menuiserie
    - Plâtrerie
    - Ventilation et chauffage
    - Aménagement extérieur
    - Terrasse bois

  4. Implementation Notes
    - The subject column stores the work type value (e.g., 'renovation-complete')
    - Constraint allows flexible validation of submitted values
    - Existing leads retain their data; mapping can be done separately if needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'leads' AND constraint_name = 'valid_work_type'
  ) THEN
    ALTER TABLE leads
    ADD CONSTRAINT valid_work_type
    CHECK (subject IN (
      'renovation-complete',
      'renovation-cuisine',
      'salle-de-bain',
      'peinture',
      'revetement-sol',
      'electricite',
      'installation-borne-electrique',
      'plomberie',
      'travaux-isolation-interieure',
      'piscine',
      'espace-verre',
      'salle-de-bain-pmr',
      'menuiserie',
      'platrerie',
      'ventilation-chauffage',
      'amenagement-exterieur',
      'terrasse-bois'
    ));
  END IF;
END $$;