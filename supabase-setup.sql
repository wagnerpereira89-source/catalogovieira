-- ============================================================
-- VIEIRA PNEUS — Setup do banco (Supabase)
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique RUN.
-- Pode rodar mais de uma vez sem quebrar (usa IF NOT EXISTS / DROP POLICY).
-- ============================================================

-- ---------- TABELAS ----------

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  brand text,
  size text,                -- ex: 195/65 R15 (só pneus)
  aro int,                  -- ex: 15 (pneus e rodas)
  type text,                -- ex: Passeio / SUV / Performance
  load_index text,          -- ex: 91V
  price numeric,            -- null => "Sob consulta"
  description text,
  photos text[] not null default '{}',
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.store_info (
  id int primary key default 1,
  name text,
  address text,
  whatsapp text,            -- só dígitos com DDI: 5547999999999
  phone text,
  hours text,
  maps_url text,
  about text,
  updated_at timestamptz not null default now(),
  constraint store_info_singleton check (id = 1)
);

-- ---------- RLS (segurança) ----------
-- Regra geral: todo mundo LÊ; só usuário logado ESCREVE.

alter table public.categories enable row level security;
alter table public.products  enable row level security;
alter table public.services  enable row level security;
alter table public.store_info enable row level security;

-- categories
drop policy if exists "categories leitura publica" on public.categories;
create policy "categories leitura publica" on public.categories
  for select using (true);
drop policy if exists "categories escrita autenticada" on public.categories;
create policy "categories escrita autenticada" on public.categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- products
drop policy if exists "products leitura publica" on public.products;
create policy "products leitura publica" on public.products
  for select using (true);
drop policy if exists "products escrita autenticada" on public.products;
create policy "products escrita autenticada" on public.products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- services
drop policy if exists "services leitura publica" on public.services;
create policy "services leitura publica" on public.services
  for select using (true);
drop policy if exists "services escrita autenticada" on public.services;
create policy "services escrita autenticada" on public.services
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- store_info
drop policy if exists "store_info leitura publica" on public.store_info;
create policy "store_info leitura publica" on public.store_info
  for select using (true);
drop policy if exists "store_info escrita autenticada" on public.store_info;
create policy "store_info escrita autenticada" on public.store_info
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- STORAGE (fotos) ----------
-- Bucket público de leitura; upload/gestão só autenticado.

insert into storage.buckets (id, name, public)
values ('product-photos', 'product-photos', true)
on conflict (id) do nothing;

drop policy if exists "fotos leitura publica" on storage.objects;
create policy "fotos leitura publica" on storage.objects
  for select using (bucket_id = 'product-photos');

drop policy if exists "fotos upload autenticado" on storage.objects;
create policy "fotos upload autenticado" on storage.objects
  for insert with check (bucket_id = 'product-photos' and auth.role() = 'authenticated');

drop policy if exists "fotos update autenticado" on storage.objects;
create policy "fotos update autenticado" on storage.objects
  for update using (bucket_id = 'product-photos' and auth.role() = 'authenticated');

drop policy if exists "fotos delete autenticado" on storage.objects;
create policy "fotos delete autenticado" on storage.objects
  for delete using (bucket_id = 'product-photos' and auth.role() = 'authenticated');

-- ---------- CATEGORIAS INICIAIS ----------

insert into public.categories (name, sort_order) values
  ('Pneus', 1),
  ('Roda de alumínio', 2),
  ('Lanterna', 3),
  ('Ar-condicionado', 4),
  ('Cinemáticos', 5),
  ('Badanas', 6),
  ('Buzinas', 7),
  ('Ponteira de escape', 8),
  ('Geladeiras', 9)
on conflict (name) do nothing;

-- ---------- INFO INICIAL DA LOJA ----------

insert into public.store_info (id, name, whatsapp)
values (1, 'Vieira Pneus — Recapadora e Acessórios', '5547999999999')
on conflict (id) do nothing;

-- Pronto! Agora crie o usuário admin em Authentication > Users > Add user.
