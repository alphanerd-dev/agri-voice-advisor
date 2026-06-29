# VoiceHarvest: AI & Live Data Integration Plan

This plan upgrades VoiceHarvest from local-first simulation to a live, AI-powered system using Supabase Edge Functions and real-world agricultural data sources.

## Scope Summary
- **Real AI Advisory**: Replace rule-based logic in `SymptomChecker` and `TreatmentAdvisory` with live calls to OpenAI (GPT-4o/GPT-4o-mini) via Supabase Edge Functions.
- **Vision Capabilities**: Enable image uploads in the Symptom Checker so AI can analyze crop photos.
- **Online Market Data**: Transition the `MarketMonitor` from hardcoded values to fetching real-time agricultural prices (simulated via an Edge Function that could hook into APIs like Agtrade or FarmData).
- **Global Data Persistence**: Migrate `localStorage` history to a Supabase PostgreSQL table to support multi-device access and better data management.

## Auth & RLS model
**Auth in scope:** no (as per previous plan, but will prepare schema for future auth)
**Model:** no_auth_controlled_write
**RLS strategy:**
- `symptom_history` table: Allow `anon` INSERT and SELECT (scoped by a `client_id` stored in localStorage to simulate user sessions without full auth).
- No direct client-side deletions or bulk updates by anon users.
**Frontend implication:** Client-side `client_id` (UUID) will be generated and stored in localStorage to link history items to the device.

## Migration baseline
**Local migrations in project:** existing
**User confirmed proceed on connected DB:** yes

## Affected Areas
- **Supabase Backend**: New migration for `history` table; new Edge Functions (`process-symptoms`, `get-market-prices`).
- **Frontend Pages**:
  - `SymptomChecker.tsx`: Integration with camera/file upload and live API call.
  - `TreatmentAdvisory.tsx`: Integration with live AI advisory API.
  - `MarketMonitor.tsx`: Fetch prices from the new Edge Function.
- **Hooks/Services**:
  - Update `useLocalStorage` usage to sync/fallback to Supabase.
  - Create a `src/services/api.ts` for Edge Function communication.

## Implementation Phases

### Phase 1: Database & Backend Infrastructure
- Create a migration file for the `history` table.
- Implement two Supabase Edge Functions:
  1. `ai-advisory`: Handles text-based symptoms and treatment queries using OpenAI.
  2. `market-data`: Serves fresh market prices.
- **Owner**: `supabase_engineer`

### Phase 2: AI & Vision Integration (Frontend)
- Update `SymptomChecker.tsx`:
  - Add image upload/capture UI.
  - Call the `ai-advisory` Edge Function (sending text + base64 image if available).
  - Handle streaming or loading states for the AI response.
- **Owner**: `frontend_engineer`

### Phase 3: Treatment & Market Live-Sync
- Update `TreatmentAdvisory.tsx` to use the live AI endpoint for nuanced advice.
- Update `MarketMonitor.tsx` to fetch data from the `market-data` Edge Function.
- **Owner**: `frontend_engineer`

### Phase 4: History Persistence Migration
- Update modules to save history to Supabase instead of (or in addition to) `localStorage`.
- Implement a `client_id` generation logic to keep user data separate without a login.
- **Owner**: `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. supabase_engineer — Setup schema and Edge Functions for OpenAI & Market data.
2. frontend_engineer — Integrate AI/Vision UI and live data fetching.

**Per-agent instructions:**

### 1. supabase_engineer
- **Phases:** 1
- **Scope:** 
  - Migration for `query_history` table (id, client_id, type [symptom|advisory], input_text, image_url, response_json, created_at).
  - Edge Function `ai-handler`: Uses `Deno.env.get('OPENAI_API_KEY')`. For `symptoms`, prompt for disease name, cause, and action. For `advisory`, provide farming best practices.
  - Edge Function `market-prices`: Return a JSON of crops/hubs (mimic a real API like Agtrade).
- **Files:**
  - `supabase/migrations/[timestamp]_add_history_table.sql`
  - `supabase/functions/ai-handler/index.ts`
  - `supabase/functions/market-prices/index.ts`
- **Depends on:** none
- **Acceptance criteria:** Edge Functions return valid JSON responses; Table exists with proper RLS for anon access.

### 2. frontend_engineer
- **Phases:** 2, 3, 4
- **Scope:** 
  - In `SymptomChecker.tsx`, add an `<input type="file" />` or camera button. 
  - Send requests to Supabase Edge Functions using `supabase.functions.invoke`.
  - Replace the `simulateAnalysis` and hardcoded `MarketMonitor` data with live fetches.
  - Generate a `vh_client_id` in `localStorage` if it doesn't exist to use as `client_id` in DB.
- **Files:**
  - `src/pages/SymptomChecker.tsx`
  - `src/pages/TreatmentAdvisory.tsx`
  - `src/pages/MarketMonitor.tsx`
  - `src/integrations/supabase/client.ts`
- **Depends on:** supabase_engineer
- **Acceptance criteria:** AI results appear from the live API. Image uploads work. Market prices update from the server. History is fetched from Supabase.

**Do not dispatch:** quick_fix_engineer (not needed for this feature integration)
