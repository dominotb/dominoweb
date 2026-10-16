-- Enable RLS and setup public/admin access
alter table product_lines enable row level security;
drop policy if exists "Public read product_lines" on product_lines;
create policy "Public read product_lines" on product_lines for select using (true);
drop policy if exists "Admin all product_lines" on product_lines;
create policy "Admin all product_lines" on product_lines for all using (true) with check (true);

alter table warranty_policies enable row level security;
drop policy if exists "Public read warranty_policies" on warranty_policies;
create policy "Public read warranty_policies" on warranty_policies for select using (true);
drop policy if exists "Admin all warranty_policies" on warranty_policies;
create policy "Admin all warranty_policies" on warranty_policies for all using (true) with check (true);

alter table projects enable row level security;
drop policy if exists "Public read projects" on projects;
create policy "Public read projects" on projects for select using (true);
drop policy if exists "Admin all projects" on projects;
create policy "Admin all projects" on projects for all using (true) with check (true);

alter table posts enable row level security;
drop policy if exists "Public read posts" on posts;
create policy "Public read posts" on posts for select using (true);
drop policy if exists "Admin all posts" on posts;
create policy "Admin all posts" on posts for all using (true) with check (true);

alter table leads enable row level security;
drop policy if exists "Public insert leads" on leads;
create policy "Public insert leads" on leads for insert with check (true);
drop policy if exists "Admin all leads" on leads;
create policy "Admin all leads" on leads for all using (true) with check (true);
