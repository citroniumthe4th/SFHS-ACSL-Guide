const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => { throw error; });
});

test('leaving a page cancels its reset confirmation without changing saved code', async ({ page }) => {
  await page.goto('/problems');
  await page.getByRole('button', { name: 'Junior', exact: true }).click();
  await page.locator('a[href="/problem/digit-chain"]').first().click();
  await page.evaluate(() => window.__cm.setValue('print("keep my work")'));
  await page.locator('#reset').click();
  await expect(page.locator('#ask')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/problems$/);
  await expect(page.locator('#ask')).not.toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:code:digit-chain:python')))).toBe('print("keep my work")');
});

test('leaving a replacement-exam confirmation does not redirect back to the old exam', async ({ page }) => {
  await page.goto('/exam/1');
  await page.locator('#section-tabs a[href="/exam"]').click();
  await page.locator('a[href="/exam/2"]').click();
  await expect(page.locator('#ask')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#ask')).not.toBeVisible();
  await expect(page).toHaveURL(/\/exam$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:exam')).contest)).toBe(1);
});

test('keeping a saved paper restores its division instead of asking again', async ({ page }) => {
  await page.goto('/exam/1');
  await page.locator('#section-tabs a[href="/exam"]').click();
  await page.getByRole('button', { name: 'Junior', exact: true }).click();
  await page.locator('a[href="/exam/2"]').click();
  await page.locator('#ask-no').click();
  await expect(page.locator('#ask')).not.toBeVisible();
  await expect(page).toHaveURL(/\/exam\/1$/);
  await expect(page.getByRole('button', { name: 'Senior', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:exam')).division)).toBe('senior');
});

test('the exam deadline closes a pending finish confirmation', async ({ page }) => {
  const start = new Date('2026-09-05T12:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/exam/1');
  await page.locator('#finish').click();
  await expect(page.locator('#ask')).toBeVisible();
  const deadline = await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:exam')).deadline);
  await page.clock.setSystemTime(deadline + 1000);
  await page.clock.runFor(1000);
  await expect(page.locator('.scoreline')).toHaveText('0 / 6');
  await expect(page.locator('#ask')).not.toBeVisible();
});

test('larger text actually enlarges a question', async ({ page }) => {
  await page.goto('/practice/number-systems?q=ns-01');
  const before = await page.locator('.qtext').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  await page.locator('#a11y > summary').click();
  await page.locator('#a11y-text').check();
  const after = await page.locator('.qtext').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  expect(after).toBeGreaterThan(before);
});

test('accessibility preferences carry over to standalone pages', async ({ page }) => {
  await page.goto('/guide');
  await page.locator('#a11y > summary').click();
  for (const id of ['contrast', 'plain', 'text', 'underline']) await page.locator('#a11y-' + id).check();
  for (const route of ['/privacy', '/404.html']) {
    await page.goto(route);
    for (const flag of ['contrast', 'plain', 'bigtext', 'underline']) {
      await expect(page.locator('html')).toHaveAttribute('data-' + flag, 'on');
    }
  }
});
