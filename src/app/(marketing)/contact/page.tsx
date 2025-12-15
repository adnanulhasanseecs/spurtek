'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const industries = [
  'Aviation',
  'Energy',
  'Automotive',
  'Manufacturing',
  'Other',
];

const steps = [
  { id: 1, name: 'Industry', description: 'Select your industry' },
  { id: 2, name: 'Details', description: 'Tell us about your needs' },
  { id: 3, name: 'Contact', description: 'Your contact information' },
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    need: '',
    timeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && !formData.industry) {
      return; // Don't proceed if industry is not selected
    }
    if (currentStep === 2 && (!formData.need || !formData.timeline)) {
      return; // Don't proceed if required fields are empty
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to submit form'}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mx-auto max-w-md">
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <CheckCircle2 className="mb-6 h-20 w-20 text-primary" />
                </motion.div>
                <h2 className="mb-3 text-3xl font-bold">Thank You!</h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  We've received your message and will get back to you soon.
                </p>
                <Button asChild size="lg" className="group">
                  <Link href="/">
                    Return Home
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Contact Us</h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Get in touch with our team to discuss your requirements
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="mb-6 flex items-center justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <motion.div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                        currentStep >= step.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted text-muted-foreground'
                      }`}
                      animate={{
                        scale: currentStep === step.id ? 1.1 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {step.id}
                    </motion.div>
                    {step.id < steps.length && (
                      <div className="flex-1 mx-2 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <CardTitle className="text-2xl">{steps[currentStep - 1].name}</CardTitle>
              <CardDescription className="text-base mt-2">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="industry-select">Industry</Label>
                        <select
                          id="industry-select"
                          name="industry"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="mt-2 h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2.5 text-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          required
                        >
                          <option value="">Select industry</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="need-textarea">What do you need help with?</Label>
                        <Textarea
                          id="need-textarea"
                          name="need"
                          value={formData.need}
                          onChange={(e) => handleInputChange('need', e.target.value)}
                          rows={5}
                          placeholder="Describe your requirements..."
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline-select">Timeline</Label>
                        <select
                          id="timeline-select"
                          name="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="mt-2 h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2.5 text-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          required
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="firstName-input">First Name</Label>
                          <Input
                            id="firstName-input"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName-input">Last Name</Label>
                          <Input
                            id="lastName-input"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email-input">Email</Label>
                        <Input
                          id="email-input"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone-input">Phone</Label>
                        <Input
                          id="phone-input"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company-input">Company</Label>
                        <Input
                          id="company-input"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message-textarea">Message (Optional)</Label>
                        <Textarea
                          id="message-textarea"
                          name="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={handleBack} className="group">
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Back
                    </Button>
                  )}
                  <div className={currentStep > 1 ? 'ml-auto' : 'ml-auto w-full'}>
                    {currentStep < 3 ? (
                      <Button type="button" onClick={handleNext} className="group w-full sm:w-auto">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    ) : (
                      <Button type="submit" size="lg" className="group w-full sm:w-auto">
                        <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-sm text-muted-foreground mt-1">Pakistan</div>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-muted-foreground mt-1">+92 XXX XXXXXXX</div>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground mt-1">info@spurtek.com.pk</div>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                {/* Google Maps embed will be added here */}
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Map placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

