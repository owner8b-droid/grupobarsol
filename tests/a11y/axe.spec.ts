// axe-core con WCAG 2.2 AA en cada ruta, en el menú abierto y con errores de formulario visibles.
// Con reduced-motion todo el contenido está visible desde el inicio: axe evalúa el estado final.
// Un 0 aquí no reemplaza las pruebas manuales (teclado, lector de pantalla, zoom): BRIEF.md §10.2.
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { nombre, RUTAS } from '../rutas';

test.use({ reducedMotion: 'reduce' });

const ETIQUETAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const analizar = (page: Page) => new AxeBuilder({ page }).withTags(ETIQUETAS).analyze();
const resumen = (v: Awaited<ReturnType<typeof analizar>>['violations']) =>
  v.map((x) => `${x.id} (${x.impact}): ${x.nodes.map((n) => n.target.join(' ')).join(' | ')}`);

for (const ruta of [...RUTAS, 'sistema/']) {
  test(`${nombre(ruta)}: sin violaciones de axe`, async ({ page }) => {
    await page.goto(ruta);
    const { violations } = await analizar(page);
    expect(resumen(violations)).toEqual([]);
  });
}

test('menú móvil abierto: sin violaciones', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) >= 1024, 'El menú solo existe por debajo de 64rem');
  await page.goto('');
  await page.locator('[data-menu-abrir]').click();
  const { violations } = await analizar(page);
  expect(resumen(violations)).toEqual([]);
});

test('formulario con errores visibles: sin violaciones', async ({ page }) => {
  await page.goto('#cotizar');
  await page.locator('#cotizar form').getByRole('button', { name: /Enviar/ }).click();
  await expect(page.locator('#c-nombre')).toHaveAttribute('aria-invalid', 'true');
  const { violations } = await analizar(page);
  expect(resumen(violations)).toEqual([]);
});
