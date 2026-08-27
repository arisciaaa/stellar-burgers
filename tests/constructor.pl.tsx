import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test('Добавление ингредиента в конструктор', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');

    const ingredient = page
      .locator('li')
      .filter({ hasText: 'Флюоресцентная булка R2-D3' });

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page.getByText('Флюоресцентная булка R2-D3 (верх)')
    ).toBeVisible();
  });

  test('Открытие модального окна ингредиента', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');

    await page.getByText('Флюоресцентная булка R2-D3').first().click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Флюоресцентная булка R2-D3' })
    ).toBeVisible();
  });

  test('Отображение данных выбранного ингредиента', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');

    await page.getByText('Краторная булка N-200i').first().click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Краторная булка N-200i' })
    ).toBeVisible();

    await expect(page.locator('#modals').getByText('420')).toBeVisible();
    await expect(page.locator('#modals').getByText('80')).toBeVisible();
    await expect(page.locator('#modals').getByText('24')).toBeVisible();
    await expect(page.locator('#modals').getByText('53')).toBeVisible();
  });

  test('Закрытие модального окна по иконке крестика', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');

    await page.getByText('Флюоресцентная булка R2-D3').first().click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    await page.getByText('Детали ингредиента').locator('..').getByRole('button').click();

    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('Закрытие модального окна по клику на оверлей (во вне окна)', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');

    await page.getByText('Флюоресцентная булка R2-D3').first().click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    const modal = page.getByText('Детали ингредиента').locator('..').locator('..');
    await modal.locator('xpath=following-sibling::div').click({ position: { x: 10, y: 10 } });

    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });


});
