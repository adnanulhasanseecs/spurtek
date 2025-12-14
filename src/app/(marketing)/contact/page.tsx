'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

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
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="mb-4 h-16 w-16 text-primary" />
              <h2 className="mb-2 text-2xl font-bold">Thank You!</h2>
              <p className="mb-6 text-muted-foreground">
                We've received your message and will get back to you soon.
              </p>
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get in touch with our team to discuss your requirements
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="mb-4 flex items-center justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        currentStep >= step.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.id}
                    </div>
                    {step.id < steps.length && (
                      <div
                        className={`h-1 w-12 ${
                          currentStep > step.id ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <CardTitle>{steps[currentStep - 1].name}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="industry-select" className="mb-2 block text-sm font-medium">
                        Industry
                      </label>
                      <select
                        id="industry-select"
                        name="industry"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
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
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="need-textarea" className="mb-2 block text-sm font-medium">
                        What do you need help with?
                      </label>
                      <textarea
                        id="need-textarea"
                        name="need"
                        value={formData.need}
                        onChange={(e) => handleInputChange('need', e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
                        placeholder="Describe your requirements..."
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="timeline-select" className="mb-2 block text-sm font-medium">
                        Timeline
                      </label>
                      <select
                        id="timeline-select"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
                        required
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName-input" className="mb-2 block text-sm font-medium">
                          First Name
                        </label>
                        <input
                          id="firstName-input"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName-input" className="mb-2 block text-sm font-medium">
                          Last Name
                        </label>
                        <input
                          id="lastName-input"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-4 py-2"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email-input" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone-input" className="mb-2 block text-sm font-medium">
                        Phone
                      </label>
                      <input
                        id="phone-input"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="company-input" className="mb-2 block text-sm font-medium">
                        Company
                      </label>
                      <input
                        id="company-input"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="message-textarea" className="mb-2 block text-sm font-medium">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message-textarea"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-4 py-2"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
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
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-sm text-muted-foreground">Pakistan</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">+92 XXX XXXXXXX</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">info@spurtek.com.pk</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg bg-muted">
                {/* Google Maps embed will be added here */}
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Map placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

