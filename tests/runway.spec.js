import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.beforeEach(async ({ page }) => {
  page.pageErrors = [];
  page.consoleErrors = [];
  page.httpErrors = [];
  page.scriptRequests = [];
  page.failedRequests = [];
  page.on('request', request => { if (request.resourceType() === 'script') page.scriptRequests.push(request.url()); });
  page.on('requestfailed', request => page.failedRequests.push({ url: request.url(), type: request.resourceType(), failure: request.failure() }));
  page.on('response', response => { if (response.status() >= 400) page.httpErrors.push({ url: response.url(), status: response.status(), type: response.request().resourceType() }); });
  page.on('pageerror', error => page.pageErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') page.consoleErrors.push({ text: message.text(), location: message.location() }); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
});

test.afterEach(async ({ page }) => {
  if ((page.consoleErrors || []).length) console.log('Browser console errors:', JSON.stringify(page.consoleErrors));
  if ((page.httpErrors || []).length) console.log('HTTP errors:', JSON.stringify(page.httpErrors));
  if ((page.failedRequests || []).length) console.log('Failed requests:', JSON.stringify(page.failedRequests));
  if ((page.scriptRequests || []).length) console.log('Script requests:', JSON.stringify(page.scriptRequests));
  expect(page.pageErrors || []).toEqual([]);
});

test('renders the complete six-look experience and inline catalogue', async ({ page }) => {
  await expect(page).toHaveTitle('Try the Look — Runway');
  await expect(page.locator('runway-section')).toBeVisible();
  await expect(page.locator('[data-rw-hero]')).toHaveCount(6);
  await expect(page.locator('[data-rw-panel]')).toHaveCount(6);
  await expect(page.locator('[data-rw-model]')).toHaveCount(12);
  await expect(page.locator('[data-rw-tick]')).toHaveCount(6);
  console.log('Page script elements:', JSON.stringify(await page.locator('script').evaluateAll(nodes => nodes.map(node => ({ src: node.src, type: node.type, id: node.id })))));

  const data = await page.locator('#runway-catalog').evaluate(el => JSON.parse(el.textContent));
  expect(data.looks).toHaveLength(6);
  expect(data.items).toHaveLength(8);
  expect(data.looks.every(look => look.products.length === 3)).toBeTruthy();
  expect(data.looks.every(look => look.image.startsWith('https://reel-ref-try-the-look.vercel.app/assets/'))).toBeTruthy();
  expect(data.items.every(item => item.image.startsWith('https://reel-ref-try-the-look.vercel.app/assets/'))).toBeTruthy();

  await page.waitForTimeout(1200);
  const broken = await page.evaluate(() => [...document.images]
    .filter(img => img.complete && img.naturalWidth === 0)
    .map(img => img.currentSrc || img.src));
  expect(broken).toEqual([]);
});

test('carousel ticks, arrows, keyboard navigation and look popup work', async ({ page }) => {
  await page.locator('[data-rw-tick]').nth(1).click();
  await expect(page.locator('[data-rw-tick][aria-current="true"]')).toHaveAttribute('aria-label', /Look 2/);

  await page.locator('[data-rw-next]').click();
  await expect(page.locator('[data-rw-tick][aria-current="true"]')).toHaveAttribute('aria-label', /Look 3/);

  await page.locator('[data-rw-stage]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-rw-tick][aria-current="true"]')).toHaveAttribute('aria-label', /Look 4/);

  const opener = page.locator('.rw__hero.is-on [data-rw-zoom]');
  await opener.click({ force: true });
  const popup = page.locator('[data-rw-lb]');
  await expect(popup).toHaveAttribute('aria-hidden', 'false');
  await expect(popup.locator('[data-rw-pin]')).toHaveCount(3);
  await page.keyboard.press('Escape');
  await expect(popup).toHaveAttribute('aria-hidden', 'true');
});

test('product size confirmation adds the exact variant to the local bag', async ({ page }) => {
  const panel = page.locator('[data-rw-panel]:not([hidden])').first();
  await panel.locator('[data-rw-add]').first().click();

  const picker = page.locator('[data-rw-picker]:not([hidden])').first();
  await expect(picker).toBeVisible();
  const options = picker.locator('[data-rw-option]');
  await expect(options).toHaveCount(7);
  await picker.locator('label.rw__pill').nth(2).click();
  await picker.locator('[data-rw-confirm]').click();

  await expect(page.locator('[data-cart-count]')).toHaveText('1');
  const storedBag = await page.evaluate(() => localStorage.getItem('runway-styling-bag-v3'));
  console.log('Stored bag before reload:', storedBag);
  expect(storedBag).toContain('57015167090993');
  await page.reload({ waitUntil: 'domcontentloaded' });
  const restored = await page.evaluate(() => ({ storage: localStorage.getItem('runway-styling-bag-v3'), entries: window.RunwayBag.entries }));
  console.log('Stored bag after reload:', JSON.stringify(restored));
  await expect.poll(() => page.evaluate(() => window.RunwayBag.entries.length)).toBe(1);
  await expect(page.locator('[data-cart-count]')).toHaveText('1');
  await page.locator('#open-bag').click();
  const dialog = page.locator('#bag-dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Air Jordan 12 Retro');
  await expect(dialog).toContainText('Size 42');
  await expect(dialog).toContainText('$149.00');
  await expect(dialog.locator('a')).toHaveCount(0);
  await expect(dialog).toContainText('checkout and payment are not enabled');

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#export-bag').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('runway-outfit-shortlist.txt');
  const shortlist = await readFile(await download.path(), 'utf8');
  expect(shortlist).toContain('Air Jordan 12 Retro');
  expect(shortlist).not.toContain('https://');

  await page.getByRole('button', { name: 'Remove Air Jordan 12 Retro' }).click();
  await expect(page.locator('[data-cart-count]')).toHaveText('0');
  await expect(dialog).toContainText('Your styling bag is empty');
});

test('mobile layout has no horizontal overflow and uses the size sheet', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'domcontentloaded' });

  const widths = [];
  for (const width of [320, 375, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.waitForTimeout(150);
    widths.push(await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    })));
  }
  expect(widths.every(item => item.document <= item.viewport)).toBeTruthy();

  await page.locator('[data-rw-panel]:not([hidden]) [data-rw-add]').first().click();
  await expect(page.locator('.rw-sheet-host')).toHaveClass(/is-open/);
  const picker = page.locator('.rw-sheet-host [data-rw-picker]:not([hidden])');
  await expect(picker).toBeVisible();
  await page.locator('.rw-sheet-host [data-rw-pick-close]').first().evaluate(el => el.click());
  await expect(page.locator('.rw-sheet-host.is-open')).toHaveCount(0);
});


test('tablet, desktop and landscape layouts avoid horizontal overflow', async ({ page }) => {
  const cases = [
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1100, height: 800 },
    { width: 1440, height: 1000 },
    { width: 844, height: 390 },
  ];
  const results = [];
  for (const size of cases) {
    await page.setViewportSize(size);
    await page.waitForTimeout(120);
    results.push({ ...size, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth) });
  }
  expect(results.filter(item => item.scrollWidth > item.width), JSON.stringify(results)).toEqual([]);
});

test('reduced motion disables automatic look changes', async ({ page }) => {
  const initial = await page.locator('[data-rw-tick][aria-current="true"]').getAttribute('aria-label');
  await page.waitForTimeout(5500);
  await expect(page.locator('[data-rw-tick][aria-current="true"]')).toHaveAttribute('aria-label', initial);
});

test('autoplay advances on the five-second cadence when motion is allowed', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  const first = await page.locator('[data-rw-tick][aria-current="true"]').getAttribute('aria-label');
  await page.waitForTimeout(5400);
  await expect(page.locator('[data-rw-tick][aria-current="true"]')).not.toHaveAttribute('aria-label', first);
});

test('page passes automated WCAG 2.2 AA checks', async ({ page }) => {
  await page.addScriptTag({ path: 'tests/vendor/axe.min.js' });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    });
    return result.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map(n => n.target),
    }));
  });
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  const mobileViolations = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    });
    return result.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => n.target) }));
  });
  expect(mobileViolations, JSON.stringify(mobileViolations, null, 2)).toEqual([]);
});
