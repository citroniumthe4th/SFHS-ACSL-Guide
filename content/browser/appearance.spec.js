const { test, expect } = require('@playwright/test');

// The motion control lives in the accessibility menu now, alongside the other four.
const openA11y = async (page) => {
  await page.locator('#a11y > summary').click();
  await expect(page.locator('.a11y-menu')).toBeVisible();
};

// Theme moved out of a standalone toggle and into the settings menu beside the glass sliders.
const openSettings = async (page) => {
  await page.locator('#settings > summary').click();
  await expect(page.locator('.glass-menu')).toBeVisible();
};

test('background can be paused and reduced motion overrides it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/guide');
  await openA11y(page);
  await page.locator('#a11y-motion').check();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');

  await page.reload();
  await openA11y(page);
  await expect(page.locator('#a11y-motion')).toBeChecked();
  // The setting stops animation outright rather than pausing it, and reaches transitions too.
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.ambient span')).animationName)).toBe('none');
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.card')).transitionDuration)).toMatch(/^0s(, 0s)*$/);

  await page.locator('#a11y-motion').uncheck();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');

  // The system asking for it wins, and the control says so rather than pretending otherwise.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#a11y-motion')).toBeDisabled();
  await expect(page.locator('#a11y-motion')).toBeChecked();
  await expect(page.locator('#a11y-motion-note')).toHaveText(/system already asks/i);
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.ambient span')).animationName)).toBe('none');
});

test('the accessibility settings each change the page and survive a reload', async ({ page }) => {
  await page.goto('/guide');
  await openA11y(page);
  for (const [box, flag] of [['#a11y-contrast', 'data-contrast'], ['#a11y-plain', 'data-plain'],
                             ['#a11y-text', 'data-bigtext'], ['#a11y-underline', 'data-underline']]) {
    await page.locator(box).check();
    await expect(page.locator('html')).toHaveAttribute(flag, 'on');
  }
  const grew = await page.evaluate(() => getComputedStyle(document.body).fontSize);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-contrast', 'on');
  expect(await page.evaluate(() => getComputedStyle(document.body).fontSize)).toBe(grew);

  await openA11y(page);
  await page.locator('#a11y-reset').click();
  for (const flag of ['data-contrast', 'data-plain', 'data-bigtext', 'data-underline']) {
    await expect(page.locator('html')).toHaveAttribute(flag, 'off');
  }
});

test('theme persists on standalone pages and active navigation retains contrast', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/guide');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') {
      await openSettings(page);
      await page.locator('#theme-switch button[data-theme="dark"]').click();
      await page.locator('#settings > summary').click();
    }
    const ratio = await page.locator('#section-tabs a.on').evaluate(button => {
      const s = getComputedStyle(button);
      const lum = color => {
        const rgb = color.match(/[\d.]+/g).slice(0, 3).map(n => {
          const v = Number(n) / 255;
          return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
        });
        return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
      };
      const a = lum(s.color), b = lum(s.backgroundColor);
      return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    });
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }
  for (const path of ['/privacy', '/404.html']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }
});

test('wide reference tables scroll within the lesson on small phones', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto('/guide/number-systems');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const table = page.getByRole('region', { name: 'Scrollable reference table' }).first();
  await table.focus();
  await expect(table).toBeFocused();
  expect(await table.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
});

test('redesigned sections fit the viewport and preserve navigation', async ({ page }) => {
  page.on('pageerror', error => { throw error; });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/guide', '/practice', '/practice/number-systems?q=ns-01', '/exam', '/bookmarks', '/problems', '/problem/digit-chain']) {
    await page.goto(path);
    await expect(page.locator('#main h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const nav = page.locator('#section-tabs');
    await expect(nav.locator('a')).toHaveCount(5);
    // At the standard desktop and phone sizes every label should fit without hidden overflow.
    expect(await nav.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  }
});

test('the glass sliders move three separate axes and survive a reload', async ({ page }) => {
  await page.goto('/guide');
  const vars = () => page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
      alpha: cs.getPropertyValue('--glass-a').trim(),
      frost: cs.getPropertyValue('--glass-frost').trim(),
      sat: cs.getPropertyValue('--glass-sat').trim(),
      rgb: cs.getPropertyValue('--glass-rgb').trim(),
    };
  });

  // Defaults are applied before paint by appearance.js, not by this file.
  const start = await vars();
  expect(start.frost).toBe('30px');
  expect(Number(start.alpha)).toBeGreaterThan(0.5);

  await openSettings(page);
  const set = async (id, value) => {
    await page.evaluate(([i, v]) => {
      const s = document.getElementById(i);
      s.value = v;
      s.dispatchEvent(new Event('input', { bubbles: true }));
    }, [id, String(value)]);
  };

  // Transparency alone moves the alpha and leaves the blur and the tint where they were.
  await set('glass-clear', 100);
  let now = await vars();
  expect(Number(now.alpha)).toBeLessThan(Number(start.alpha));
  expect(now.frost).toBe(start.frost);
  expect(now.rgb).toBe(start.rgb);

  // Frost drives the blur and the saturation together, which is what keeps a thick material
  // from reading as flat grey.
  await set('glass-frost', 0);
  now = await vars();
  expect(now.frost).toBe('0px');
  expect(now.sat).toBe('100%');

  // Tint alone moves the colour of the material.
  await set('glass-tint', 100);
  now = await vars();
  expect(now.rgb).not.toBe(start.rgb);

  await expect(page.locator('#glass-clear-out')).toHaveText('100%');
  await expect(page.locator('#glass-frost-out')).toHaveText('0px');
  await expect(page.locator('#glass-tint-out')).toHaveText('100%');

  await page.reload();
  const kept = await vars();
  expect(kept.frost).toBe('0px');
  expect(kept.rgb).not.toBe(start.rgb);

  await openSettings(page);
  await page.locator('#glass-reset').click();
  const reset = await vars();
  expect(reset.frost).toBe(start.frost);
  expect(reset.rgb).toBe(start.rgb);
  expect(reset.alpha).toBe(start.alpha);
});

test('the two toolbar menus never stand open together', async ({ page }) => {
  await page.goto('/guide');
  await openSettings(page);
  await expect(page.locator('.a11y-menu')).toBeHidden();
  await openA11y(page);
  await expect(page.locator('.glass-menu')).toBeHidden();
  await page.keyboard.press('Escape');
  await expect(page.locator('.a11y-menu')).toBeHidden();
});

test('reduce transparency outranks the glass sliders', async ({ page }) => {
  await page.goto('/guide');
  await openSettings(page);
  await page.evaluate(() => {
    const s = document.getElementById('glass-clear');
    s.value = '100';
    s.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await openA11y(page);
  await page.locator('#a11y-plain').check();
  const bar = await page.evaluate(() => {
    const s = getComputedStyle(document.querySelector('.topbar'));
    return { filter: s.backdropFilter || s.webkitBackdropFilter, bg: s.backgroundColor };
  });
  expect(bar.filter).toBe('none');
  // A solid panel, whatever the slider was left on.
  expect(bar.bg).not.toContain('rgba');
});

test('the toolbar carries exactly one edge, whichever material is in use', async ({ page }) => {
  await page.goto('/guide');
  const edge = () => page.evaluate(() => {
    const bar = document.querySelector('.topbar');
    return {
      border: getComputedStyle(bar).borderTopWidth,
      rim: getComputedStyle(bar, '::after').display,
    };
  });

  // With the glass on, the rim is the edge and there is no border under it. A border here
  // would show as a second ring, thicker where the gradient is opaque than where it fades.
  const glass = await edge();
  expect(glass.border).toBe('0px');
  expect(glass.rim).not.toBe('none');

  // With the glass off, the rim goes and a plain border takes over, so the bar is never
  // left with no outline at all.
  await openA11y(page);
  await page.locator('#a11y-plain').check();
  const plain = await edge();
  expect(plain.border).toBe('1px');
  expect(plain.rim).toBe('none');
});
