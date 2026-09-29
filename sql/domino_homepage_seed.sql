-- DOMINO homepage seed data for Supabase
-- Run this in Supabase SQL editor

create extension if not exists pgcrypto;

create table if not exists product_lines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  family text not null,
  short_description text,
  description text,
  media_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists warranty_policies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  value text not null,
  product_family text,
  description text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text,
  short_description text,
  image text,
  is_featured boolean default false,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  image text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  need text,
  note text,
  created_at timestamptz default now()
);

insert into product_lines (name, slug, family, short_description, description, media_url)
values
  ('Basic', 'basic', 'Basic', 'Giải pháp cơ bản, hiệu quả về chi phí.', 'Dòng tủ bếp căn bản tối ưu chi phí, bền sử dụng và dễ hợp với không gian nhỏ.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'),
  ('Signature', 'signature', 'Signature', 'Thiết kế đặc trưng và bền chắc hơn trong sử dụng hằng ngày.', 'Dòng Signature cân bằng giữa thẩm mỹ, độ chắc chắn và khả năng sử dụng lâu dài.', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'),
  ('Premium', 'premium', 'Premium', 'Hoàn thiện cao cấp, dáng tối giản và tinh tế.', 'Dòng Premium hướng tới sự sang trọng, phù hợp với không gian hiện đại và các căn bếp có tầm nhìn thẩm mỹ cao.', 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'),
  ('VIP', 'vip', 'VIP', 'Giải pháp cao cấp, tối ưu theo phong cách riêng.', 'Dòng VIP đáp ứng các căn bếp cần sự cá nhân hóa, cấu hình nâng cao và chất lượng đi kèm dịch vụ chuyên sâu.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80')
on conflict (slug) do nothing;

insert into warranty_policies (title, value, product_family, description)
values
  ('Khung / Thùng', '10 năm', 'Basic', 'Bảo hành khung/thùng theo từng dòng và điều kiện sử dụng thực tế.'),
  ('Cánh kính', '5 năm', 'Signature', 'Bảo hành cánh kính theo quy định từng dòng sản phẩm.'),
  ('Phụ kiện', '2 năm', 'Premium', 'Bảo hành phụ kiện và cơ cấu phụ trợ theo chính sách hiện hành.'),
  ('Tùy chọn trọn đời', 'Có thể áp dụng', 'VIP', 'Phạm vi theo hợp đồng và cấu hình cụ thể từng dự án.')
on conflict do nothing;

insert into projects (title, location, short_description, image, is_featured)
values
  ('Bếp gia đình 3 người', 'Thái Bình', 'Tủ bếp kính INOX tối ưu cho không gian ăn uống gia đình.', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80', true),
  ('Bếp căn hộ hiện đại', 'Hà Nội', 'Thiết kế tối giản, mở không gian và tương thích với hoạt động hằng ngày.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', true),
  ('Bếp resort', 'Đà Nẵng', 'Cấu hình Premium với gam màu sáng, đa chức năng và độ bền cao.', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80', true);

insert into posts (title, slug, excerpt, content, category, image)
values
  ('Vật liệu kính trong tủ bếp', 'vat-lieu-kinh-trong-tu-bep', 'Hiểu rõ chất liệu kính giúp bạn lựa chọn đúng cho việc sử dụng lâu dài.', 'Kính cường lực và kính nhám phù hợp với các nhu cầu khác nhau. Mỗi loại có đặc điểm riêng về độ bóng, độ Bền và cách vệ sinh.', 'Kiến thức', 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'),
  ('Chọn phụ kiện bền bỉ', 'chon-phu-kien-ben-bi', 'Phụ kiện tốt là yếu tố quyết định sự trơn tru khi dùng hằng ngày.', 'Bản lề, ray và bo cánh cần được lựa chọn theo trọng lượng, tần suất dùng và điều kiện môi trường.', 'Kiến thức', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'),
  ('Hướng dẫn bảo hành', 'huong-dan-bao-hanh', 'Hiểu rõ bảo hành giúp bạn kiểm soát được chi phí sau khi lắp đặt.', 'Bảo hành thường áp dụng theo từng dòng sản phẩm, tùy thuộc vào cấu tạo và cách sử dụng.', 'Bảo hành', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80');

insert into leads (name, phone, need, note)
values
  ('Nguyễn Văn A', '0987654321', 'Tư vấn tủ bếp mới', 'Cần tham khảo thiết kế cho căn hộ 80m2'),
  ('Trần Thị B', '0912345678', 'Cải tạo bếp cũ', 'Muốn chuyển sang dòng Premium');

-- Optional RLS example (lightweight):
-- alter table product_lines enable row level security;
-- create policy "Allow read access for product_lines" on product_lines for select using (true);
-- alter table warranty_policies enable row level security;
-- create policy "Allow read access for warranty_policies" on warranty_policies for select using (true);
-- alter table projects enable row level security;
-- create policy "Allow read access for projects" on projects for select using (true);
-- alter table posts enable row level security;
-- create policy "Allow read access for posts" on posts for select using (true);
