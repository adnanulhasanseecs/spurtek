import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function AutomotivePage() {
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
          <Car className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Automotive Solutions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete testing solutions for vehicle development, production testing, and quality
          assurance.
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Engine Testing</CardTitle>
            <CardDescription>
              Comprehensive engine performance and durability testing systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Performance measurement',
                'Emissions testing',
                'Durability validation',
                'Real-time monitoring',
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
            <CardTitle>Vehicle Dynamics</CardTitle>
            <CardDescription>
              Testing and analysis systems for vehicle handling and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Suspension analysis',
                'Brake testing',
                'Handling evaluation',
                'Data logging',
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
          <Link href="/products?industry=Automotive">View Automotive Products</Link>
        </Button>
      </div>
    </div>
  );
}

