import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Zap, Car, Factory, ArrowRight } from 'lucide-react';

const industries = [
  {
    name: 'Aviation',
    slug: 'aviation',
    icon: Plane,
    description:
      'Comprehensive testing solutions for aerospace applications, including flight testing, structural testing, and avionics validation.',
    highlights: [
      'Flight test data acquisition',
      'Structural health monitoring',
      'Avionics testing',
      'Environmental testing',
    ],
  },
  {
    name: 'Energy',
    slug: 'energy',
    icon: Zap,
    description:
      'Advanced monitoring and testing systems for power generation, renewable energy, and grid infrastructure.',
    highlights: [
      'Power system monitoring',
      'Renewable energy testing',
      'Grid stability analysis',
      'Equipment diagnostics',
    ],
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    icon: Car,
    description:
      'Complete testing solutions for vehicle development, production testing, and quality assurance.',
    highlights: [
      'Engine testing',
      'Vehicle dynamics',
      'Durability testing',
      'Production line testing',
    ],
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    icon: Factory,
    description:
      'Industrial automation and quality control systems for modern manufacturing operations.',
    highlights: [
      'Production monitoring',
      'Quality control',
      'Process optimization',
      'Predictive maintenance',
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Industry Solutions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tailored engineering solutions for your industry
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {industries.map((industry) => (
          <Card key={industry.slug} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <industry.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{industry.name}</CardTitle>
              <CardDescription className="text-base">{industry.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <ul className="mb-6 space-y-2">
                {industry.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href={`/solutions/${industry.slug}`}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

