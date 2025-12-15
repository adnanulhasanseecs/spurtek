'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Zap, Car, Factory, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Industry Solutions
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Tailored engineering solutions for your industry
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {industries.map((industry) => (
          <motion.div key={industry.slug} variants={fadeInUp}>
            <Card className="flex h-full flex-col transition-all hover:border-primary/50">
              <CardHeader>
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <industry.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <CardTitle className="text-2xl">{industry.name}</CardTitle>
                <CardDescription className="text-base mt-2">{industry.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <ul className="mb-8 space-y-3">
                  {industry.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="group">
                  <Link href={`/solutions/${industry.slug}`}>
                    Learn More{' '}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

