const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const mkdirp = require('mkdirp')
const os = require('os')
const puppeteer = require('puppeteer')
const rimraf = require('rimraf')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async function setup() {
  console.log(chalk.green('Setup Puppeteer'))
  const browser = await puppeteer.launch({})

  // This global is not available inside tests but only in global teardown
  global.__BROWSER_GLOBAL__ = browser

  // Instead, we expose the connection details via file system to be used in tests
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())

  rimraf.sync('screenshots/diff')
  rimraf.sync('screenshots/session')
}
