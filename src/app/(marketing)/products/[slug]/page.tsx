import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';

// Placeholder product data - will be replaced with Strapi CMS data in Phase 3
interface Product {
  name: string;
  description: string;
  category: string;
  industries: string[];
  specifications: Record<string, string>;
  features: string[];
}

const products: Record<string, Product> = {
  'data-acquisition-system-pro': {
    name: 'Data Acquisition System Pro',
    description:
      'High-performance data acquisition system designed for demanding industrial testing applications. Features real-time data capture, advanced signal processing, and comprehensive analysis tools.',
    category: 'Data Acquisition',
    industries: ['Aviation', 'Automotive', 'Manufacturing'],
    specifications: {
      'Channels': '64 analog, 32 digital',
      'Sampling Rate': '1 MS/s per channel',
      'Resolution': '16-bit',
      'Input Range': '±10V',
      'Interface': 'USB 3.0, Ethernet',
      'Operating Temperature': '-40°C to +85°C',
    },
    features: [
      'High-speed simultaneous sampling',
      'Real-time data streaming',
      'Advanced signal conditioning',
      'Multi-channel synchronization',
      'Comprehensive software suite',
      'Industry-standard interfaces',
    ],
  },
  'test-stand-controller': {
    name: 'Test Stand Controller',
    description:
      'Advanced controller for automated test stands and production lines. Provides precise control, monitoring, and data logging capabilities.',
    category: 'Test Systems',
    industries: ['Automotive', 'Manufacturing'],
    specifications: {
      'Control Channels': '16',
      'I/O Points': '128',
      'Communication': 'Ethernet, Modbus, CAN',
      'Response Time': '< 1ms',
      'Operating Temperature': '0°C to +70°C',
    },
    features: [
      'Programmable test sequences',
      'Real-time monitoring',
      'Data logging and reporting',
      'Safety interlocks',
      'Remote operation',
    ],
  },
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="mb-2 text-sm font-medium text-primary">{product.category}</div>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
          </div>

          {/* Specifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Key Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                    <dd className="mt-1 text-sm font-semibold">{value as string}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Industries */}
          <Card>
            <CardHeader>
              <CardTitle>Industries Served</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {product.industries.map((industry: string) => (
                  <Link
                    key={industry}
                    href={`/solutions/${industry.toLowerCase()}`}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                  >
                    {industry}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Get More Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" size="lg">
                <Link href="/contact?type=quote">
                  <FileText className="mr-2 h-4 w-4" />
                  Request Quote
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="#">
                  <Download className="mr-2 h-4 w-4" />
                  Download Datasheet
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/contact?type=demo">Book a Demo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

