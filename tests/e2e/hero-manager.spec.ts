import { test, expect } from '@playwright/test'

const ADMIN_URL = 'http://localhost:3000/admin'
const ADMIN_EMAIL = 'nonobrice441@gmail.com'
const ADMIN_PASSWORD = 'Gildas1995@@'

test.describe('Hero Content Manager - E2E Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${ADMIN_URL}/login`)
    await page.getByRole('textbox', { name: 'Email' }).fill(ADMIN_EMAIL)
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: 'Se connecter' }).click()
    await page.waitForURL(`${ADMIN_URL}/dashboard`, { timeout: 30000 })
    await page.waitForTimeout(2000)
  })

  test('should display Hero Content Manager', async ({ page }) => {
    await page.waitForTimeout(1000)
    const heroButton = page.locator('button:has-text("Contenu Hero")')
    await heroButton.first().click()
    
    await expect(page.getByRole('heading', { name: /Contenu Hero/ })).toBeVisible()
  })

  test('should load initial hero content values', async ({ page }) => {
    await page.waitForTimeout(1000)
    const heroButton = page.locator('button:has-text("Contenu Hero")')
    await heroButton.first().click()
    
    const inputFields = page.locator('input[type="text"], textarea')
    await expect(inputFields.first()).toHaveCount(1)
  })

  test('should enable edit mode when clicking Modifier button', async ({ page }) => {
    await page.waitForTimeout(1000)
    const heroButton = page.locator('button:has-text("Contenu Hero")')
    await heroButton.first().click()
    
    const modifierBtn = page.locator('button:has-text("Modifier")')
    await modifierBtn.click()
    
    const saveBtn = page.locator('button:has-text("Sauvegarder")')
    const cancelBtn = page.locator('button:has-text("Annuler")')
    
    await expect(saveBtn).toBeVisible()
    await expect(cancelBtn).toBeVisible()
  })

  test('should modify hero content and save changes', async ({ page }) => {
    await page.waitForTimeout(1000)
    const heroButton = page.locator('button:has-text("Contenu Hero")')
    await heroButton.first().click()
    
    const modifierBtn = page.locator('button:has-text("Modifier")')
    await modifierBtn.click()
    
    await page.waitForTimeout(500)
    
    const inputs = page.locator('input[type="text"]')
    await inputs.nth(0).fill('Bienvenue [TEST]')
    await inputs.nth(1).fill('Merci Saint-Esprit [TEST]')
    await inputs.nth(4).fill('750+')
    
    const saveBtn = page.locator('button:has-text("Sauvegarder")')
    await saveBtn.click()
    
    await page.waitForTimeout(2000)
  })

  test('should verify saved changes persist', async ({ page }) => {
    await page.waitForTimeout(1000)
    const heroButton = page.locator('button:has-text("Contenu Hero")')
    await heroButton.first().click()
    
    await page.waitForTimeout(1000)
    const inputs = page.locator('input[type="text"]')
    const firstInputValue = await inputs.nth(0).inputValue()
    expect(firstInputValue).toContain('TEST')
  })

  test('should have all form sections', async ({ page }) => {
    await page.waitForTimeout(1000)
    const heroButton = page.locator('button:has-text("Contenu Hero")')
    await heroButton.first().click()
    
    await expect(page.locator('label:has-text("Texte de Bienvenue")')).toBeVisible()
    await expect(page.locator('label:has-text("Nom de l\'Église")')).toBeVisible()
    await expect(page.locator('label:has-text("Sous-titre")')).toBeVisible()
    await expect(page.locator('label:has-text("Description")')).toBeVisible()
  })
})
