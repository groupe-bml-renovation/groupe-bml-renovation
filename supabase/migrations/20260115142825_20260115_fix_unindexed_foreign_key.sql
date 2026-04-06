/*
  # Fix Unindexed Foreign Key
  
  1. Changes
    - Add covering index for `service_areas.parent_area_id` foreign key
    - This improves query performance when filtering by parent area
*/

CREATE INDEX IF NOT EXISTS idx_service_areas_parent_id 
ON public.service_areas(parent_area_id);