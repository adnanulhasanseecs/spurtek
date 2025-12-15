'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';

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

// Placeholder product data - will be replaced with Strapi CMS data in Phase 3
const products = [
  {
    id: '1',
    slug: 'data-acquisition-system-pro',
    name: 'Data Acquisition System Pro',
    description: 'High-performance data acquisition system for industrial testing applications.',
    category: 'Data Acquisition',
    industry: ['Aviation', 'Automotive', 'Manufacturing'],
  },
  {
    id: '2',
    slug: 'test-stand-controller',
    name: 'Test Stand Controller',
    description: 'Advanced controller for automated test stands and production lines.',
    category: 'Test Systems',
    industry: ['Automotive', 'Manufacturing'],
  },
  {
    id: '3',
    slug: 'vibration-analysis-suite',
    name: 'Vibration Analysis Suite',
    description: 'Comprehensive vibration analysis and monitoring solution.',
    category: 'Analysis Tools',
    industry: ['Aviation', 'Energy', 'Manufacturing'],
  },
  {
    id: '4',
    slug: 'thermal-testing-system',
    name: 'Thermal Testing System',
    description: 'Precision thermal testing and monitoring equipment.',
    category: 'Test Systems',
    industry: ['Aviation', 'Energy'],
  },
  {
    id: '5',
    slug: 'signal-conditioning-module',
    name: 'Signal Conditioning Module',
    description: 'Multi-channel signal conditioning for sensor integration.',
    category: 'Data Acquisition',
    industry: ['Aviation', 'Automotive', 'Energy', 'Manufacturing'],
  },
  {
    id: '6',
    slug: 'real-time-monitoring-platform',
    name: 'Real-Time Monitoring Platform',
    description: 'Cloud-based real-time monitoring and analytics platform.',
    category: 'Software',
    industry: ['Energy', 'Manufacturing'],
  },
];

const categories = ['All', 'Data Acquisition', 'Test Systems', 'Analysis Tools', 'Software'];
const industries = ['All', 'Aviation', 'Energy', 'Automotive', 'Manufacturing'];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'All' || product.industry.includes(selectedIndustry);
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Our Products
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Explore our comprehensive range of industrial test systems and data acquisition solutions
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mb-12 flex flex-col gap-4 md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-11 rounded-md border-2 border-input bg-background px-4 py-2.5 text-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option>All Categories</option>
            {categories.slice(1).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="h-11 rounded-md border-2 border-input bg-background px-4 py-2.5 text-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option>All Industries</option>
            {industries.slice(1).map((ind) => (
              <option key={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {filteredProducts.map((product, index) => (
          <motion.div key={product.id} variants={fadeInUp}>
            <Card className="flex h-full flex-col transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-3 text-sm font-semibold text-primary">{product.category}</div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription className="text-base mt-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <div className="mb-6">
                  <div className="mb-2 text-sm font-medium text-muted-foreground">Industries:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.industry.map((ind) => (
                      <span
                        key={ind}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="flex-1 group">
                    <Link href={`/products/${product.slug}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact?type=quote">Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {filteredProducts.length === 0 && (
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
}
