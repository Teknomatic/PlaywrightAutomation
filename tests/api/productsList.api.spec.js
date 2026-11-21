const { test, expect } = require('@playwright/test');

test('API 1: Get All Products List', async ({ request }) => {
  const response = await request.get('/api/productsList');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/html; charset=utf-8');

  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
  expect(body.products[0]).toEqual(expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
    price: expect.any(String),
    brand: expect.any(String)
  }));
});