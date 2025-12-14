import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

// Placeholder case study data - will be replaced with Strapi CMS data in Phase 3
const caseStudies = [
  {
    id: '1',
    slug: 'aviation-testing-success',
    title: 'Aviation Testing Success Story',
    client: 'Major Aerospace Company',
    industry: 'Aviation',
    description:
      'How we helped a leading aerospace company improve their flight testing capabilities with advanced data acquisition systems.',
    metrics: {
      improvement: '40%',
      metric: 'Faster Data Processing',
    },
  },
  {
    id: '2',
    slug: 'energy-grid-monitoring',
    title: 'Energy Grid Monitoring Solution',
    client: 'National Power Utility',
    industry: 'Energy',
    description:
      'Implementation of comprehensive grid monitoring system for improved reliability and efficiency.',
    metrics: {
      improvement: '25%',
      metric: 'Reduced Downtime',
    },
  },
  {
    id: '3',
    slug: 'automotive-production-line',
    title: 'Automotive Production Line Optimization',
    client: 'Automotive Manufacturer',
    industry: 'Automotive',
    description:
      'Real-time monitoring and quality control system for automotive production line.',
    metrics: {
      improvement: '30%',
      metric: 'Quality Improvement',
    },
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Case Studies</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real-world success stories from our clients
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Card key={study.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 text-sm font-medium text-primary">{study.industry}</div>
              <CardTitle>{study.title}</CardTitle>
              <CardDescription className="mt-2">{study.client}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="mb-4 text-sm text-muted-foreground">{study.description}</p>
              <div className="mb-4 rounded-lg bg-primary/10 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-primary">{study.metrics.improvement}</div>
                    <div className="text-xs text-muted-foreground">{study.metrics.metric}</div>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/case-studies/${study.slug}`}>
                  Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

