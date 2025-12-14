/**
 * Structured data (JSON-LD) utilities for SEO
 */

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo?: string;
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
    email: string;
  };
}

interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  brand: {
    '@type': string;
    name: string;
  };
  category?: string;
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.spurtek.com.pk';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Spurtek',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-XXX-XXXXXXX',
      contactType: 'Customer Service',
      email: 'info@spurtek.com.pk',
    },
  };
}

/**
 * Generate Product schema
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  category?: string;
}): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Spurtek',
    },
    category: product.category,
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.spurtek.com.pk';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate Article schema for case studies
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.spurtek.com.pk';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image ? `${siteUrl}${article.image}` : undefined,
    datePublished: article.datePublished,
    author: article.author
      ? {
          '@type': 'Organization',
          name: article.author,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Spurtek',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
}

