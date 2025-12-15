'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  ArrowRight,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-24 md:py-36 lg:py-40">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              variants={fadeInUp}
            >
              Industrial Test Systems &{' '}
              <span className="text-primary">Engineering Solutions</span>
            </motion.h1>
            <motion.p
              className="mt-8 text-xl leading-relaxed text-muted-foreground sm:text-2xl md:max-w-3xl md:mx-auto"
              variants={fadeInUp}
            >
              Leading provider of cutting-edge data acquisition systems and engineering solutions
              for industries across Pakistan and beyond.
            </motion.p>
            <motion.div
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
              variants={fadeInUp}
            >
              <Button asChild size="lg" className="group">
                <Link href="/contact?type=quote">
                  <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/contact?type=demo">
                  <Calendar className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Book Demo
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="group">
                <Link href="/resources">
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Download Brochure
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Industries We Serve
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Trusted by leading companies across multiple sectors
            </p>
          </motion.div>
          <motion.div
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: 'Aviation', icon: Plane, description: 'Aerospace testing and validation' },
              { name: 'Energy', icon: Zap, description: 'Power systems and renewable energy' },
              { name: 'Automotive', icon: Car, description: 'Vehicle testing and diagnostics' },
              {
                name: 'Manufacturing',
                icon: Factory,
                description: 'Production line monitoring and quality control',
              },
            ].map((industry, index) => (
              <motion.div key={industry.name} variants={fadeInUp}>
                <Card className="text-center h-full transition-all duration-300 hover:border-primary/50">
                  <CardHeader>
                    <motion.div
                      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <industry.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">{industry.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm" className="group">
                      <Link href={`/solutions/${industry.name.toLowerCase()}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Featured Products
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Explore our range of industrial test systems and data acquisition solutions
            </p>
          </motion.div>
          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl">Product {i}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Advanced data acquisition system for industrial applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 text-sm flex-1">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>High-speed data capture</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Real-time analysis</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Industry-standard interfaces</span>
                      </li>
                    </ul>
                    <div className="mt-6 flex gap-3">
                      <Button asChild size="sm" className="flex-1 group">
                        <Link href={`/products/product-${i}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/contact?type=quote">Quote</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              We work with leading companies across various sectors
            </p>
          </motion.div>
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5'].map((client, index) => (
              <motion.div
                key={client}
                variants={fadeInUp}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="flex h-20 w-40 items-center justify-center rounded-lg border bg-muted/50 text-sm font-medium transition-all"
              >
                {client}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications & Trust Badges */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Certifications & Standards
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Committed to quality and industry standards
            </p>
          </motion.div>
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {['ISO 9001', 'ISO 14001', 'CE Certified', 'Industry Standard'].map((cert) => (
              <motion.div key={cert} variants={fadeInUp}>
                <Card className="flex items-center gap-4 p-6 transition-all hover:border-primary/50">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="h-10 w-10 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg">{cert}</h3>
                    <p className="text-sm text-muted-foreground">Certified</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

