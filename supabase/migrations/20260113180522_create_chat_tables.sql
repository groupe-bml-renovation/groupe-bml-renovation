/*
  # Create Chat Tables

  1. New Tables
    - `chat_conversations`
      - `id` (uuid, primary key)
      - `session_id` (text, unique identifier for browser session)
      - `user_name` (text, optional user name)
      - `user_email` (text, optional user email)
      - `status` (text, 'active' or 'closed')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key)
      - `message_type` (text, 'user' or 'bot')
      - `content` (text, message content)
      - `metadata` (jsonb, optional metadata)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Allow public insert and select for conversation creation and message retrieval
    - Restrict updates to message content
*/

CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  user_name text,
  user_email text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  message_type text NOT NULL CHECK (message_type IN ('user', 'bot')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public create chat conversations"
  ON chat_conversations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read chat conversations"
  ON chat_conversations FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update chat conversations"
  ON chat_conversations FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public insert chat messages"
  ON chat_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read chat messages"
  ON chat_messages FOR SELECT
  TO anon
  USING (true);

CREATE INDEX idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);
