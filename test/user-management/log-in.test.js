const timeout = 5000

const {
  clickIconButtonByPath,
  typeInTextFieldByLabel,
  clickButtonByLabel,
} = require('../lib/action-shortcuts')

describe(
  'Log in',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('https://rebar-demo.machineacuity.com/')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    test('Open home page and verify home page content', async () => {
      //

      const element = await page.waitForXPath(
        '//*[@id="root"]/div/div/main/div/div[1]/div[2]/p',
      )

      expect(
        (await element.getProperty('textContent'))._remoteObject.value,
      ).toBe(
        'The Rebar is and open source project representing basic foundation of the solutions we provide. It fully utilizes the react stack, and Node.js and Cassandra on the back end. It can be used both as boilerplate, as well as an educational tool with multiple examples available. Basic user account management including account creation, password strength indicator and user profile is also included. The boilerplate is optimized for supportability and update-ability. It allows us to update the multiple projects based on the boilerplate with minimum effort, providing new features, improvements and bug fixes. This is achieved through the following two approaches:',
      )
      await page.screenshot({
        path: 'screenshot/user-management/log-in/home-page.png',
      })
    })

    test('Click burger and open menu', async () => {
      //

      await clickIconButtonByPath(page, {
        iconPathD: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
      })

      await page.waitForXPath('//h6[text()="Machine Acuity\'s Rebar"]')
      await page.screenshot({
        path: 'screenshot/user-management/log-in/home-page-open-menu.png',
      })
    })

    test('Click log in', async () => {
      //

      await clickButtonByLabel(page, 'Log In')

      await page.waitForXPath('//h2[text()="Log In"]')
      await page.screenshot({
        path: 'screenshot/user-management/log-in/home-page-log-in.png',
      })
    })

    test('Type user name and password', async () => {
      //

      await typeInTextFieldByLabel(page, 'E-Mail Address', 'my email')
      await typeInTextFieldByLabel(page, 'Password', 'a big secret here')

      await page.screenshot({
        path:
          'screenshot/user-management/log-in/home-page-log-in-with-credentials.png',
      })

      // Press button

      //     await page.waitForXPath('//h2[text()="Log In Failed"]')

      // TODO: Implement https://meowni.ca/posts/2017-puppeteer-tests/
    })
  },
  timeout,
)
