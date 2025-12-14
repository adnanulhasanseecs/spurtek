import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// Placeholder case study data - will be replaced with Strapi CMS data in Phase 3
interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: Array<{ label: string; value: string }>;
  testimonial: {
    quote: string;
    author: string;
    company: string;
  };
}

const caseStudies: Record<string, CaseStudy> = {
  'aviation-testing-success': {
    title: 'Aviation Testing Success Story',
    client: 'Major Aerospace Company',
    industry: 'Aviation',
    problem:
      'The client needed to improve their flight testing data acquisition capabilities to reduce testing time and improve data quality.',
    solution:
      'We implemented a comprehensive data acquisition system with high-speed recording, real-time telemetry, and advanced analysis tools.',
    outcome:
      'The solution resulted in 40% faster data processing, improved test reliability, and significant cost savings.',
    metrics: [
      { label: 'Faster Data Processing', value: '40%' },
      { label: 'Test Reliability', value: '95%' },
      { label: 'Cost Savings', value: '30%' },
    ],
    testimonial: {
      quote:
        'Spurtek\'s solution transformed our flight testing operations. The improved data quality and faster processing have been game-changers.',
      author: 'Engineering Director',
      company: 'Major Aerospace Company',
    },
  },
};

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/case-studies"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Case Studies
      </Link>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-2 text-sm font-medium text-primary">{study.industry}</div>
          <h1 className="text-4xl font-bold tracking-tight">{study.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{study.client}</p>
        </div>

        <div className="space-y-8">
          {/* Problem */}
          <Card>
            <CardHeader>
              <CardTitle>The Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{study.problem}</p>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card>
            <CardHeader>
              <CardTitle>Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{study.solution}</p>
            </CardContent>
          </Card>

          {/* Outcome */}
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">{study.outcome}</p>
              <div className="grid gap-4 md:grid-cols-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg bg-primary/10 p-4 text-center">
                    <div className="text-3xl font-bold text-primary">{metric.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonial */}
          <Card>
            <CardHeader>
              <CardTitle>Client Testimonial</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-muted-foreground">
                "{study.testimonial.quote}"
              </blockquote>
              <div className="mt-4">
                <div className="font-semibold">{study.testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{study.testimonial.company}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

