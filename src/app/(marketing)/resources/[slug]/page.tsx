import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Mail } from 'lucide-react';

// Placeholder resource data - will be replaced with Strapi CMS data in Phase 3
interface Resource {
  title: string;
  type: string;
  description: string;
  gated: boolean;
}

const resources: Record<string, Resource> = {
  'data-acquisition-guide': {
    title: 'Data Acquisition Best Practices Guide',
    type: 'whitepaper',
    description:
      'Comprehensive guide covering best practices for implementing effective data acquisition systems in industrial environments.',
    gated: true,
  },
  'product-datasheet-pro': {
    title: 'Data Acquisition System Pro - Datasheet',
    type: 'datasheet',
    description: 'Complete technical specifications and features of our flagship data acquisition system.',
    gated: false,
  },
};

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources[slug];

  if (!resource) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/resources"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Resources
      </Link>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-2 text-sm font-medium text-primary uppercase">{resource.type}</div>
          <h1 className="text-4xl font-bold tracking-tight">{resource.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{resource.description}</p>
        </div>

        {resource.gated ? (
          <Card>
            <CardHeader>
              <CardTitle>Download Resource</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please provide your email to download this resource.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm"
                />
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Get Download Link
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Download Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

