const timeout = 30000
const timeout_quick = 5000

const {
  clickIconButtonByPath,
  typeInTextFieldByLabel,
  clickButtonByLabel,
  clickListButtonByLabel,
} = require('./lib/action-shortcuts')
const rebarLogin = require('./lib/rebar-login')
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
      '010 Log in',
      async () => {
        //

        await rebarLogin(page, {
          username: 'testing-account-kjbewfbbkhasdpqkjwbkxkjnz@example.com',
          password: 'poSDNYG6!7DFEDHBjhkkb#jf$ekbjTCR$VJHMNBasd!HCFH',
        })

        await screenshot(page, 'user-management/todo-as-user/010-log-in.png')
      },
      timeout_quick,
    )

    test(
      '020 Open ToDos',
      async () => {
        //

        await clickListButtonByLabel(page, { label: 'To Dos' })

        await page.waitForXPath('//span[text()="List of TO DOs for user"]')

        await screenshot(
          page,
          'user-management/todo-as-user/020-open-to-dos.png',
        )
      },
      timeout_quick,
    )
  },
  timeout,
)
