--
name: create_memories
--

create extension if not exists "uuid-ossp";

create table if not exists public.memories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  name text not null,
  type text not null check (type in ('image', 'video', 'audio', 'file')),
  caption text default '',
  content_url text,
  storage_mode text not null default 'private' check (storage_mode in ('local', 'private', 'shared')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists memories_user_id_idx on public.memories (user_id);

alter table public.memories enable row level security;

create policy "Allow users to read their own memories"
  on public.memories for select
  using (auth.uid() = user_id or user_id is null);

create policy "Allow users to insert their own memories"
  on public.memories for insert
  with check (auth.uid() = user_id);

create policy "Allow users to update their own memories"
  on public.memories for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Allow users to delete their own memories"
  on public.memories for delete
  using (auth.uid() = user_id);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger memories_updated_at
before update on public.memories
for each row
execute function public.handle_updated_at();
