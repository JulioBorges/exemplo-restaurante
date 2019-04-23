// tslint:disable: semicolon

describe('Test routes from application', () => {
  const config = require('../config/test.config')
  const launchConfig = require('../config/puppeteer.config')
  const puppeteer = require('puppeteer')

  let page
  let browser

  jest.setTimeout(100000)

  beforeAll(async () => {
    browser = await puppeteer.launch(launchConfig)
    page = await browser.newPage()
    await page.goto(config.urlTests, { waitUntil: 'networkidle0', timeout: config.timeoutAction })
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  describe('When the application loads', () => {
    it('Should be expected to be load "#nav-home" on the screen', async () => {
      await validateNavLinkLoad('#nav-home', 'Home')
    })

    it('Should be expected to be load "#nav-restaurantes" on the screen', async () => {
      await validateNavLinkLoad('#nav-restaurantes', 'Restaurantes')
    })

    it('Should be expected to be load "#nav-pratos" on the screen', async () => {
      await validateNavLinkLoad('#nav-pratos', 'Pratos')
    })
  })

  describe('When "#nav-restaurantes" is clicked', () => {
    it('Should be expected to show a title "Restaurantes"', async () => {
      await validateNavLinkClick('#nav-restaurantes', '#title-restaurantes', 'RESTAURANTES')
    })
  })

  describe('When "#nav-pratos" is clicked', () => {
    it('Should be expected to show a title "Pratos"', async () => {
      await validateNavLinkClick('#nav-pratos', '#title-pratos', 'PRATOS')
    })
  })

  describe('When "#nav-home" is clicked', () => {
    it('Should be expected to show a title "SISTEMA DE CADASTRO DE RESTAURANTES" ', async () => {
      await validateNavLinkClick('#nav-home', '#title-home', 'SISTEMA DE CADASTRO DE RESTAURANTES')
    })
  })

  async function validateNavLinkLoad(selector, textNav) {
    await page.waitForSelector(selector, { timeout: config.timeoutAction })

    const innerHTML = await page.$eval(selector + ' > span', e => e.innerHTML)

    expect(innerHTML).not.toBeNull()
    expect(innerHTML).toBe(textNav)
  }

  async function validateNavLinkClick(selectorNav, selectorTitle, textTitle) {
    await page.click(selectorNav)
    await page.waitForSelector(selectorTitle, { timeout: config.timeoutAction })

    const innerHTML = await page.$eval(selectorTitle, e => e.innerHTML)

    expect(innerHTML).not.toBeNull()
    expect(innerHTML).toBe(textTitle)
  }
})
