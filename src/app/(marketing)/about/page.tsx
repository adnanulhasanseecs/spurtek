import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Spurtek</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Leading provider of industrial test systems and engineering solutions
        </p>
      </div>

      {/* Company Overview */}
      <section className="mb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold">Company Overview</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Spurtek is a leading provider of industrial test systems, data acquisition solutions,
              and engineering services in Pakistan. We specialize in delivering cutting-edge
              technology solutions for industries including aviation, energy, automotive, and
              manufacturing.
            </p>
            <p>
              With years of experience and a team of expert engineers, we help our clients improve
              their testing capabilities, optimize their operations, and achieve their business
              goals through innovative technology solutions.
            </p>
            <p>
              Our commitment to quality, reliability, and customer satisfaction has made us a
              trusted partner for leading companies across various sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading provider of industrial test systems and engineering solutions in
                the region, recognized for innovation, quality, and customer excellence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To deliver world-class industrial test systems and engineering solutions that help
                our clients achieve operational excellence, improve quality, and drive innovation in
                their industries.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Certifications & Standards</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'ISO 9001', description: 'Quality Management' },
            { name: 'ISO 14001', description: 'Environmental Management' },
            { name: 'CE Certified', description: 'European Conformity' },
            { name: 'Industry Standard', description: 'Compliance Certified' },
          ].map((cert) => (
            <Card key={cert.name}>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{cert.name}</CardTitle>
                <CardDescription>{cert.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section>
        <h2 className="mb-8 text-3xl font-bold">Our Partners</h2>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'].map((partner) => (
            <Card key={partner} className="flex items-center justify-center p-8">
              <div className="text-center text-sm font-medium text-muted-foreground">
                {partner}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

