-- 1. Enable extensions
create extension if not exists "uuid-ossp";

-- 2. Create table: account
create table if not exists public.account (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    cookie jsonb,
    access_token text,
    refresh_token text,
    username text,
    password text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create table: channel
create table if not exists public.channel (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create table: propfile
create table if not exists public.propfile (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    account_ids uuid[] default '{}'::uuid[],
    channel_ids uuid[] default '{}'::uuid[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create table: cronjob
create table if not exists public.cronjob (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    time text not null
);

-- 6. Create table: type
create table if not exists public.type (
    id uuid primary key default gen_random_uuid(),
    name text not null
);

-- 7. Create table: event
create table if not exists public.event (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    message text,
    channel_id uuid references public.channel(id) on delete cascade,
    day_of_week text,
    cronjob_id uuid references public.cronjob(id) on delete set null,
    is_enable boolean default true not null,
    type_id uuid references public.type(id) on delete set null,
    profile_id uuid references public.propfile(id) on delete cascade
);

-- 8. Enable Row Level Security (RLS) on all tables
alter table public.account enable row level security;
alter table public.channel enable row level security;
alter table public.propfile enable row level security;
alter table public.cronjob enable row level security;
alter table public.type enable row level security;
alter table public.event enable row level security;

-- 9. Create basic access policies for authenticated users
create policy "Allow authenticated users full access to account" on public.account
    to authenticated using (true) with check (true);

create policy "Allow authenticated users full access to channel" on public.channel
    to authenticated using (true) with check (true);

create policy "Allow authenticated users full access to propfile" on public.propfile
    to authenticated using (true) with check (true);

create policy "Allow authenticated users full access to cronjob" on public.cronjob
    to authenticated using (true) with check (true);

create policy "Allow authenticated users full access to type" on public.type
    to authenticated using (true) with check (true);

create policy "Allow authenticated users full access to event" on public.event
    to authenticated using (true) with check (true);
