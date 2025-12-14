import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function AviationPage() {
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
          <Plane className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Aviation Solutions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive testing solutions for aerospace applications, including flight testing,
          structural testing, and avionics validation.
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Flight Test Data Acquisition</CardTitle>
            <CardDescription>
              Real-time data acquisition systems for flight testing and validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'High-speed data recording',
                'Multi-channel sensor integration',
                'Real-time telemetry',
                'Post-flight analysis',
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
            <CardTitle>Structural Health Monitoring</CardTitle>
            <CardDescription>
              Continuous monitoring systems for aircraft structural integrity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Strain gauge monitoring',
                'Vibration analysis',
                'Fatigue tracking',
                'Predictive maintenance',
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
            <CardTitle>Avionics Testing</CardTitle>
            <CardDescription>
              Comprehensive testing solutions for avionics systems and components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Signal validation',
                'Protocol testing',
                'Environmental testing',
                'EMI/EMC compliance',
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
            <CardTitle>Environmental Testing</CardTitle>
            <CardDescription>
              Testing systems for extreme environmental conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Temperature cycling',
                'Altitude simulation',
                'Humidity testing',
                'Vibration testing',
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
          <Link href="/products?industry=Aviation">View Aviation Products</Link>
        </Button>
      </div>
    </div>
  );
}

