import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Spurtek - Industrial Test Systems & Engineering Solutions',
    template: '%s | Spurtek',
  },
  description:
    'Spurtek provides cutting-edge industrial test systems, data acquisition solutions, and engineering services for aviation, energy, automotive, and manufacturing industries.',
  keywords: [
    'industrial test systems',
    'data acquisition',
    'engineering solutions',
    'Pakistan',
    'B2B technology',
  ],
  authors: [{ name: 'Spurtek' }],
  creator: 'Spurtek',
  publisher: 'Spurtek',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.spurtek.com.pk',
    siteName: 'Spurtek',
    title: 'Spurtek - Industrial Test Systems & Engineering Solutions',
    description:
      'Leading provider of industrial test systems and data acquisition solutions in Pakistan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spurtek - Industrial Test Systems & Engineering Solutions',
    description:
      'Leading provider of industrial test systems and data acquisition solutions in Pakistan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

