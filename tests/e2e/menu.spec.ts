// Menú móvil en <dialog> modal: foco, Escape, botón cerrar y clic fuera.
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) >= 1024, 'El menú solo existe por debajo de 64rem');
  await page.goto('servicios/');
});

test('abre como modal, enfoca el cierre y Escape devuelve el foco', async ({ page }) => {
  const abrir = page.locator('[data-menu-abrir]');
  const menu = page.locator('#menu');
  await abrir.click();
  await expect(menu).toBeVisible();
  expect(await menu.evaluate((d) => d.matches(':modal'))).toBe(true);
  await expect(page.locator('[data-menu-cerrar]')).toBeFocused();
  await expect(menu.locator('a[aria-current="page"]')).toHaveText('Servicios');

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(abrir).toBeFocused();
});

test('se cierra con el botón y un enlace navega', async ({ page }) => {
  const menu = page.locator('#menu');
  await page.locator('[data-menu-abrir]').click();
  await page.locator('[data-menu-cerrar]').click();
  await expect(menu).toBeHidden();

  await page.locator('[data-menu-abrir]').click();
  await menu.getByRole('link', { name: 'Flota' }).click();
  await expect(page).toHaveURL(/\/flota\/$/);
});
