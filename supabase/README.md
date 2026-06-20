# ContentFlow Supabase

## Migration

The first migration is located at:

`supabase/migrations/20260620_001_contentflow_core.sql`

Run it once in:

Supabase Dashboard → SQL Editor → New query → Run

## What it creates

- User profiles and roles
- Brands
- Content requests
- Content items
- Comments
- Status history
- Indexes
- Updated-at triggers
- Automatic profile creation
- Row Level Security policies

The first existing user is promoted to `system_developer` only when no administrator or system developer exists.
