// Cada ruta responde, tiene un solo H1, metadatos básicos, sin errores de consola ni scroll horizontal.
import { expect, test } from '@playwright/test';
import { nombre, RUTAS } from '../rutas';

for (const ruta of RUTAS) {
  test(`${nombre(ruta)}: responde con H1, metadatos y sin desbordes`, async ({ page }) => {
    const errores: string[] = [];
    page.on('pageerror', (e) => errores.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errores.push(m.text());
    });

    const respuesta = await page.goto(ruta);
    expect(respuesta?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Grupo Barsol/);

    const descripcion = await page.locator('meta[name="description"]').getAttribute('content');
    expect(descripcion?.length ?? 0).toBeGreaterThan(50);
    expect(descripcion?.length ?? 0).toBeLessThanOrEqual(160);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/.+\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', /^es/);
    // La build normal es indexable; solo la preview publicada lleva noindex (PUBLIC_PREVIEW, ADR-013)
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

    const desborde = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(desborde).toBeLessThanOrEqual(0);
    expect(errores).toEqual([]);
  });
}

test('una ruta inexistente responde 404 con su página', async ({ page }) => {
  const respuesta = await page.goto('no-existe/');
  expect(respuesta?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
