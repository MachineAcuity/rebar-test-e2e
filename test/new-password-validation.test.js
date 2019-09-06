const timeout = 30000
const timeout_quick = 5000

const {
  clickIconButtonByPath,
  typeInTextFieldByLabel,
  clickButtonByLabel,
} = require('./lib/action-shortcuts')
const screenshot = require('./lib/screenshot')

describe(
  'New user / new password',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('https://rebar-demo.machineacuity.com/')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    test(
      '010 Open home page and verify home page content',
      async () => {
        //

        const element = await page.waitForXPath(
          '//*[@id="root"]/div/div/main/div/div[1]/div[2]/p',
        )

        expect(
          (await element.getProperty('textContent'))._remoteObject.value,
        ).toBe(
          'The Rebar is and open source project representing basic foundation of the solutions we provide. It fully utilizes the react stack, and Node.js and Cassandra on the back end. It can be used both as boilerplate, as well as an educational tool with multiple examples available. Basic user account management including account creation, password strength indicator and user profile is also included. The boilerplate is optimized for supportability and update-ability. It allows us to update the multiple projects based on the boilerplate with minimum effort, providing new features, improvements and bug fixes. This is achieved through the following two approaches:',
        )

        await screenshot(
          page,
          'user-management/new-password-validation/010-home-page.png',
        )
      },
      timeout,
    )

    test(
      '020 Click burger and open menu',
      async () => {
        //

        await clickIconButtonByPath(page, {
          iconPathD: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
        })

        await page.waitForXPath('//h6[text()="Machine Acuity\'s Rebar"]')

        await screenshot(
          page,
          'user-management/new-password-validation/020-open-menu.png',
        )
      },
      timeout_quick,
    )

    test(
      '030 Click log in',
      async () => {
        //

        await clickButtonByLabel(page, 'Log In')

        await page.waitForXPath('//h2[text()="Log In"]')

        await screenshot(
          page,
          'user-management/new-password-validation/030-log-in.png',
        )
      },
      timeout_quick,
    )

    test(
      '040 Click new user',
      async () => {
        //

        await clickButtonByLabel(page, 'New User')

        await page.waitForXPath('//div[text()="Create new user"]')

        await screenshot(
          page,
          'user-management/new-password-validation/040-new-user.png',
        )
      },
      timeout_quick,
    )

    test(
      '050 Type user name and mismatched password',
      async () => {
        //

        await typeInTextFieldByLabel(page, {
          label: 'E-Mail Address',
          value: 'some-person@example.com',
        })
        await typeInTextFieldByLabel(page, {
          label: 'Password',
          value: 'pass-1',
        })
        await typeInTextFieldByLabel(page, {
          label: 'Confirm password',
          value: 'pass-2',
        })

        // Wait for password quality slider animation
        await page.waitFor(500)

        await screenshot(
          page,
          'user-management/new-password-validation/050-password-mismatch.png',
        )

        const message = await page.waitForXPath(
          '//*[@id="root"]/div/div/main/div/div/div[2]/div[1]/div[2]/h6',
        )
        expect(
          (await message.getProperty('textContent'))._remoteObject.value,
        ).toBe('Passwords do not match')
      },
      timeout_quick,
    )

    test(
      '060 Matching, but overly short passwords',
      async () => {
        //

        await typeInTextFieldByLabel(page, {
          label: 'Password',
          value: 'abc',
          clear: true,
        })
        await typeInTextFieldByLabel(page, {
          label: 'Confirm password',
          value: 'abc',
          clear: true,
        })

        // Wait for password quality slider animation
        await page.waitFor(500)

        await screenshot(
          page,
          'user-management/new-password-validation/060-short-password.png',
        )

        const message = await page.waitForXPath(
          '//*[@id="root"]/div/div/main/div/div/div[2]/div[1]/div[2]/h6',
        )
        expect(
          (await message.getProperty('textContent'))._remoteObject.value,
        ).toBe('Password strength: poor')
      },
      timeout_quick,
    )

    test(
      '070 Matching, longer passwords',
      async () => {
        //

        await typeInTextFieldByLabel(page, {
          label: 'Password',
          value: 'a1b2c3d4e#',
          clear: true,
        })
        await typeInTextFieldByLabel(page, {
          label: 'Confirm password',
          value: 'a1b2c3d4e#',
          clear: true,
        })

        // Wait for password quality slider animation
        await page.waitFor(500)

        await screenshot(
          page,
          'user-management/new-password-validation/070-longer-password.png',
        )

        const message = await page.waitForXPath(
          '//*[@id="root"]/div/div/main/div/div/div[2]/div[1]/div[2]/h6',
        )
        expect(
          (await message.getProperty('textContent'))._remoteObject.value,
        ).toBe('Password strength: fair')
      },
      timeout_quick,
    )

    test(
      '080 Matching, good passwords',
      async () => {
        //

        await typeInTextFieldByLabel(page, {
          label: 'Password',
          value: 'a1b2c3d4e#@(HJaERn1',
          clear: true,
        })
        await typeInTextFieldByLabel(page, {
          label: 'Confirm password',
          value: 'a1b2c3d4e#@(HJaERn1',
          clear: true,
        })

        // Wait for password quality slider animation
        await page.waitFor(500)

        await screenshot(
          page,
          'user-management/new-password-validation/080-good-password.png',
        )

        const message = await page.waitForXPath(
          '//*[@id="root"]/div/div/main/div/div/div[2]/div[1]/div[2]/h6',
        )
        expect(
          (await message.getProperty('textContent'))._remoteObject.value,
        ).toBe('Password strength: good')
      },
      timeout_quick,
    )
  },
  timeout,
)
