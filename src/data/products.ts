export type Product = {
  slug: string
  name: string
  subtitle: string
  description: string
  specs: string[]
  image: string
  accent: string
  highlights: string[]
}

export const productCatalog: Product[] = [
  {
    slug: 'basic',
    name: 'Basic',
    subtitle: 'Giải pháp tối ưu cho căn bếp hiện đại, tối giản và hiệu quả.',
    description:
      'Dòng Basic tập trung vào tính thực dụng, tối ưu không gian và chi phí hợp lý. Sản phẩm phù hợp cho những gia đình muốn bếp gọn, sang trọng và bền bỉ.',
    specs: ['Kính cường lực', 'Khung INOX', 'Mẫu tối giản', 'Thi công chuẩn'],
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    accent: '#171717',
    highlights: ['Không gian tối ưu', 'Chi phí hợp lý', 'Dễ vệ sinh'],
  },
  {
    slug: 'signature',
    name: 'Signature',
    subtitle: 'Thiết kế đặc trưng với các đường nét rõ ràng và tinh tế.',
    description:
      'Signature là dòng được yêu thích nhờ sự hài hòa giữa công năng, thẩm mỹ và độ bền. Thích hợp với không gian bếp sang trọng và hiện đại.',
    specs: ['Thiết kế nổi bật', 'Tỷ lệ cân đối', 'Phụ kiện cao cấp', 'Tùy biến linh hoạt'],
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    accent: '#171717',
    highlights: ['Hài hòa không gian', 'Phong cách hiện đại', 'Độ bền cao'],
  },
  {
    slug: 'premium',
    name: 'Premium',
    subtitle: 'Hoàn thiện cao cấp, tính thẩm mỹ được đẩy lên ở mức tối đa.',
    description:
      'Dòng Premium mang đến trải nghiệm bếp cao cấp hơn với đường nét rõ, chất liệu tốt và không gian đạt cảm giác sang trọng ngay từ cái nhìn đầu tiên.',
    specs: ['Kính mờ tùy chọn', 'Bề mặt tinh tế', 'Thi công nâng cấp', 'Phù hợp khu nhà đẹp'],
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    accent: '#F8FAFC',
    highlights: ['Hoàn thiện cao cấp', 'Phù hợp không gian lớn', 'Cảm giác sang trọng'],
  },
  {
    slug: 'vip',
    name: 'VIP',
    subtitle: 'Giải pháp tùy biến tối ưu cho không gian bếp đẳng cấp.',
    description:
      'VIP là dòng sản phẩm cao cấp với độ tùy biến lớn, hoàn thiện ấn tượng và khả năng thích ứng với nhiều phong cách kiến trúc khác nhau.',
    specs: ['Tùy biến theo yêu cầu', 'Phụ kiện đặc biệt', 'Hoàn thiện bền lâu', 'Thi công chuyên nghiệp'],
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    accent: '#F8FAFC',
    highlights: ['Tùy biến cao', 'Đẳng cấp', 'Dịch vụ chuyên sâu'],
  },
]

export function getProductBySlug(slug: string) {
  return productCatalog.find((item) => item.slug === slug) || productCatalog[0]
}

export function getRelatedProducts(slug: string) {
  return productCatalog.filter((item) => item.slug !== slug).slice(0, 3)
}
