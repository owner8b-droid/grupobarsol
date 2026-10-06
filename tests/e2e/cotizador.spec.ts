// Pre-cotizador de 5 pasos (lib/cotizador.ts): camino feliz hasta WhatsApp, validación por paso, Enter, historial
// del navegador, precarga desde la URL contra listas cerradas, restauración desde sessionStorage y foco a la vista.
import { expect, test, type Page } from '@playwright/test';
import { asistente, hastaElResumen, seguir, titulo } from '../cotizador';

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
});

const abiertos = (page: Page) => page.evaluate(() => (window as Window & { __abiertos?: string[] }).__abiertos ?? []);

test('camino feliz: cinco pasos, resumen y WhatsApp con el mensaje armado', async ({ page }) => {
  await page.goto('cotizador/');
  await expect(titulo(page)).toHaveText('¿Qué necesitás?');
  await expect(asistente(page).locator('[data-atras]')).toBeHidden();

  const f = await hastaElResumen(page);
  await expect(page).toHaveURL(/[?&]paso=5\b/);
  await expect(titulo(page)).toBeFocused();
  // En el resumen no hay Atrás ni Seguir: cada fila tiene «Editar»
  await expect(f.locator('[data-navegacion]')).toBeHidden();
  await expect(f.locator('[data-resumen="detalle"]')).toHaveText('Conformación de terraza · 800 m²');
  await expect(f.locator('[data-resumen="contacto"]')).toHaveText('Ana Solano · 8880 8799');

  await f.getByRole('button', { name: 'Enviar y seguir por WhatsApp' }).click();
  const [url] = await abiertos(page);
  expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  expect(new URL(url).searchParams.get('text')).toBe(
    [
      'Hola, Grupo Barsol. Quiero una pre-cotización:',
      '• Servicio: Movimiento de tierras',
      '• Detalle: Conformación de terraza · 800 m²',
      '• Lugar: Paraíso',
      '• Para: Este mes',
      '• Nombre: Ana Solano · 8880 8799',
    ].join('\n'),
  );
  const confirmacion = f.locator('[data-confirmacion]');
  await expect(confirmacion).toBeVisible();
  await expect(confirmacion).toBeFocused();
  await expect(confirmacion).toContainText('¡Listo, Ana Solano!');
  await expect(confirmacion.getByRole('link')).toHaveAttribute('href', url);
});

test('cada paso valida antes de seguir, con el error junto al grupo o al campo', async ({ page }) => {
  await page.goto('cotizador/');
  const f = asistente(page);
  await seguir(page).click();
  await expect(titulo(page)).toHaveText('¿Qué necesitás?');
  await expect(f.locator('#error-servicio')).toBeVisible();
  await expect(f.getByRole('radiogroup', { name: '¿Qué necesitás?' })).toHaveAttribute('aria-invalid', 'true');
  await expect(f.getByRole('radio').first()).toBeFocused();

  // Elegir borra el error; «No estoy seguro» pide contar el proyecto
  await f.getByRole('radio', { name: /^No estoy seguro/ }).check();
  await expect(f.locator('#error-servicio')).toBeHidden();
  await seguir(page).click();
  const proyecto = f.getByLabel('Contanos tu proyecto');
  await proyecto.fill('Una casa');
  await seguir(page).click();
  await expect(proyecto).toHaveAttribute('aria-invalid', 'true');
  await expect(proyecto).toBeFocused();
  await proyecto.fill('Una casa de dos pisos con planos listos');
  await expect(proyecto).not.toHaveAttribute('aria-invalid', 'true');
  await seguir(page).click();

  // Un lugar con solo espacios no cuenta, y falta elegir para cuándo
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');
  const lugar = f.getByLabel('¿Dónde es la obra?');
  await lugar.fill('   ');
  await seguir(page).click();
  await expect(lugar).toHaveAttribute('aria-invalid', 'true');
  await expect(lugar).toHaveAccessibleDescription('Contanos dónde es la obra.');
  await expect(f.locator('#error-cuando')).toBeVisible();
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');
});

test('Enter en una opción o en un campo valida el paso y avanza, sin adelantar errores', async ({ page }) => {
  await page.goto('cotizador/');
  const f = asistente(page);
  const obra = f.getByRole('radio', { name: /^Obra civil/ });
  await obra.check();
  await obra.press('Enter');
  await expect(titulo(page)).toHaveText('Detalles');
  await expect(f.locator('.paso__error:not([hidden])')).toHaveCount(0);

  await f.getByRole('radio', { name: 'Urbanización' }).check();
  await f.getByLabel('¿En qué etapa está?').press('Enter');
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');
  expect(await abiertos(page)).toEqual([]);
});

test('atrás y adelante del navegador recorren los pasos', async ({ page }) => {
  await page.goto('cotizador/');
  const f = asistente(page);
  await f.getByRole('radio', { name: /^Alquiler de maquinaria/ }).check();
  await seguir(page).click();
  await f.getByRole('radio', { name: 'Excavadora' }).check();
  await seguir(page).click();
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');

  await page.goBack();
  await expect(titulo(page)).toHaveText('Detalles');
  await expect(page).toHaveURL(/[?&]paso=2\b/);
  await page.goBack();
  await expect(titulo(page)).toHaveText('¿Qué necesitás?');
  await page.goForward();
  await expect(titulo(page)).toHaveText('Detalles');
  await expect(f.getByRole('radio', { name: 'Excavadora' })).toBeChecked();

  await f.getByRole('button', { name: 'Atrás' }).click();
  await expect(titulo(page)).toHaveText('¿Qué necesitás?');
});

test('precarga ?maquina= y ?servicio= solo con valores de las listas, y deja la URL limpia', async ({ page }) => {
  await page.goto('cotizador/?maquina=niveladora');
  const f = asistente(page);
  await expect(f.getByRole('radio', { name: /^Alquiler de maquinaria/ })).toBeChecked();
  await expect(page).not.toHaveURL(/maquina=/);
  await seguir(page).click();
  await expect(f.getByRole('radio', { name: 'Niveladora' })).toBeChecked();

  // Lo precargado sobrevive a una recarga aunque todavía no se haya tocado nada
  await page.reload();
  await expect(f.getByRole('radio', { name: 'Niveladora' })).toBeChecked();

  // Valores fuera de las listas se ignoran
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(`cotizador/?servicio=${encodeURIComponent('"]<script>')}&maquina=grua`);
  await expect(titulo(page)).toHaveText('¿Qué necesitás?');
  await expect(f.getByRole('radio', { checked: true })).toHaveCount(0);

  await page.goto('cotizador/?servicio=acarreo');
  await expect(f.getByRole('radio', { name: /^Acarreo o agregados/ })).toBeChecked();
});

test('al recargar no se pierde lo escrito y no se saltan pasos incompletos', async ({ page }) => {
  await page.goto('cotizador/');
  const f = asistente(page);
  await f.getByRole('radio', { name: /^Obra civil/ }).check();
  await seguir(page).click();
  await f.getByRole('radio', { name: 'Cimentación' }).check();
  await f.getByLabel('¿En qué etapa está?').fill('Con planos');
  await seguir(page).click();
  await f.getByLabel('¿Dónde es la obra?').fill('Cachí');

  await page.reload();
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');
  await expect(f.getByLabel('¿Dónde es la obra?')).toHaveValue('Cachí');

  // Pedir el resumen con el paso 3 incompleto deja en el paso 3
  await page.goto('cotizador/?paso=5');
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');
});

test('«Editar» en el resumen lleva al paso y el cambio se ve al volver', async ({ page }) => {
  await page.goto('cotizador/');
  const f = await hastaElResumen(page);
  await f.getByRole('button', { name: 'Editar lugar' }).click();
  await expect(titulo(page)).toHaveText('¿Dónde y cuándo?');
  await f.getByLabel('¿Dónde es la obra?').fill('Orosi');
  await seguir(page).click();
  await seguir(page).click();
  await expect(f.locator('[data-resumen="lugar"]')).toHaveText('Orosi');
});

test('si el campo trampa viene lleno (bot), no abre WhatsApp', async ({ page }) => {
  await page.goto('cotizador/');
  const f = await hastaElResumen(page);
  await page.evaluate(() => ((document.getElementById('cz-sitio') as HTMLInputElement).value = 'spam'));
  await f.getByRole('button', { name: 'Enviar y seguir por WhatsApp' }).click();
  expect(await abiertos(page)).toEqual([]);
  await expect(f.locator('[data-confirmacion]')).toBeHidden();
});

test('al cambiar de paso, el título enfocado queda a la vista y no bajo el encabezado (WCAG 2.4.11)', async ({ page }) => {
  await page.goto('cotizador/');
  const f = asistente(page);
  await f.getByRole('radio', { name: /^Movimiento de tierras/ }).check();
  await seguir(page).scrollIntoViewIfNeeded();
  await seguir(page).click();
  await expect(titulo(page)).toBeFocused();
  await expect(titulo(page)).toBeInViewport();
  const { arriba, encabezado } = await page.evaluate(() => ({
    arriba: document.activeElement!.getBoundingClientRect().top,
    encabezado: document.querySelector('.encabezado')!.getBoundingClientRect().bottom,
  }));
  expect(arriba).toBeGreaterThanOrEqual(encabezado);
});
