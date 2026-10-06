// Ayudas del pre-cotizador de 5 pasos, compartidas por las pruebas e2e y las de accesibilidad.
import { expect, type Page } from '@playwright/test';

export const asistente = (page: Page) => page.locator('form[data-cotizador]');
export const titulo = (page: Page) => asistente(page).locator('fieldset:not([hidden]) .paso__titulo');
export const seguir = (page: Page) => asistente(page).getByRole('button', { name: 'Seguir', exact: true });

/** Recorre los cuatro pasos con datos válidos y deja el asistente en el resumen. */
export async function hastaElResumen(page: Page) {
  const f = asistente(page);
  await f.getByRole('radio', { name: /^Movimiento de tierras/ }).check();
  await seguir(page).click();
  await f.getByRole('radio', { name: 'Conformación de terraza' }).check();
  await f.getByLabel('Tamaño aproximado del terreno').fill('800 m²');
  await seguir(page).click();
  await f.getByLabel('¿Dónde es la obra?').fill('Paraíso');
  await f.getByRole('radio', { name: 'Este mes' }).check();
  await seguir(page).click();
  await f.getByLabel('Nombre').fill('Ana Solano');
  await f.getByLabel('Teléfono o WhatsApp').fill('8880 8799');
  await f.getByRole('checkbox').check();
  await seguir(page).click();
  await expect(titulo(page)).toHaveText('Revisá tu pre-cotización');
  return f;
}
