import { expect, test } from '@playwright/test';

const readingSlugs = ['love', 'reunion', 'career', 'money', 'yes-or-no', 'three-card', 'choice'];

async function drawReading(page: import('@playwright/test').Page, slug: string) {
  await page.goto(`/tarot/${slug}/`);
  await expect(page.getByRole('heading', { name: /카드를 선택해 리딩을 시작하세요/ })).toBeVisible();

  if (slug === 'choice') {
    await page.locator('[data-choice-a]').fill('선택 A');
    await page.locator('[data-choice-b]').fill('선택 B');
  }

  const required = slug === 'today' || slug === 'yes-or-no' ? 1 : slug === 'choice' ? 2 : 3;
  for (let index = 0; index < required; index += 1) {
    await page.locator('[data-card-choice]').nth(index).click();
  }

  await expect(page.locator('[data-result]')).toBeVisible();
  await expect(page.locator('[data-result-title]')).toContainText('결과');
}

test('home and tarot listing are reachable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /무료 AI 스타일 타로 리딩/ })).toBeVisible();
  await page.getByRole('link', { name: /타로 전체 보기/ }).click();
  await expect(page).toHaveURL(/\/tarot\/$/);
  await expect(page.getByRole('heading', { name: /무료 AI 스타일 타로 리딩/ })).toBeVisible();
});

test('today reading supports draw, copy, save, persistence, and clear history', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/tarot/today/');
  await page.locator('[data-save-reading]').check();
  await page.locator('[data-card-choice]').first().click();

  await expect(page.locator('[data-result]')).toBeVisible();
  await page.locator('[data-copy-result]').click();
  await expect(page.locator('[data-copy-result]')).toHaveText('복사 완료');
  await expect(page.locator('[data-history-wrap]')).toBeVisible();
  await expect(page.locator('[data-history]')).toContainText('오늘의 타로 결과');

  await page.reload();
  await expect(page.locator('[data-history-wrap]')).toBeVisible();
  await expect(page.locator('[data-history]')).toContainText('오늘의 타로 결과');

  await page.locator('[data-history-wrap] [data-clear-history]').click();
  await expect(page.locator('[data-history-wrap]')).toBeHidden();
});

test('major reading types render results', async ({ page }) => {
  for (const slug of readingSlugs) {
    await drawReading(page, slug);
  }
});
