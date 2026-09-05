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
  // The old address still lands on the saved list, which is a list rather than a quiz.
  await page.goto('/missed?view=bookmarks');
  await expect(page).toHaveURL(/\/bookmarks$/);
  await expect(page.getByRole('heading', { name: 'Bookmarked questions' })).toBeVisible();
  const saved = page.locator('.saved-list a');
  await expect(saved).toHaveCount(1);
  await expect(saved).toHaveAttribute('href', /gen%3Agraph-theory%3A123/);
  await saved.click();
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
  await page.getByRole('button', { name: 'Show the solution', exact: true }).click();
  await expect(page.locator('#ask')).toBeVisible();
  await page.locator('#ask-yes').click();
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
  const reloaded = page.waitForEvent('load');
  await page.locator('#backup-file').setInputFiles(backupPath);
  await expect(page.locator('#ask')).toBeVisible();
  await page.locator('#ask-yes').click();
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

test('returning to bookmarks drops a question removed during the previous visit', async ({ page }) => {
  await page.goto('/guide');
  await page.evaluate(() => {
    window.MCQ.filter(q => q.level === 'b').slice(0, 2).forEach(q =>
      localStorage.setItem('acsl:bookmark:' + q.id, 'true'));
  });
  await page.goto('/bookmarks');
  await expect(page.locator('.saved-list li')).toHaveCount(2);
  const removed = await page.locator('.saved-list a').first().getAttribute('href');

  // Removing one from the list takes it off without answering it.
  await page.locator('.saved-drop').first().click();
  await expect(page.locator('.saved-list li')).toHaveCount(1);
  await expect(page.locator('.saved-list a')).not.toHaveAttribute('href', removed);

  // And it is still gone after leaving and coming back, without a reload.
  await page.locator('#section-tabs a[href="/practice"]').click();
  await page.locator('#section-tabs a[href="/bookmarks"]').click();
  await expect(page.locator('.saved-list li')).toHaveCount(1);
  await expect(page.locator('.saved-list a')).not.toHaveAttribute('href', removed);
});

test('finishing an exam grades shuffled choices, blanks, and explanation colors', async ({ page }) => {
  await page.goto('/exam/1');
  const answers = await page.evaluate(() => {
    const e = JSON.parse(localStorage.getItem('acsl:exam'));
    return e.ids.map((id, i) => e.orders[i].indexOf(window.MCQ.find(q => q.id === id).ans));
  });
  await page.locator('#choices .choice').nth(answers[0]).click();
  await page.locator('#next').click();
  await page.locator('#choices .choice').nth((answers[1] + 1) % 5).click();
  await page.locator('#finish').click();
  await expect(page.locator('#ask')).toBeVisible();
  await page.locator('#ask-yes').click();
  await expect(page.locator('.scoreline')).toHaveText('1 / 6');
  await expect(page.locator('.review')).toHaveCount(6);
  await expect(page.locator('.verdict', { hasText: 'Correct' })).toHaveCount(1);
  await expect(page.locator('.verdict', { hasText: 'Not quite' })).toHaveCount(1);
  await expect(page.locator('.verdict', { hasText: 'Left blank' })).toHaveCount(4);
  const colors = await page.locator('.explain.wrong').first().evaluate(box => ({
    heading: getComputedStyle(box.querySelector('h2')).color,
    border: getComputedStyle(box).borderLeftColor,
  }));
  expect(colors.heading).toBe(colors.border);
  expect(await page.evaluate(() => {
    const e = JSON.parse(localStorage.getItem('acsl:exam'));
    return e.ids.map(id => JSON.parse(localStorage.getItem('acsl:q:' + id)));
  })).toEqual([true, false, false, false, false, false]);
});

test('a late answer cannot be saved while the exam timer callback is delayed', async ({ page }) => {
  const start = new Date('2026-09-05T12:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/exam/1');
  const deadline = await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:exam')).deadline);
  // Advance Date without firing the interval, as can happen in a suspended tab.
  await page.clock.setSystemTime(deadline + 1000);
  await page.locator('#choices .choice').first().click();
  await expect(page.locator('.scoreline')).toHaveText('0 / 6');
  expect(await page.evaluate(() => {
    const e = JSON.parse(localStorage.getItem('acsl:exam'));
    return { submitted: e.submitted, answers: e.answers };
  })).toEqual({ submitted: true, answers: [null, null, null, null, null, null] });
});

test('driver notice follows edits and canceling reset preserves saved work', async ({ page }) => {
  await page.goto('/problem/digit-chain');
  const starter = await page.evaluate(() => window.__cm.getValue());
  const edited = starter.replace('Incomplete test case:', 'Old input driver:');
  await page.evaluate(code => window.__cm.setValue(code), edited);
  await expect(page.locator('#driver-notice')).toBeVisible();
  await page.locator('#driver-reset').click();
  await expect(page.locator('#ask')).toBeVisible();
  await page.locator('#ask-no').click();
  expect(await page.evaluate(() => window.__cm.getValue())).toBe(edited);
  await page.reload();
  await expect(page.locator('#driver-notice')).toBeVisible();
  await page.evaluate(code => window.__cm.setValue(code), starter);
  await expect(page.locator('#driver-notice')).toBeHidden();
  await page.reload();
  await expect(page.locator('#driver-notice')).toBeHidden();
});

test('correcting a generated question removes its missed record but preserves its bookmark', async ({ page }) => {
  await page.goto('/guide');
  await page.evaluate(() => {
    localStorage.setItem('acsl:q:gen:graph-theory:123', 'false');
    localStorage.setItem('acsl:bookmark:gen:graph-theory:123', 'true');
  });
  await page.goto('/missed');
  const correct = await page.evaluate(() => {
    const q = window.GEN.make('graph-theory', 123);
    return String(q.choices[q.ans]);
  });
  const buttons = page.locator('#choices .choice');
  for (let i = 0; i < await buttons.count(); i++) {
    if (await buttons.nth(i).locator('.val').innerText() === correct) {
      await buttons.nth(i).click();
      break;
    }
  }
  expect(await page.evaluate(() => localStorage.getItem('acsl:q:gen:graph-theory:123'))).toBeNull();
  await page.locator('#section-tabs a[href="/bookmarks"]').click();
  await expect(page.locator('.saved-list a')).toHaveAttribute('href', /gen%3Agraph-theory%3A123/);
});

test('the question box answers with a click, Escape and the backdrop, and never reloads', async ({ page }) => {
  await page.goto('/problem/digit-chain');
  const mark = '# work I would rather keep';
  await page.evaluate(m => window.__cm.setValue(window.__cm.getValue() + '\n' + m + '\n'), mark);
  const navigations = () => page.evaluate(() => performance.getEntriesByType('navigation')[0].startTime);
  const started = await navigations();

  // Escape declines.
  await page.locator('#reset').click();
  await expect(page.locator('#ask')).toBeVisible();
  // The safe answer holds the focus on anything irreversible.
  await expect(page.locator('#ask-no')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#ask')).toBeHidden();
  expect(await page.evaluate(() => window.__cm.getValue())).toContain(mark);

  // A click on the backdrop declines. The dialog is centred, so the top left corner is outside it.
  await page.locator('#reset').click();
  await expect(page.locator('#ask')).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(page.locator('#ask')).toBeHidden();
  expect(await page.evaluate(() => window.__cm.getValue())).toContain(mark);

  // Saying yes does the thing.
  await page.locator('#reset').click();
  await page.locator('#ask-yes').click();
  await expect(page.locator('#ask')).toBeHidden();
  expect(await page.evaluate(() => window.__cm.getValue())).not.toContain(mark);

  // None of that was a page load.
  expect(await navigations()).toBe(started);
});

test('declining a second exam paper returns to the one in progress', async ({ page }) => {
  await page.goto('/exam/1');
  await page.locator('#choices .choice').first().click();
  await page.goto('/exam/2');
  await expect(page.locator('#ask')).toBeVisible();
  await page.locator('#ask-no').click();
  await expect(page).toHaveURL(/\/exam\/1$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('acsl:exam')).contest)).toBe(1);
  expect(await page.evaluate(() =>
    JSON.parse(localStorage.getItem('acsl:exam')).answers.filter(a => a !== null).length)).toBe(1);
});
