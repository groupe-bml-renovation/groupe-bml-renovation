/*
  # Add prefilled question and additional fields to consultation_requests table

  1. Modified Tables
    - `consultation_requests`
      - Add `prefilled_question` (text) - Answer to the prefilled situation question
      - Add `want_financial_advisor` (text) - Whether customer wants financing help (oui/non)

  2. Notes
    - `prefilled_question` stores the customer's situation description from the form
    - `want_financial_advisor` stores the financing preference (oui/non/null)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_requests' AND column_name = 'prefilled_question'
  ) THEN
    ALTER TABLE consultation_requests ADD COLUMN prefilled_question text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_requests' AND column_name = 'want_financial_advisor'
  ) THEN
    ALTER TABLE consultation_requests ADD COLUMN want_financial_advisor text;
  END IF;
END $$;
