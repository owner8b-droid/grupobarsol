// Hero (LCP, video con pausa, frase), motor de movimiento y respaldo con reduced-motion.
import { expect, test } from '@playwright/test';

test('las pre-cotizaciones de la home bajan al formulario, ninguna a una página en construcción', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('.hero__acciones').getByRole('link', { name: 'Pre-cotizá tu obra' })).toHaveAttribute('href', '#cotizar');
  await expect(page.locator('main a[href*="/cotizador/"]')).toHaveCount(0);
});

test.describe('con movimiento', () => {
  test('la frase del hero se detiene en el lema completo antes de 5 s (WCAG 2.2.2)', async ({ page }) => {
    await page.goto('');
    const frase = page.locator('[data-rota]');
    await expect(frase).toHaveText((await frase.getAttribute('data-completa')) ?? '', { timeout: 5_000 });
    await page.waitForTimeout(3000);
    await expect(frase).toHaveText((await frase.getAttribute('data-completa')) ?? '');
  });

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
    // canPlayType puede decir "maybe" y aun así fallar (navegadores de Playwright en Linux sin H.264):
    // se espera la reproducción real y, si no llega, el test se salta con el motivo.
    const reproduce = await video.evaluate(
      (v: HTMLVideoElement) =>
        new Promise<boolean>((listo) => {
          if (!v.paused && v.readyState > 2) return listo(true);
          v.addEventListener('playing', () => listo(true), { once: true });
          setTimeout(() => listo(false), 8000);
        }),
    );
    test.skip(!reproduce, 'Este navegador no reproduce el MP4 (H.264)');

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
    await expect(
      page.locator('[data-reveal]:not(.is-in), [data-cortina]:not(.is-in), [data-barra]:not(.is-in), [data-split]:not(.is-in)'),
    ).toHaveCount(0);
    // Los títulos subieron con máscara y quedaron en su lugar
    await expect(page.locator('#tierra .linea-mask')).toHaveCount(1);
    await expect(page.locator('#tierra .linea')).toHaveCSS('transform', /none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });
});

test.describe('con movimiento, sin hacer scroll', () => {
  test('el teclado y los lectores de pantalla alcanzan lo que todavía no se reveló', async ({ page, browserName }) => {
    await page.goto('');
    await expect(page.locator('html')).toHaveClass(/motion-ready/);
    // Los títulos de sección siguen en el árbol de accesibilidad antes de entrar en pantalla
    for (const nombre of ['Tierra', 'Maquinaria', 'Obra', 'Equipo', 'Proyectos', 'Cotizá']) {
      await expect(page.getByRole('heading', { level: 2, name: nombre, exact: true })).toBeAttached();
    }
    // Con Tab se llega a los enlaces de 01 · Tierra, y al enfocarlos la sección se revela
    const enlace = page.locator('#tierra').getByRole('link', { name: 'Movimiento de tierras' });
    // Safari no recorre enlaces con Tab por defecto (es Opción+Tab), y el WebKit de Playwright hace lo mismo
    const tecla = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
    for (let i = 0; i < 25 && !(await enlace.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press(tecla);
    }
    await expect(enlace).toBeFocused();
    // Margen amplio: en CI corren cuatro navegadores en paralelo y la entrada dura 1,1 s
    await expect(page.locator('#tierra [data-reveal]').first()).toHaveClass(/is-in/, { timeout: 10_000 });
  });
});

test.describe('con red lenta', () => {
  test('si se baja antes de que llegue el motor, nada queda en blanco', async ({ page }) => {
    // El motor llega 3 s tarde: mientras tanto el contenido se ve, y al llegar no oculta lo que ya está a la vista
    await page.route(/motion\.[\w-]+\.js$/, async (route) => {
      await new Promise((listo) => setTimeout(listo, 3000));
      await route.continue();
    });
    await page.goto('');
    await page.locator('#tierra').scrollIntoViewIfNeeded();
    const ocultos = () =>
      page.evaluate(
        () =>
          [...document.querySelectorAll('#tierra [data-reveal], #tierra [data-barra], #tierra [data-split]')].filter((el) => {
            const estilo = getComputedStyle(el);
            return estilo.opacity === '0' || estilo.transform.startsWith('matrix(0');
          }).length,
      );
    expect(await ocultos()).toBe(0);
    await expect(page.locator('html')).toHaveClass(/motion-ready/, { timeout: 15_000 });
    expect(await ocultos()).toBe(0);
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
        [...document.querySelectorAll('[data-reveal], [data-panel], [data-barra], [data-split]')].filter((el) => {
          const estilo = getComputedStyle(el);
          return estilo.opacity === '0' || estilo.visibility === 'hidden';
        }).length,
    );
    expect(ocultos).toBe(0);
  });
});

test.describe('05 · Proyectos', () => {
  test('muestra dos proyectos destacados, el enlace a todos y su punto de progreso', async ({ page }) => {
    await page.goto('');
    const seccion = page.locator('#proyectos');
    await expect(seccion.getByRole('heading', { level: 2, name: 'Proyectos' })).toBeAttached();
    await expect(seccion.locator('article')).toHaveCount(2);
    await expect(seccion.locator('article').first().locator('dt')).toHaveText(['Tipo de proyecto', 'Cliente', 'Ubicación']);
    await expect(seccion.getByRole('link', { name: 'Ver todos los proyectos' })).toHaveAttribute('href', /\/proyectos\/$/);
    await expect(page.locator('[data-scrollspy] a[href="#proyectos"]')).toHaveCount(1);
  });
});
