const fs = require('fs')

async function screenshot(page, imagePath) {
  const fileNameSession = 'screenshots/session/' + imagePath
  const fileNameEtalon = 'screenshots/etalon/' + imagePath

  if (fs.existsSync(fileNameEtalon)) {
    // Etalon exists - create session screenshot and compare
    await page.screenshot({
      path: fileNameSession,
    })
  } else {
    // Etalon does not exist - maybe this is a first run of the test - create etalon
    await page.screenshot({
      path: fileNameEtalon,
    })
  }
}

module.exports = screenshot
