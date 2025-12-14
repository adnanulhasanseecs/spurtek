import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Spurtek/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Industrial Test Systems/i })).toBeVisible();
  });

  test('should have working CTAs', async ({ page }) => {
    await page.goto('/');

    // Check Request Quote button (use first one in hero section)
    const quoteButton = page.getByRole('link', { name: /Request Quote/i }).first();
    await expect(quoteButton).toBeVisible();
    await expect(quoteButton).toHaveAttribute('href', expect.stringContaining('/contact'));

    // Check Book Demo button
    const demoButton = page.getByRole('link', { name: /Book Demo/i });
    await expect(demoButton).toBeVisible();
    await expect(demoButton).toHaveAttribute('href', expect.stringContaining('/contact'));

    // Check Download Brochure button
    const downloadButton = page.getByRole('link', { name: /Download Brochure/i });
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveAttribute('href', expect.stringContaining('/resources'));
  });

  test('should display industries section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Industries We Serve')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aviation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Energy' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Automotive' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Manufacturing' })).toBeVisible();
  });

  test('should display featured products', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Featured Products')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Click Products link in navigation (first one)
    await page.getByRole('link', { name: 'Products' }).first().click();
    await expect(page).toHaveURL(/.*products/);

    // Navigate back and test another link
    await page.goto('/');
    // Use navigation link specifically
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/);
  });
});

