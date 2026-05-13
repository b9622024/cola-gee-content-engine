create table if not exists public.content_engine_states (
  workspace_id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.content_engine_states enable row level security;

-- 這個 MVP 透過 Vercel API 使用 service role key 存取資料。
-- 不需要開放 anon/public RLS policy，避免資料直接暴露給瀏覽器。
