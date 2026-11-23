import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/db';
import { CATEGORIES } from '@/lib/initialData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.goyalcollections.shop';
  const { products } = getProducts();

  const staticRoutes = [
    '',
    '/shop',
    '/category/footwear',
    '/category/ready-made-clothes',
    '/about',
    '/contact',
    '/faq',
    '/shipping-policy',
    '/return-policy',
    '/privacy-policy',
    '/terms',
    '/order-tracking',
    '/cart',
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = CATEGORIES.flatMap((cat) => [
    {
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...cat.subcategories.map((sub) => ({
      url: `${baseUrl}/category/${cat.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]);

  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: new Date(prod.createdAt),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
