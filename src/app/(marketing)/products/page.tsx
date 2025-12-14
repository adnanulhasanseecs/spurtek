import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { generateMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Products',
  description: 'Explore our comprehensive range of industrial test systems and data acquisition solutions',
});

// Placeholder product data - will be replaced with Strapi CMS data in Phase 3
const products = [
  {
    id: '1',
    slug: 'data-acquisition-system-pro',
    name: 'Data Acquisition System Pro',
    description: 'High-performance data acquisition system for industrial testing applications.',
    category: 'Data Acquisition',
    industry: ['Aviation', 'Automotive', 'Manufacturing'],
  },
  {
    id: '2',
    slug: 'test-stand-controller',
    name: 'Test Stand Controller',
    description: 'Advanced controller for automated test stands and production lines.',
    category: 'Test Systems',
    industry: ['Automotive', 'Manufacturing'],
  },
  {
    id: '3',
    slug: 'vibration-analysis-suite',
    name: 'Vibration Analysis Suite',
    description: 'Comprehensive vibration analysis and monitoring solution.',
    category: 'Analysis Tools',
    industry: ['Aviation', 'Energy', 'Manufacturing'],
  },
  {
    id: '4',
    slug: 'thermal-testing-system',
    name: 'Thermal Testing System',
    description: 'Precision thermal testing and monitoring equipment.',
    category: 'Test Systems',
    industry: ['Aviation', 'Energy'],
  },
  {
    id: '5',
    slug: 'signal-conditioning-module',
    name: 'Signal Conditioning Module',
    description: 'Multi-channel signal conditioning for sensor integration.',
    category: 'Data Acquisition',
    industry: ['Aviation', 'Automotive', 'Energy', 'Manufacturing'],
  },
  {
    id: '6',
    slug: 'real-time-monitoring-platform',
    name: 'Real-Time Monitoring Platform',
    description: 'Cloud-based real-time monitoring and analytics platform.',
    category: 'Software',
    industry: ['Energy', 'Manufacturing'],
  },
];

const categories = ['All', 'Data Acquisition', 'Test Systems', 'Analysis Tools', 'Software'];
const industries = ['All', 'Aviation', 'Energy', 'Automotive', 'Manufacturing'];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our comprehensive range of industrial test systems and data acquisition solutions
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          <select className="rounded-md border border-input bg-background px-4 py-2 text-sm">
            <option>All Categories</option>
            {categories.slice(1).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select className="rounded-md border border-input bg-background px-4 py-2 text-sm">
            <option>All Industries</option>
            {industries.slice(1).map((ind) => (
              <option key={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 text-sm font-medium text-primary">{product.category}</div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">Industries:</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {product.industry.map((ind) => (
                    <span
                      key={ind}
                      className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/products/${product.slug}`}>View Details</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact?type=quote">Quote</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
