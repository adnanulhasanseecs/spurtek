import {
  leadQuoteSchema,
  leadDemoSchema,
  leadContactSchema,
  downloadSchema,
  newsletterSchema,
} from '@/lib/validations';

describe('Validation Schemas', () => {
  describe('leadQuoteSchema', () => {
    it('should validate correct quote data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Test Corp',
        industry: 'Aviation',
        message: 'Need a quote',
      };

      const result = leadQuoteSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
      };

      const result = leadQuoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should require firstName and lastName', () => {
      const invalidData = {
        email: 'john@example.com',
      };

      const result = leadQuoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('leadDemoSchema', () => {
    it('should validate correct demo data', () => {
      const validData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        company: 'Demo Corp',
      };

      const result = leadDemoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('leadContactSchema', () => {
    it('should validate correct contact data', () => {
      const validData = {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        industry: 'Energy',
        need: 'Looking for testing solutions',
        timeline: '1-3 months',
      };

      const result = leadContactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should require need field', () => {
      const invalidData = {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
      };

      const result = leadContactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('downloadSchema', () => {
    it('should validate correct download data', () => {
      const validData = {
        resourceSlug: 'test-resource',
        resourceType: 'datasheet' as const,
        email: 'user@example.com',
      };

      const result = downloadSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate resourceType enum', () => {
      const invalidData = {
        resourceSlug: 'test-resource',
        resourceType: 'invalid-type',
      };

      const result = downloadSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('newsletterSchema', () => {
    it('should validate correct newsletter data', () => {
      const validData = {
        email: 'subscriber@example.com',
        source: 'homepage',
      };

      const result = newsletterSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});

