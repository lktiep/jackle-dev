import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://jackle.dev', changeFrequency: 'monthly', priority: 1 }];
}
