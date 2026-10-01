const { test, expect } = require('@playwright/test')

test.describe('Phonebook', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Phonebook' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Numbers' })).toBeVisible()
  })

  test('a new person can be added', async ({ page }) => {
    const name = `Test Person ${Date.now()}`

    await page.goto('/')
    await page.locator('input[name="name"]').fill(name)
    await page.locator('input[name="number"]').fill('040-1234567')
    await page.getByRole('button', { name: 'add' }).click()

    await expect(page.getByText(`Person ${name} has been added!`)).toBeVisible()
  })
})
