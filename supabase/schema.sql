-- Pilot / waitlist signups. Run this once in the Supabase SQL editor.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  company text check (char_length(company) <= 200),
  interest text not null check (interest in ('Own channel', 'Brand', 'Media company', 'Other'))
);

create unique index if not exists waitlist_email_key on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- The public anon key may insert rows, but never read, update or delete them.
create policy "anon can insert waitlist" on public.waitlist
  for insert to anon
  with check (true);
