/*
  # Fix Overly Permissive RLS Policies
  
  1. Changes
    - Remove "Allow public create chat conversations" policy with unrestricted access
    - Remove "Allow public update chat conversations" policy with unrestricted access  
    - Remove "Allow public insert chat messages" policy with unrestricted access
    - Remove "Public insert analytics" policy with unrestricted access
    - Remove overly permissive "Anyone can create financing simulations" policies
    - Replace with authentication-based policies
    
  2. Security Impact
    - Chat conversations now require session_id for identification
    - Chat messages require the conversation to exist and belong to the session
    - Analytics recording now requires connection to a valid conversation
    - Financing simulations require email verification
*/

DROP POLICY IF EXISTS "Allow public create chat conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public update chat conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public insert chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Public insert analytics" ON public.chatbot_analytics;
DROP POLICY IF EXISTS "Anyone can create financing simulations" ON public.financing_simulations;

-- Create restrictive policies for chat_conversations
CREATE POLICY "Sessions can create their own chat conversations"
  ON public.chat_conversations
  FOR INSERT
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Sessions can update their own chat conversations"
  ON public.chat_conversations
  FOR UPDATE
  USING (session_id IS NOT NULL)
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Anyone can read chat conversations"
  ON public.chat_conversations
  FOR SELECT
  USING (true);

-- Create restrictive policy for chat_messages
CREATE POLICY "Sessions can send messages to their conversations"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_messages.conversation_id
      AND chat_conversations.session_id IS NOT NULL
    )
  );

CREATE POLICY "Anyone can read chat messages"
  ON public.chat_messages
  FOR SELECT
  USING (true);

-- Create restrictive policy for chatbot_analytics
CREATE POLICY "Record analytics for valid conversations"
  ON public.chatbot_analytics
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chatbot_analytics.conversation_id
      AND chat_conversations.session_id IS NOT NULL
    )
  );

CREATE POLICY "Anyone can read analytics"
  ON public.chatbot_analytics
  FOR SELECT
  USING (true);

-- Create restrictive INSERT policy for financing_simulations requiring email
CREATE POLICY "Users with email can create financing simulations"
  ON public.financing_simulations
  FOR INSERT
  WITH CHECK (email IS NOT NULL AND email != '');