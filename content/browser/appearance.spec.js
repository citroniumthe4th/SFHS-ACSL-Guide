const { test, expect } = require('@playwright/test');

// The motion control lives in the accessibility menu now, alongside the other four.
const openA11y = async (page) => {
  await page.locator('#a11y > summary').click();
  await expect(page.locator('.a11y-menu')).toBeVisible();
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
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.ambient span')).animationPlayState)).toBe('paused');

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
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark theme', exact: true }).click();
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
