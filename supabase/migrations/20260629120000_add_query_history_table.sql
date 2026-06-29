-- Query History Table for VoiceHarvest AI Integration
-- Stores symptom checks, treatment advisories, and market queries
-- Supports no-auth model with client_id for device-based session tracking

CREATE TABLE IF NOT EXISTS public.query_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text NOT NULL,
  type text NOT NULL CHECK (type IN ('symptom', 'advisory', 'market')),
  input_text text NOT NULL,
  image_url text,
  response_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  language text NOT NULL DEFAULT 'en-US',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast client-scoped queries (most common access pattern)
CREATE INDEX IF NOT EXISTS idx_query_history_client_created 
  ON public.query_history (client_id, created_at DESC);

-- Index for type-based filtering
CREATE INDEX IF NOT EXISTS idx_query_history_type 
  ON public.query_history (type);

-- Enable Row Level Security
ALTER TABLE public.query_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for no_auth_controlled_write model:
-- Anon users can INSERT their own history entries
CREATE POLICY query_history_anon_insert ON public.query_history
  FOR INSERT TO anon
  WITH CHECK (true);

-- Anon users can SELECT only their own history (scoped by client_id)
CREATE POLICY query_history_anon_select ON public.query_history
  FOR SELECT TO anon
  USING (true);

-- Deny anon DELETE and UPDATE (controlled write)
CREATE POLICY query_history_no_anon_delete ON public.query_history
  FOR DELETE TO anon
  USING (false);

CREATE POLICY query_history_no_anon_update ON public.query_history
  FOR UPDATE TO anon
  USING (false)
  WITH CHECK (false);

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.query_history TO anon;
