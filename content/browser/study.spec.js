const { test, expect } = require('@playwright/test');

// Each test gets disposable browser storage. No production API calls are made.
test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => { throw error; });
});

test('full-text search finds a lesson outside the selected division and survives reload', async ({ page }) => {
  await page.goto('/guide');
  await page.getByRole('button', { name: 'Junior', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Search all lessons' }).fill('CDR');
  await expect(page.locator('#guide-results .card')).toHaveCount(1);
  await expect(page.locator('#guide-results')).toContainText('LISP');
  await page.reload();
  await expect(page.getByRole('searchbox')).toHaveValue('CDR');
  await page.locator('#guide-results .card').click();
  await expect(page.getByRole('heading', { name: 'LISP', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Senior', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('generated questions retain their seed in links, bookmarks, and missed review', async ({ page }) => {
  await page.goto('/practice/graph-theory?q=gen%3Agraph-theory%3A123');
  const question = await page.locator('.qtext').textContent();
  // Fixture identifies a wrong answer without depending on shuffled display positions.
  const correct = await page.evaluate(() => {
    const q = window.GEN.make('graph-theory', 123);
    return q.choices[q.ans];
  });
  const buttons = page.locator('#choices .choice');
  for (let i = 0; i < await buttons.count(); i++) {
    if (await buttons.nth(i).locator('.val').innerText() !== String(correct)) {
      await buttons.nth(i).click();
      break;
    }
  }
  await page.getByRole('button', { name: 'Bookmark question', exact: true }).click();
  await page.goto('/missed');
  await expect(page.locator('.qtext')).toHaveText(question);
  await expect(page.getByRole('link', { name: 'Link to this question', exact: true })).toHaveAttribute('href', /gen%3Agraph-theory%3A123/);
  await page.goto('/missed?view=bookmarks');
  await expect(page.getByRole('heading', { name: 'Bookmarked questions' })).toBeVisible();
  await expect(page.locator('.qtext')).toHaveText(question);
  await page.getByRole('link', { name: 'Link to this question', exact: true }).click();
  await page.reload();
  await expect(page.locator('.qtext')).toHaveText(question);
});

test('hints do not reveal the solution and viewing after solving preserves independent progress', async ({ page }, testInfo) => {
  await page.goto('/guide');
  await page.evaluate(() => localStorage.setItem('acsl:frq:digit-chain', JSON.stringify('solved')));
  await page.goto('/problem/digit-chain');
  await page.locator('.hint summary').first().click();
  await expect(page.locator('.hint').first().locator('p')).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:frq:digit-chain')))).toBe('solved');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('link', { name: 'Jump to editor' }).click();
    await expect(page.locator('.CodeMirror')).toBeInViewport();
    await expect(page.locator('.CodeMirror textarea')).toBeFocused();
  }
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Show the solution', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'How to solve it', exact: true })).toBeVisible();
  await page.goto('/problems');
  const card = page.locator('a.card[href="/problem/digit-chain"]');
  await expect(card).toContainText('solved independently');
  await expect(card).toContainText('solution seen');
});

test('backup download can be restored and malformed input does not change saved work', async ({ page }) => {
  await page.goto('/guide');
  await page.evaluate(() => localStorage.setItem('acsl:code:digit-chain:python', JSON.stringify('print("saved")')));
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export progress', exact: true }).click();
  const download = await downloading;
  const backupPath = await download.path();
  await page.evaluate(() => localStorage.setItem('acsl:code:digit-chain:python', JSON.stringify('changed')));
  page.once('dialog', dialog => dialog.accept());
  const reloaded = page.waitForEvent('load');
  await page.locator('#backup-file').setInputFiles(backupPath);
  await reloaded;
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('acsl:code:digit-chain:python')))).toBe('print("saved")');
  await page.waitForLoadState('load');
  await page.locator('#backup-file').setInputFiles({
    name: 'invalid.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ version: 1, entries: { theme: 'light', 'code:unknown:python': 'bad' } })),
  });
  await expect(page.locator('#backup-status')).toContainText('Invalid backup entry');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:code:digit-chain:python')))).toBe('print("saved")');
});

test('diagram question assets load without horizontal page overflow', async ({ page }) => {
  for (const [topic, id] of [['digital-electronics', 'de-17'], ['graph-theory', 'gt-17'], ['data-structures', 'ds-19']]) {
    await page.goto(`/practice/${topic}?q=${id}`);
    const image = page.locator('.qtext img');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(image).toHaveAttribute('alt', /.+/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
