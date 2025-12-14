import type { Metadata } from 'next';

/**
 * Utility functions for generating dynamic metadata
 */

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export function generateMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description = 'Spurtek provides cutting-edge industrial test systems, data acquisition solutions, and engineering services.',
    image,
    url,
    type = 'website' as 'website' | 'article',
  } = options;

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.spurtek.com.pk';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`;

  // Map 'product' to 'website' for OpenGraph compatibility
  const ogType = type === 'product' ? 'website' : (type as 'website' | 'article');

  return {
    title: title ? `${title} | Spurtek` : 'Spurtek - Industrial Test Systems & Engineering Solutions',
    description,
    openGraph: {
      type: ogType,
      url: fullUrl,
      title: title || 'Spurtek - Industrial Test Systems & Engineering Solutions',
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || 'Spurtek',
        },
      ],
      siteName: 'Spurtek',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Spurtek - Industrial Test Systems & Engineering Solutions',
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

