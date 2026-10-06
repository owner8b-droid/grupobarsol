// Pre-cotización del home: validación accesible, salida a WhatsApp con el resumen y honeypot.
import { expect, test, type Page } from '@playwright/test';

// window.open se reemplaza para leer la URL de WhatsApp sin abrir pestañas
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as Window & { __abiertos?: string[] };
    w.__abiertos = [];
    window.open = (url?: string | URL) => {
      w.__abiertos!.push(String(url));
      return null;
    };
  });
  await page.goto('#cotizar');
});

const abiertos = (page: Page) => page.evaluate(() => (window as Window & { __abiertos?: string[] }).__abiertos ?? []);

async function llenar(page: Page) {
  const form = page.locator('#cotizar form');
  await form.getByLabel('Nombre').fill('Ana Solano');
  await form.getByLabel('Teléfono o WhatsApp').fill('8888 8888');
  await form.getByLabel('¿Qué necesitás?').selectOption('Alquiler de maquinaria');
  await form.getByLabel(/Dónde es la obra/).fill('Paraíso');
  await form.getByRole('checkbox').check();
  return form;
}

test('sin datos no envía y marca los campos con aria-invalid', async ({ page }) => {
  const form = page.locator('#cotizar form');
  await form.getByRole('button', { name: /Enviar/ }).click();
  await expect(form.getByLabel('Nombre')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel('Teléfono o WhatsApp')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel('Nombre')).toHaveAccessibleDescription('Escribí tu nombre.');
  expect(await abiertos(page)).toEqual([]);

  // Al corregir, el campo deja de anunciarse como inválido
  await form.getByLabel('Nombre').fill('Ana');
  await expect(form.getByLabel('Nombre')).not.toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel('Nombre')).toHaveAccessibleDescription('');
});

test('con datos válidos abre WhatsApp con el resumen y confirma', async ({ page }) => {
  const form = await llenar(page);
  await form.getByRole('button', { name: /Enviar/ }).click();

  const [url] = await abiertos(page);
  expect(url).toMatch(/^https:\/\/wa\.me\/506\d{8}\?text=/);
  const texto = decodeURIComponent(new URL(url).searchParams.get('text') ?? '');
  expect(texto).toContain('Ana Solano');
  expect(texto).toContain('Alquiler de maquinaria');
  expect(texto).toContain('Paraíso');

  const confirmacion = form.locator('[data-confirmacion]');
  await expect(confirmacion).toBeVisible();
  await expect(confirmacion).toContainText('¡Listo, Ana Solano!');
  await expect(confirmacion.getByRole('link')).toHaveAttribute('href', url);
});

test('si el honeypot viene lleno se descarta en silencio', async ({ page }) => {
  const form = await llenar(page);
  await form.locator('[data-trampa]').evaluate((el: HTMLInputElement) => (el.value = 'bot'));
  await form.getByRole('button', { name: /Enviar/ }).click();
  expect(await abiertos(page)).toEqual([]);
  await expect(form.locator('[data-confirmacion]')).toBeHidden();
});

test('acepta el teléfono en formato tico y rechaza solo espacios', async ({ page }) => {
  const form = await llenar(page);
  const telefono = form.getByLabel('Teléfono o WhatsApp');
  for (const valido of ['8880-8799', '+506 8880-8799', '(506) 8880 8799']) {
    await telefono.fill(valido);
    expect(await telefono.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(true);
  }
  await telefono.fill('        ');
  await form.getByRole('button', { name: /Enviar/ }).click();
  await expect(telefono).toHaveAttribute('aria-invalid', 'true');
  await expect(telefono).toBeFocused();
  expect(await abiertos(page)).toEqual([]);
  await telefono.fill('8880-8799');
  await form.getByRole('button', { name: /Enviar/ }).click();
  expect((await abiertos(page))[0]).toContain('8880-8799');
});

test('sin consentimiento muestra su mensaje y no envía', async ({ page }) => {
  const form = await llenar(page);
  await form.getByRole('checkbox').uncheck();
  await form.getByRole('button', { name: /Enviar/ }).click();
  await expect(form.getByRole('checkbox')).toBeFocused();
  await expect(form.getByText('Necesitamos tu permiso para usar estos datos.')).toBeVisible();
  await expect(form.getByRole('checkbox')).toHaveAccessibleDescription('Necesitamos tu permiso para usar estos datos.');
  expect(await abiertos(page)).toEqual([]);
});

test('sin datos, el foco va al primer campo con error', async ({ page }) => {
  const form = page.locator('#cotizar form');
  await form.getByRole('button', { name: /Enviar/ }).click();
  await expect(form.getByLabel('Nombre')).toBeFocused();
});

test('el servicio se precarga desde la URL (lista cerrada)', async ({ page }) => {
  await page.goto('contacto/?servicio=obra#cotizar');
  await expect(page.locator('#c-servicio')).toHaveValue('Obra civil');
  await page.goto('contacto/?servicio=<script>#cotizar');
  await expect(page.locator('#c-servicio')).toHaveValue('');
});

