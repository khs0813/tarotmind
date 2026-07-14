import { expect, test } from '@playwright/test';

const mobileViewports = [
  { name: 'android-360', width: 360, height: 740 },
  { name: 'iphone-390', width: 390, height: 844 }
];

const criticalPaths = [
  '/',
  '/tarot/today/',
  '/tarot/choice/',
  '/cards/the-fool/',
  '/guides/tarot-card-meaning/',
  '/credits/'
];

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const layout = await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const pageWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const overflowingElements = Array.from(document.querySelectorAll('body *:not(.skip-link)'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          className: String(element.className || ''),
          text: (element.textContent || '').trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item) => item.width > 1 && (item.left < -1 || item.right > viewportWidth + 1));

    return { viewportWidth, pageWidth, overflowingElements };
  });

  expect(layout, JSON.stringify(layout.overflowingElements, null, 2)).toEqual({
    viewportWidth: layout.viewportWidth,
    pageWidth: layout.viewportWidth,
    overflowingElements: []
  });
}

for (const viewport of mobileViewports) {
  test.describe(`mobile layout ${viewport.name}`, () => {
    test.use({ viewport, isMobile: true, hasTouch: true });

    for (const path of criticalPaths) {
      test(`${path} has no horizontal overflow`, async ({ page }) => {
        await page.goto(path);
        await expectNoHorizontalOverflow(page);
      });
    }

    test('choice reading result has no horizontal overflow', async ({ page }) => {
      await page.goto('/tarot/choice/');
      await page.locator('[data-choice-a]').fill('A');
      await page.locator('[data-choice-b]').fill('B');
      await page.locator('[data-card-choice]').nth(0).click();
      await page.locator('[data-card-choice]').nth(1).click();
      await expect(page.locator('[data-result]')).toBeVisible();
      await expectNoHorizontalOverflow(page);
    });
  });
}
