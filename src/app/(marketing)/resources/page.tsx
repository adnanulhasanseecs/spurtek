import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Video, BookOpen } from 'lucide-react';

// Placeholder resource data - will be replaced with Strapi CMS data in Phase 3
const resources = [
  {
    id: '1',
    slug: 'data-acquisition-guide',
    title: 'Data Acquisition Best Practices Guide',
    type: 'whitepaper',
    description: 'Comprehensive guide to implementing effective data acquisition systems.',
    icon: BookOpen,
  },
  {
    id: '2',
    slug: 'product-datasheet-pro',
    title: 'Data Acquisition System Pro - Datasheet',
    type: 'datasheet',
    description: 'Technical specifications and features of our flagship product.',
    icon: FileText,
  },
  {
    id: '3',
    slug: 'industrial-testing-video',
    title: 'Industrial Testing Solutions Overview',
    type: 'video',
    description: 'Video overview of our industrial testing capabilities.',
    icon: Video,
  },
  {
    id: '4',
    slug: 'vibration-analysis-whitepaper',
    title: 'Vibration Analysis in Manufacturing',
    type: 'whitepaper',
    description: 'Learn how vibration analysis improves manufacturing quality.',
    icon: BookOpen,
  },
  {
    id: '5',
    slug: 'test-controller-datasheet',
    title: 'Test Stand Controller - Datasheet',
    type: 'datasheet',
    description: 'Complete specifications for our test stand controller.',
    icon: FileText,
  },
];

const categories = ['All', 'Datasheets', 'Whitepapers', 'Videos'];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Download datasheets, whitepapers, and access video resources
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === 'All' ? 'default' : 'outline'}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <resource.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-2 text-sm font-medium text-primary uppercase">
                {resource.type}
              </div>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/resources/${resource.slug}`}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

