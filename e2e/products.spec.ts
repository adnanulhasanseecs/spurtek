import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should load products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveTitle(/Spurtek/);
    await expect(page.getByText('Our Products')).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    await page.goto('/products');
    
    // Should have at least one product card
    const productCards = page.locator('[class*="card"]');
    await expect(productCards.first()).toBeVisible();
  });

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/products');
    
    // Click on first product
    const firstProductLink = page.getByRole('link', { name: /View Details/i }).first();
    await firstProductLink.click();
    
    // Should be on product detail page
    await expect(page).toHaveURL(/.*products\/.*/);
    // Check for Request Quote link in main content area
    await expect(page.getByRole('main').getByRole('link', { name: /Request Quote/i })).toBeVisible();
  });

  test('should have search and filter inputs', async ({ page }) => {
    await page.goto('/products');
    
    const searchInput = page.getByPlaceholder(/Search products/i);
    await expect(searchInput).toBeVisible();
    
    // Should have category and industry filters
    const selects = page.locator('select');
    await expect(selects).toHaveCount(2);
  });
});

