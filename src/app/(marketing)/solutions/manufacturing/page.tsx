import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Factory, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ManufacturingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/solutions"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Solutions
      </Link>

      <div className="mb-8">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
          <Factory className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Manufacturing Solutions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Industrial automation and quality control systems for modern manufacturing operations.
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Production Monitoring</CardTitle>
            <CardDescription>
              Real-time monitoring and control of production processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Process monitoring',
                'Quality metrics',
                'Production analytics',
                'Alert systems',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Control</CardTitle>
            <CardDescription>
              Automated quality assurance and testing systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Automated testing',
                'Statistical process control',
                'Defect detection',
                'Compliance reporting',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/contact?type=quote">Request Quote</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/products?industry=Manufacturing">View Manufacturing Products</Link>
        </Button>
      </div>
    </div>
  );
}

