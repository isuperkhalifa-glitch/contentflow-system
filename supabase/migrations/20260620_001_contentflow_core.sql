-- ContentFlow V0.5
-- Core database, roles, RLS, indexes, triggers, and initial profile backfill.

create extension if not exists pgcrypto;

do $$
begin
  create type public.app_role as enum (
    'system_developer',
    'administrator',
    'content_manager',
    'creative_director',
    'content_writer',
    'designer',
    'video_editor',
    'performance_marketer',
    'client_reviewer'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.user_status as enum (
    'active',
    'invited',
    'suspended'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.content_status as enum (
    'request',
    'briefing',
    'idea',
    'writing',
    'design',
    'editing',
    'internal_review',
    'client_review',
    'revision',
    'approved',
    'scheduled',
    'published',
    'archived'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.content_priority as enum (
    'low',
    'normal',
    'high',
    'urgent'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.content_format as enum (
    'post',
    'carousel',
    'story',
    'reel',
    'video',
    'article',
    'email',
    'landing_page',
    'ad',
    'other'
  );
exception
  when duplicate_object then null;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  avatar_url text,
  role public.app_role not null default 'content_writer',
  status public.user_status not null default 'active',
  phone text,
  job_title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  website_url text,
  primary_color text,
  secondary_color text,
  tone_of_voice text,
  guidelines jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_requests (
  id uuid primary key default gen_random_uuid(),
  request_code text not null unique,
  title text not null,
  description text,
  brand_id uuid references public.brands(id) on delete set null,
  requester_id uuid not null references public.profiles(id) on delete restrict,
  assigned_manager_id uuid references public.profiles(id) on delete set null,
  priority public.content_priority not null default 'normal',
  desired_publish_at timestamptz,
  status public.content_status not null default 'request',
  brief jsonb not null default '{}'::jsonb,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_code text not null unique,
  title text not null,
  description text,
  brand_id uuid references public.brands(id) on delete set null,
  request_id uuid references public.content_requests(id) on delete set null,
  format public.content_format not null default 'post',
  status public.content_status not null default 'briefing',
  priority public.content_priority not null default 'normal',
  objective text,
  platform text,
  campaign text,
  hook text,
  body_copy text,
  call_to_action text,
  brief jsonb not null default '{}'::jsonb,
  references jsonb not null default '[]'::jsonb,
  final_assets jsonb not null default '[]'::jsonb,
  created_by uuid not null references public.profiles(id) on delete restrict,
  content_writer_id uuid references public.profiles(id) on delete set null,
  designer_id uuid references public.profiles(id) on delete set null,
  reviewer_id uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  scheduled_at timestamptz,
  published_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_comments (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) > 0),
  is_internal boolean not null default true,
  parent_id uuid references public.content_comments(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_status_history (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id) on delete cascade,
  from_status public.content_status,
  to_status public.content_status not null,
  changed_by uuid not null references public.profiles(id) on delete restrict,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx
  on public.profiles(role);

create index if not exists profiles_status_idx
  on public.profiles(status);

create index if not exists brands_active_idx
  on public.brands(is_active);

create index if not exists content_requests_brand_idx
  on public.content_requests(brand_id);

create index if not exists content_requests_requester_idx
  on public.content_requests(requester_id);

create index if not exists content_requests_status_idx
  on public.content_requests(status);

create index if not exists content_items_brand_idx
  on public.content_items(brand_id);

create index if not exists content_items_status_idx
  on public.content_items(status);

create index if not exists content_items_due_at_idx
  on public.content_items(due_at);

create index if not exists content_items_created_by_idx
  on public.content_items(created_by);

create index if not exists content_items_writer_idx
  on public.content_items(content_writer_id);

create index if not exists content_items_designer_idx
  on public.content_items(designer_id);

create index if not exists content_items_reviewer_idx
  on public.content_items(reviewer_id);

create index if not exists content_comments_content_idx
  on public.content_comments(content_id);

create index if not exists content_status_history_content_idx
  on public.content_status_history(content_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at
before update on public.brands
for each row execute function public.set_updated_at();

drop trigger if exists content_requests_set_updated_at on public.content_requests;
create trigger content_requests_set_updated_at
before update on public.content_requests
for each row execute function public.set_updated_at();

drop trigger if exists content_items_set_updated_at on public.content_items;
create trigger content_items_set_updated_at
before update on public.content_items
for each row execute function public.set_updated_at();

drop trigger if exists content_comments_set_updated_at on public.content_comments;
create trigger content_comments_set_updated_at
before update on public.content_comments
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    role,
    status
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    'content_writer'::public.app_role,
    'active'::public.user_status
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = case
      when public.profiles.full_name = '' then excluded.full_name
      else public.profiles.full_name
    end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update of email, raw_user_meta_data on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (
  id,
  email,
  full_name,
  role,
  status
)
select
  users.id,
  coalesce(users.email, ''),
  coalesce(
    users.raw_user_meta_data ->> 'full_name',
    users.raw_user_meta_data ->> 'name',
    split_part(coalesce(users.email, ''), '@', 1)
  ),
  'content_writer'::public.app_role,
  'active'::public.user_status
from auth.users as users
on conflict (id) do nothing;

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role
  from public.profiles
  where id = (select auth.uid())
  limit 1;
$$;

create or replace function public.is_privileged_content_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    public.current_user_role() in (
      'system_developer'::public.app_role,
      'administrator'::public.app_role,
      'content_manager'::public.app_role,
      'creative_director'::public.app_role
    ),
    false
  );
$$;

alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.content_requests enable row level security;
alter table public.content_items enable row level security;
alter table public.content_comments enable row level security;
alter table public.content_status_history enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.brands to authenticated;
grant select, insert, update, delete on public.content_requests to authenticated;
grant select, insert, update, delete on public.content_items to authenticated;
grant select, insert, update, delete on public.content_comments to authenticated;
grant select, insert on public.content_status_history to authenticated;

drop policy if exists "Authenticated users can view profiles" on public.profiles;
create policy "Authenticated users can view profiles"
on public.profiles
for select
to authenticated
using ((select auth.uid()) is not null);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (
  (select auth.uid()) = id
  or public.is_privileged_content_user()
)
with check (
  (select auth.uid()) = id
  or public.is_privileged_content_user()
);

drop policy if exists "Authenticated users can view brands" on public.brands;
create policy "Authenticated users can view brands"
on public.brands
for select
to authenticated
using (true);

drop policy if exists "Privileged users can create brands" on public.brands;
create policy "Privileged users can create brands"
on public.brands
for insert
to authenticated
with check (public.is_privileged_content_user());

drop policy if exists "Privileged users can update brands" on public.brands;
create policy "Privileged users can update brands"
on public.brands
for update
to authenticated
using (public.is_privileged_content_user())
with check (public.is_privileged_content_user());

drop policy if exists "Administrators can delete brands" on public.brands;
create policy "Administrators can delete brands"
on public.brands
for delete
to authenticated
using (
  public.current_user_role() in (
    'system_developer'::public.app_role,
    'administrator'::public.app_role
  )
);

drop policy if exists "Authenticated users can view requests" on public.content_requests;
create policy "Authenticated users can view requests"
on public.content_requests
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can create requests" on public.content_requests;
create policy "Authenticated users can create requests"
on public.content_requests
for insert
to authenticated
with check ((select auth.uid()) = requester_id);

drop policy if exists "Request owners and managers can update requests" on public.content_requests;
create policy "Request owners and managers can update requests"
on public.content_requests
for update
to authenticated
using (
  (select auth.uid()) = requester_id
  or (select auth.uid()) = assigned_manager_id
  or public.is_privileged_content_user()
)
with check (
  (select auth.uid()) = requester_id
  or (select auth.uid()) = assigned_manager_id
  or public.is_privileged_content_user()
);

drop policy if exists "Privileged users can delete requests" on public.content_requests;
create policy "Privileged users can delete requests"
on public.content_requests
for delete
to authenticated
using (public.is_privileged_content_user());

drop policy if exists "Authenticated users can view content" on public.content_items;
create policy "Authenticated users can view content"
on public.content_items
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can create content" on public.content_items;
create policy "Authenticated users can create content"
on public.content_items
for insert
to authenticated
with check ((select auth.uid()) = created_by);

drop policy if exists "Content participants can update content" on public.content_items;
create policy "Content participants can update content"
on public.content_items
for update
to authenticated
using (
  (select auth.uid()) = created_by
  or (select auth.uid()) = content_writer_id
  or (select auth.uid()) = designer_id
  or (select auth.uid()) = reviewer_id
  or public.is_privileged_content_user()
)
with check (
  (select auth.uid()) = created_by
  or (select auth.uid()) = content_writer_id
  or (select auth.uid()) = designer_id
  or (select auth.uid()) = reviewer_id
  or public.is_privileged_content_user()
);

drop policy if exists "Privileged users can delete content" on public.content_items;
create policy "Privileged users can delete content"
on public.content_items
for delete
to authenticated
using (public.is_privileged_content_user());

drop policy if exists "Authenticated users can view comments" on public.content_comments;
create policy "Authenticated users can view comments"
on public.content_comments
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can create comments" on public.content_comments;
create policy "Authenticated users can create comments"
on public.content_comments
for insert
to authenticated
with check ((select auth.uid()) = author_id);

drop policy if exists "Comment owners can update comments" on public.content_comments;
create policy "Comment owners can update comments"
on public.content_comments
for update
to authenticated
using (
  (select auth.uid()) = author_id
  or public.is_privileged_content_user()
)
with check (
  (select auth.uid()) = author_id
  or public.is_privileged_content_user()
);

drop policy if exists "Comment owners can delete comments" on public.content_comments;
create policy "Comment owners can delete comments"
on public.content_comments
for delete
to authenticated
using (
  (select auth.uid()) = author_id
  or public.is_privileged_content_user()
);

drop policy if exists "Authenticated users can view status history" on public.content_status_history;
create policy "Authenticated users can view status history"
on public.content_status_history
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can add status history" on public.content_status_history;
create policy "Authenticated users can add status history"
on public.content_status_history
for insert
to authenticated
with check ((select auth.uid()) = changed_by);

create or replace function public.record_content_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.status is distinct from new.status then
    insert into public.content_status_history (
      content_id,
      from_status,
      to_status,
      changed_by,
      note
    )
    values (
      new.id,
      old.status,
      new.status,
      coalesce((select auth.uid()), new.created_by),
      'تغيير تلقائي للحالة'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists content_items_record_status_change on public.content_items;
create trigger content_items_record_status_change
after update of status on public.content_items
for each row execute function public.record_content_status_change();

-- Promote the first existing user to system developer only when no privileged user exists.
update public.profiles
set role = 'system_developer'::public.app_role
where id = (
  select id
  from public.profiles
  order by created_at asc
  limit 1
)
and not exists (
  select 1
  from public.profiles
  where role in (
    'system_developer'::public.app_role,
    'administrator'::public.app_role
  )
);

notify pgrst, 'reload schema';
