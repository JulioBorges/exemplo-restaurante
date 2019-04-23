// tslint:disable: semicolon

describe('Test "Cadastro de Restaurante"', () => {
  const config = require('../config/test.config')
  const launchConfig = require('../config/puppeteer.config')
  const puppeteer = require('puppeteer')

  let page
  let browser
  const nomeRestaurante = 'NovoRestauranteTeste'

  jest.setTimeout(100000)

  beforeAll(async () => {
    browser = await puppeteer.launch(launchConfig)
    page = await browser.newPage()
    await page.goto(config.urlTests, {
      waitUntil: 'networkidle0',
      timeout: config.timeoutAction
    })
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  describe('Add a new "Restaurante"', () => {
    it('When click on button "Cadastrar novo restaurante" should be expected to show a input "Nome"', async () => {
      await page.click('#nav-restaurantes')

      await page.click('#btn-cad-restaurante')
      await page.waitForSelector('#input-nome', { timeout: config.timeoutAction })
    })

    it('Should be fill input "Nome"', async () => {
      await page.type('#input-nome', nomeRestaurante, { delay: 20 })
      const inputValue = await page.$eval('#input-nome', e => e.value)

      expect(inputValue).toBe(nomeRestaurante)
    })

    it('When click on button "Salvar" the table with restaurants appear with new "Restaurante"', async () => {
      await page.click('#btn-salvar')
      await page.waitForSelector('#table-restaurantes', { timeout: config.timeoutAction })
      await page.waitForSelector('#' + nomeRestaurante, { timeout: config.timeoutAction })
    })
  })

  describe('Delete new inserted "Restaurante"', () => {
    it('When click on button "Remover" delete restaurante', async () => {
      await page.waitForSelector('#btn-remover-' + nomeRestaurante, {
        timeout: config.timeoutAction
      })

      await page.click('#btn-remover-' + nomeRestaurante)

      await page.click('#btn-sim')

      await delay(2000)

      await page.waitForSelector('#table-restaurantes', {
        timeout: config.timeoutAction
      })

      await expect(page.$eval('#' + nomeRestaurante, el => el.innerHTML)).rejects.toThrow()
    })
  })

  function delay(time) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time)
    })
  }
})
