async function clickIconButtonByPath(page, { iconPathD }) {
  const xPath =
    '//*[local-name() = "path" and @d="' + iconPathD + '"]/ancestor::button[1]'

  const element = await page.waitForXPath(xPath)

  await element.click()
}

async function typeInTextFieldByLabel(page, { label, value, clear }) {
  if (!label) throw new Error('label expected')
  if (!value) throw new Error('value expected')

  const xPath = '//label[text()="' + label + '"]/..//input'

  const element = await page.waitForXPath(xPath)

  if (clear) {
    await element.click()
    await element.focus()
    await element.click({ clickCount: 3 })
    await element.press('Backspace')
  }

  await element.type(value, 10)
}

async function clickButtonByLabel(page, label) {
  const xPath = '//span[text()="' + label + '"]/parent::button'

  const element = await page.waitForXPath(xPath)

  await element.click()
}

module.exports = {
  clickIconButtonByPath,
  typeInTextFieldByLabel,
  clickButtonByLabel,
}
