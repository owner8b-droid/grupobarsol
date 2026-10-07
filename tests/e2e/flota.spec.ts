// Flota y fichas: filtro por tipo con conteo y ?tipo= (lista cerrada), enlaces de cada tarjeta y galería de la ficha.
import { expect, test, type Page } from '@playwright/test';

const tarjetas = (page: Page) => page.locator('[data-unidad-tipo]:visible');
const filtro = (page: Page) => page.getByRole('group', { name: 'Tipo' });

test('el filtro por tipo muestra solo ese tipo, anuncia el conteo y lo deja en la URL', async ({ page }) => {
  await page.goto('flota/');
  await expect(tarjetas(page)).toHaveCount(4);
  await expect(page.locator('[data-conteo]')).toHaveText('4 máquinas');

  await filtro(page).getByRole('radio', { name: 'Excavadoras' }).check();
  await expect(tarjetas(page)).toHaveCount(1);
  await expect(page.locator('[data-conteo]')).toHaveText('1 excavadora');
  await expect(page).toHaveURL(/[?&]tipo=excavadora\b/);

  await filtro(page).getByRole('radio', { name: 'Todas' }).check();
  await expect(tarjetas(page)).toHaveCount(4);
  await expect(page).not.toHaveURL(/tipo=/);
});

test('?tipo= precarga el filtro solo con tipos de la lista', async ({ page }) => {
  await page.goto('flota/?tipo=vagoneta');
  await expect(filtro(page).getByRole('radio', { name: 'Vagonetas' })).toBeChecked();
  await expect(tarjetas(page)).toHaveCount(1);
  await expect(tarjetas(page).getByRole('heading')).toHaveText('Vagoneta');

  await page.goto(`flota/?tipo=${encodeURIComponent('"><script>')}`);
  await expect(filtro(page).getByRole('radio', { name: 'Todas' })).toBeChecked();
  await expect(tarjetas(page)).toHaveCount(4);
});

test('desde el alquiler, un tipo de máquina abre la flota ya filtrada', async ({ page }) => {
  await page.goto('servicios/alquiler-de-maquinaria/');
  await page.getByRole('list', { name: 'Tipos de máquina' }).getByRole('link', { name: 'Niveladoras' }).click();
  await expect(page).toHaveURL(/flota\/\?tipo=niveladora/);
  await expect(filtro(page).getByRole('radio', { name: 'Niveladoras' })).toBeChecked();
  await expect(tarjetas(page)).toHaveCount(1);
});

test('cada tarjeta cotiza su tipo de máquina y abre su ficha', async ({ page }) => {
  await page.goto('flota/');
  const excavadora = page.locator('[data-unidad-tipo="excavadora"]');
  await expect(excavadora.getByRole('link', { name: 'Cotizar esta máquina (Excavadora)' })).toHaveAttribute(
    'href',
    /cotizador\/\?servicio=alquiler&maquina=excavadora$/,
  );
  await excavadora.getByRole('link', { name: 'Ver ficha de Excavadora' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Excavadora');
  await expect(page.getByRole('link', { name: 'Cotizar esta máquina' })).toHaveAttribute('href', /maquina=excavadora$/);
});

test('la galería de la ficha cambia la foto con las miniaturas', async ({ page }) => {
  await page.goto('flota/excavadora-1/');
  const galeria = page.getByRole('region', { name: 'Fotos de la unidad' });
  const fotos = galeria.locator('[data-foto]');
  await expect(fotos.nth(0)).toBeVisible();
  await expect(fotos.nth(1)).toBeHidden();
  await expect(galeria.getByRole('button', { name: 'Ver foto 1 de 3' })).toHaveAttribute('aria-pressed', 'true');

  await galeria.getByRole('button', { name: 'Ver foto 2 de 3' }).click();
  await expect(fotos.nth(1)).toBeVisible();
  await expect(fotos.nth(0)).toBeHidden();
  await expect(galeria.getByRole('button', { name: 'Ver foto 2 de 3' })).toHaveAttribute('aria-pressed', 'true');
  await expect(galeria.getByRole('button', { name: 'Ver foto 1 de 3' })).toHaveAttribute('aria-pressed', 'false');
  await expect(galeria.locator('[data-galeria-texto]')).toHaveText('Foto 2 de 3');
  await expect(fotos.nth(1).getByRole('img')).toHaveAccessibleName('Excavadora sobre una carreta durante un traslado nocturno');
});
