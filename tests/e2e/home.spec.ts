// Hero (LCP, video con pausa, frase), motor de movimiento y respaldo con reduced-motion.
import { expect, test } from '@playwright/test';

test.describe('con movimiento', () => {
  test('el póster del hero carga primero (LCP)', async ({ page }) => {
    await page.goto('');
    const poster = page.locator('img.hero__poster, .hero__poster img').first();
    await expect(poster).toHaveAttribute('fetchpriority', 'high');
    await expect(poster).toHaveAttribute('loading', 'eager');
    await expect(page.locator('[data-hero-video]')).toHaveAttribute('preload', 'none');
  });

  test('el video se puede pausar y reanudar (WCAG 2.2.2)', async ({ page }) => {
    await page.goto('');
    const video = page.locator('[data-hero-video]');
    const h264 = await video.evaluate((v: HTMLVideoElement) => v.canPlayType('video/mp4; codecs="avc1.42E01E"'));
    test.skip(!h264, 'Este navegador no reproduce H.264');

    const boton = page.locator('[data-video-toggle]');
    await expect(video).toHaveClass(/is-playing/);
    await expect(boton).toHaveAttribute('data-estado', 'reproduciendo');
    await boton.click();
    await expect(boton).toHaveAttribute('data-estado', 'pausa');
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await boton.click();
    await expect(boton).toHaveAttribute('data-estado', 'reproduciendo');
  });

  test('el motor arranca sin el respaldo y revela todas las secciones', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('html')).toHaveClass(/motion-ready/);
    await expect(page.locator('html')).not.toHaveClass(/motion-fallback/);

    const alto = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= alto; y += 400) {
      await page.evaluate((destino) => window.scrollTo(0, destino), y);
      await page.waitForTimeout(60);
    }
    await expect(page.locator('[data-reveal]:not(.is-in), [data-panel]:not(.is-in)')).toHaveCount(0);
  });
});

test.describe('con reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('sin video, sin rotación y todo visible', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('[data-hero-video]')).not.toHaveAttribute('src', /.+/);
    await expect(page.locator('[data-video-toggle]')).toBeHidden();
    const frase = page.locator('[data-rota]');
    await expect(frase).toHaveText((await frase.getAttribute('data-completa')) ?? '');

    const ocultos = await page.evaluate(
      () =>
        [...document.querySelectorAll('[data-reveal], [data-panel], [data-barra]')].filter((el) => {
          const estilo = getComputedStyle(el);
          return estilo.opacity === '0' || estilo.visibility === 'hidden';
        }).length,
    );
    expect(ocultos).toBe(0);
  });
});
