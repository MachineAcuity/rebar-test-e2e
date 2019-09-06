const {
  clickIconButtonByPath,
  typeInTextFieldByLabel,
  clickButtonByLabel,
} = require('./action-shortcuts')

async function rebarLogin(page, { username, password }) {
  // Click burger menu
  await clickIconButtonByPath(page, {
    iconPathD: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
  })

  // Click log in, wait for log in
  await clickButtonByLabel(page, { label: 'Log In' })
  await page.waitForXPath('//h2[text()="Log In"]')

  // Populate credentials
  await typeInTextFieldByLabel(page, {
    label: 'E-Mail Address',
    value: username,
  })
  await typeInTextFieldByLabel(page, {
    label: 'Password',
    value: password,
  })

  // Click login button
  await clickButtonByLabel(page, { label: 'Log In', order: 2 })

  // Wait to log in, for now just dumb wait for two seconds
  await page.waitFor(2000)

  // Click burger menu
  await clickIconButtonByPath(page, {
    iconPathD: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
  })

  // Verify current user
  const currentUser = (await page.$x(
    '//em[text()="' +
      username +
      '"]/parent::div/parent::div/parent::div/label[text()="Current User"]',
  ))[0]
  expect(currentUser != null).toBe(true)
}

module.exports = rebarLogin
