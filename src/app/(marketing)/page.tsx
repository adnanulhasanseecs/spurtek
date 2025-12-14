import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Download,
  Calendar,
  FileText,
  Plane,
  Zap,
  Car,
  Factory,
  CheckCircle2,
  Award,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Industrial Test Systems & Engineering Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Leading provider of cutting-edge data acquisition systems and engineering solutions
              for industries across Pakistan and beyond.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact?type=quote">
                  <FileText className="mr-2 h-4 w-4" />
                  Request Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact?type=demo">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Demo
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/resources">
                  <Download className="mr-2 h-4 w-4" />
                  Download Brochure
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by leading companies across multiple sectors
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Aviation', icon: Plane, description: 'Aerospace testing and validation' },
              { name: 'Energy', icon: Zap, description: 'Power systems and renewable energy' },
              { name: 'Automotive', icon: Car, description: 'Vehicle testing and diagnostics' },
              {
                name: 'Manufacturing',
                icon: Factory,
                description: 'Production line monitoring and quality control',
              },
            ].map((industry) => (
              <Card key={industry.name} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <industry.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/solutions/${industry.name.toLowerCase()}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our range of industrial test systems and data acquisition solutions
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Product {i}</CardTitle>
                  <CardDescription>
                    Advanced data acquisition system for industrial applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      High-speed data capture
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Real-time analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Industry-standard interfaces
                    </li>
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/products/product-${i}`}>View Details</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/contact?type=quote">Request Quote</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We work with leading companies across various sectors
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-60">
            {['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5'].map((client) => (
              <div
                key={client}
                className="flex h-16 w-32 items-center justify-center rounded-lg border bg-muted text-sm font-medium"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Trust Badges */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Certifications & Standards
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Committed to quality and industry standards
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {['ISO 9001', 'ISO 14001', 'CE Certified', 'Industry Standard'].map((cert) => (
              <Card key={cert} className="flex items-center gap-4 p-4">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{cert}</h3>
                  <p className="text-sm text-muted-foreground">Certified</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

