// tslint:disable: semicolon
const puppeteer = require('puppeteer')
jest.setTimeout(100000)

describe('It`s a test sample', () => {
  it('When Google site is open, page title should be equals `Google`', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://google.com.br', {
      waitUntil: 'networkidle0',
      timeout: 10000
    })

    const title = await page.title()
    expect(title).toBe('Google')

    await page.close()
    await browser.close()
  })
})
