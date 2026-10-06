// Sin JS el contenido está completo: nada queda oculto por el motor, la navegación se ve
// y la pre-cotización ofrece la salida directa a WhatsApp.
import { expect, test } from '@playwright/test';
import { nombre, RUTAS } from '../rutas';

test.use({ javaScriptEnabled: false });

for (const ruta of RUTAS) {
  test(`${nombre(ruta)}: contenido visible sin JS`, async ({ page }) => {
    await page.goto(ruta);
    await expect(page.locator('html')).not.toHaveClass(/\bjs\b/);
    await expect(page.locator('header nav[aria-label]')).toBeVisible();
    const ocultos = await page.evaluate(
      () =>
        [...document.querySelectorAll('[data-reveal], [data-panel], [data-barra], [data-split]')].filter((el) => {
          const estilo = getComputedStyle(el);
          return estilo.opacity === '0' || estilo.visibility === 'hidden';
        }).length,
    );
    expect(ocultos).toBe(0);
  });
}

test('la pre-cotización sin JS ofrece WhatsApp directo', async ({ page }) => {
  await page.goto('#cotizar');
  await expect(page.locator('#cotizar form')).toBeHidden();
  await expect(page.locator('#cotizar .cotiza__sin-js').getByRole('link', { name: 'Escribinos por WhatsApp' })).toHaveAttribute('href', /^https:\/\/wa\.me\//);
});
