async function clickIconButtonByPath(page, { iconPathD }) {
  const xPath =
    '//*[local-name() = "path" and @d="' + iconPathD + '"]/ancestor::button[1]'

  const element = await page.waitForXPath(xPath)

  await element.click()
}

async function typeInTextFieldByLabel(page, label, value) {
  const xPath = '//label[text()="' + label + '"]/..//input'

  const element = await page.waitForXPath(xPath)

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
