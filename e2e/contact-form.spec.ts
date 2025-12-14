import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.getByText('Contact Us')).toBeVisible();
    // Check for Industry label or select element
    const industryLabel = page.locator('label').filter({ hasText: 'Industry' });
    await expect(industryLabel.first()).toBeVisible();
  });

  test('should navigate through form steps', async ({ page }) => {
    // Step 1: Select industry using the ID selector
    const industrySelect = page.locator('#industry-select');
    await expect(industrySelect).toBeVisible({ timeout: 5000 });
    await industrySelect.selectOption('Aviation');
    
    // Find Next button within the form
    const form = page.locator('form').first();
    const nextButton1 = form.getByRole('button', { name: /^Next$/i });
    await nextButton1.click();

    // Step 2: Enter details - wait for step transition
    await expect(page.getByText('Details')).toBeVisible({ timeout: 5000 });
    const needTextarea = page.locator('#need-textarea');
    await expect(needTextarea).toBeVisible({ timeout: 5000 });
    await needTextarea.fill('Need testing equipment for aviation applications');
    
    const timelineSelect = page.locator('#timeline-select');
    await expect(timelineSelect).toBeVisible({ timeout: 5000 });
    await timelineSelect.selectOption('1-3 months');
    
    // Click Next on step 2
    const nextButton2 = form.getByRole('button', { name: /^Next$/i });
    await nextButton2.click();

    // Step 3: Contact information - wait for step to be visible
    await expect(page.getByRole('heading', { name: 'Contact', exact: true })).toBeVisible({ timeout: 5000 });
    
    // Wait for form fields to render using specific IDs
    const firstNameField = page.locator('#firstName-input');
    await expect(firstNameField).toBeVisible({ timeout: 5000 });
    await firstNameField.fill('John');
    
    const lastNameField = page.locator('#lastName-input');
    await expect(lastNameField).toBeVisible({ timeout: 5000 });
    await lastNameField.fill('Doe');
    
    const emailField = page.locator('#email-input');
    await expect(emailField).toBeVisible({ timeout: 5000 });
    await emailField.fill('john@example.com');
    
    const phoneField = page.locator('#phone-input');
    await expect(phoneField).toBeVisible({ timeout: 5000 });
    await phoneField.fill('+1234567890');
    
    const companyField = page.locator('#company-input');
    await expect(companyField).toBeVisible({ timeout: 5000 });
    await companyField.fill('Test Corp');
  });

  test('should validate required fields', async ({ page }) => {
    // Try to proceed without filling required fields
    const form = page.locator('form').first();
    const nextButton = form.getByRole('button', { name: /^Next$/i });
    await nextButton.click();
    
    // Should still be on step 1 because industry is required
    const industrySelect = page.locator('#industry-select');
    await expect(industrySelect).toBeVisible({ timeout: 5000 });
    // Verify we're still on step 1 by checking the step title
    await expect(page.getByRole('heading', { name: 'Industry', exact: true })).toBeVisible();
    
    // Now select industry and try step 2 validation
    await industrySelect.selectOption('Aviation');
    await nextButton.click();
    
    // Should be on step 2 now
    await expect(page.getByText('Details')).toBeVisible({ timeout: 5000 });
    
    // Try to proceed without filling step 2 required fields
    const nextButton2 = form.getByRole('button', { name: /^Next$/i });
    await nextButton2.click();
    
    // Should still be on step 2
    await expect(page.getByText('Details')).toBeVisible({ timeout: 5000 });
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText(/Address/i)).toBeVisible();
    await expect(page.getByText(/Phone/i)).toBeVisible();
    await expect(page.getByText(/Email/i)).toBeVisible();
  });
});

