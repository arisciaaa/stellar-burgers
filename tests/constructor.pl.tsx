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

    const constructor = page.locator('section').filter({
      hasText: 'Оформить заказ'
    });

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (верх)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (низ)')
    ).toBeVisible();
  });

  test('Открытие модального окна ингредиента', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');

    await page.getByText('Флюоресцентная булка R2-D3').first().click();

    const modal = page.locator('#modals');

    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    await expect(
      modal.getByRole('heading', { name: 'Флюоресцентная булка R2-D3' })
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

  test('Создание заказа', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/api/auth/**',
      update: false
    });

    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/api/orders',
      update: false
    });

    await page.goto('/');

    await page.getByRole('link', { name: 'Личный кабинет' }).click();

    await page.locator('input[name="email"]').fill(
      'sofia.stellar.82617@example.com'
    );

    await page.locator('input[name="password"]').fill('Stellar12345!');

    await page.getByRole('button', { name: 'Войти' }).click();

    await page.goto('/');

    await expect(
      page.getByRole('button', { name: 'Оформить заказ' })
    ).toBeVisible();

    const bun = page
      .locator('li')
      .filter({ hasText: 'Флюоресцентная булка R2-D3' });

    await bun.getByRole('button', { name: 'Добавить' }).click();

    const filling = page
      .locator('li')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' });

    await filling.getByRole('button', { name: 'Добавить' }).click();

    const constructor = page.locator('section').filter({
      hasText: 'Оформить заказ'
    });

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (верх)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (низ)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const orderModal = page.locator('#modals');
    
    await expect(
      orderModal.getByText('идентификатор заказа')
    ).toBeVisible();

    await expect(
      orderModal.getByText(/^\d+$/)
    ).toBeVisible();

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (верх)')
    ).not.toBeVisible();

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (низ)')
    ).not.toBeVisible();

    await expect(
      constructor.getByText('Биокотлета из марсианской Магнолии')
    ).not.toBeVisible();

    await orderModal.getByRole('button').click();

    await expect(
      orderModal.getByText('идентификатор заказа')
    ).not.toBeVisible();
  });
});
