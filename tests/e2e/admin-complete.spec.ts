import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'
const ADMIN_EMAIL = 'nonobrice441@gmail.com'
const ADMIN_PASSWORD = 'Gildas1995@@'

test.describe('Admin Panel - Complete Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/login`)
    await page.getByRole('textbox', { name: 'Email' }).fill(ADMIN_EMAIL)
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: 'Se connecter' }).click()
    await page.waitForURL(`${BASE_URL}/admin/dashboard`)
  })

  test('should display all admin managers on dashboard', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    expect(await page.getByText('Dashboard Administrateur').isVisible()).toBe(true)
    expect(await page.getByText('Page d\'Accueil').isVisible()).toBe(true)
    expect(await page.getByText('À Propos').isVisible()).toBe(true)
    expect(await page.getByText('Équipe & Communauté').isVisible()).toBe(true)
    expect(await page.getByText('Services & Horaires').isVisible()).toBe(true)
    expect(await page.getByText('Témoignages').isVisible()).toBe(true)
    
    expect(await page.getByText('Catégories').isVisible()).toBe(true)
    expect(await page.getByText('Managers').isVisible()).toBe(true)
    expect(await page.getByText('Sections Site').isVisible()).toBe(true)
    expect(await page.getByText('Couverture').isVisible()).toBe(true)
  })

  test('Notre Mission - Edit and verify sync with public site', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    const missionButton = page.getByRole('button', { name: 'Notre Mission & Statistiques Titre, contenu et statistiques de la mission' })
    await missionButton.click()
    await page.waitForTimeout(1000)
    
    expect(await page.getByText('Notre Mission & Statistiques').isVisible()).toBe(true)
    expect(await page.getByText('Aperçu').isVisible()).toBe(true)
    
    const editButton = page.getByRole('button', { name: 'Modifier le Contenu' })
    await editButton.click()
    await page.waitForTimeout(500)
    
    const titleInput = page.locator('input').first()
    const currentTitle = await titleInput.inputValue()
    const newTitle = `${currentTitle} [E2E_TEST_${Date.now()}]`
    
    await titleInput.fill(newTitle)
    
    const saveButton = page.getByRole('button', { name: 'Enregistrer les Modifications' })
    await saveButton.click()
    
    await page.waitForTimeout(1000)
    expect(await page.getByText('Contenu mis à jour avec succès!').isVisible()).toBe(true)
    
    const previewTitle = page.locator('h4').filter({ hasText: newTitle })
    expect(await previewTitle.isVisible()).toBe(true)
    
    await page.goto(`${BASE_URL}/#about`)
    await page.waitForTimeout(2000)
    
    const publicTitle = page.locator('h3').filter({ hasText: newTitle })
    expect(await publicTitle.isVisible()).toBe(true)
  })

  test('Features Manager - Display and functionality', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    const featuresButton = page.getByRole('button', { name: 'Features (À Propos) Les 3 features de la section À Propos' })
    await featuresButton.click()
    await page.waitForTimeout(1000)
    
    expect(await page.getByText('Features (À Propos)').isVisible()).toBe(true)
    expect(await page.getByText('Ajouter une Feature').isVisible()).toBe(true)
    expect(await page.getByText('Features').isVisible()).toBe(true)
    
    const featureCards = page.locator('h4').filter({ hasText: /Foi Authentique|Communauté Accueillante|Enseignement Enrichissant/ })
    expect(await featureCards.count()).toBeGreaterThan(0)
  })

  test('Services Manager - Display and functionality', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    const servicesButton = page.getByRole('button', { name: 'Services Religieux Horaires et descriptions des services' })
    await servicesButton.click()
    await page.waitForTimeout(1000)
    
    expect(await page.getByText('Services Religieux').isVisible()).toBe(true)
    expect(await page.getByText('Ajouter un Service').isVisible()).toBe(true)
    expect(await page.getByText('Services').isVisible()).toBe(true)
    
    const dayBadges = page.locator('generic').filter({ hasText: /Lundi|Mercredi|Jeudi/ })
    expect(await dayBadges.count()).toBeGreaterThan(0)
    
    const timeBadges = page.locator('generic').filter({ hasText: /17:30|19:30|18:00/ })
    expect(await timeBadges.count()).toBeGreaterThan(0)
  })

  test('Testimonials Manager - Display and functionality', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    const testimonialsButton = page.getByRole('button', { name: 'Témoignages Avis et témoignages des membres' })
    await testimonialsButton.click()
    await page.waitForTimeout(1000)
    
    expect(await page.getByText('Témoignages').isVisible()).toBe(true)
    expect(await page.getByText('Ajouter un Témoignage').isVisible()).toBe(true)
    expect(await page.getByText('Témoignages').isVisible()).toBe(true)
    
    const testimonialNames = page.locator('h4').filter({ hasText: /Nono Nono Brice|Jordan Morgan|Mimi Marie|Jean Dupuis/ })
    expect(await testimonialNames.count()).toBeGreaterThan(0)
    
    const starRatings = page.locator('generic').filter({ hasText: /⭐/ })
    expect(await starRatings.count()).toBeGreaterThan(0)
  })

  test('Community Members Manager - Display and functionality', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    const membersButton = page.getByRole('button', { name: 'Membres de l\'Équipe Photos et rôles des membres' })
    await membersButton.click()
    await page.waitForTimeout(1000)
    
    expect(await page.getByText('Membres de l\'Équipe').isVisible()).toBe(true)
    expect(await page.getByText('Ajouter un Membre').isVisible()).toBe(true)
    expect(await page.getByText('Membres de l\'Équipe').isVisible()).toBe(true)
    
    const memberNames = page.locator('h4').filter({ hasText: /Jean Dupont|Marie Martin|Pierre Leclerc|Sophie Bernard|Marc Rousseau|Lucie Gauthier/ })
    expect(await memberNames.count()).toBeGreaterThan(0)
    
    const roles = page.locator('p').filter({ hasText: /Pasteur Principal|Coordinatrice|Musicien|Enseignante|Bénévole|Ministère Jeunesse/ })
    expect(await roles.count()).toBeGreaterThan(0)
  })

  test('Dashboard Overview Statistics', async ({ page }) => {
    await page.waitForTimeout(2000)
    
    const categoriesCount = page.locator('p').filter({ hasText: 'Catégories' }).locator('+ p')
    const managersCount = page.locator('p').filter({ hasText: 'Managers' }).locator('+ p')
    const sectionsCount = page.locator('p').filter({ hasText: 'Sections Site' }).locator('+ p')
    const coverage = page.locator('p').filter({ hasText: 'Couverture' }).locator('+ p')
    
    expect(await categoriesCount.isVisible()).toBe(true)
    expect(await managersCount.isVisible()).toBe(true)
    expect(await sectionsCount.isVisible()).toBe(true)
    expect(await coverage.isVisible()).toBe(true)
  })

  test('Public Site displays Mission content correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/#about`)
    await page.waitForTimeout(2000)
    
    expect(await page.getByText('Notre Mission').isVisible()).toBe(true)
    expect(await page.getByText('Membres actifs').isVisible()).toBe(true)
    expect(await page.getByText('Années d\'expérience').isVisible()).toBe(true)
    
    const statsValues = page.locator('p').filter({ hasText: /500\+|15\+/ })
    expect(await statsValues.count()).toBeGreaterThanOrEqual(2)
  })

  test('Public Site displays Features correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/#about`)
    await page.waitForTimeout(2000)
    
    const features = page.locator('h4').filter({ hasText: /Foi Authentique|Communauté Accueillante|Enseignement Enrichissant/ })
    expect(await features.count()).toBeGreaterThan(0)
  })

  test('Public Site displays Services correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/#services`)
    await page.waitForTimeout(2000)
    
    expect(await page.getByText('Services Principales').isVisible()).toBe(true)
    expect(await page.getByText('Prière & Étude Biblique').isVisible()).toBe(true)
    expect(await page.getByText('Groupe Jeunesse').isVisible()).toBe(true)
  })

  test('Public Site displays Testimonials correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}`)
    await page.waitForTimeout(2000)
    
    const testimonialSection = page.getByText('Ce qu\'ils disent de nous')
    expect(await testimonialSection.isVisible()).toBe(true)
    
    const testimonialNames = page.locator('p').filter({ hasText: /Nono Nono Brice|Jordan Morgan|Mimi Marie|Jean Dupuis/ })
    expect(await testimonialNames.count()).toBeGreaterThan(0)
  })

  test('Public Site displays Team Members correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/#community`)
    await page.waitForTimeout(2000)
    
    expect(await page.getByText('Notre Communauté').isVisible()).toBe(true)
    
    const memberNames = page.getByText(/Jean Dupont|Marie Martin|Pierre Leclerc|Sophie Bernard|Marc Rousseau|Lucie Gauthier/)
    expect(await memberNames.count()).toBeGreaterThan(0)
  })

  test('Logout functionality', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    const logoutButton = page.getByRole('button', { name: 'Déconnexion' })
    await logoutButton.click()
    
    await page.waitForURL(`${BASE_URL}/admin/login`)
    expect(await page.getByText('Admin Panel').isVisible()).toBe(true)
  })
})
