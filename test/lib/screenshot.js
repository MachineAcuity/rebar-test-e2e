const fs = require('fs')
const path = require('path')

const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG

async function screenshot(page, imagePath) {
  const fileNameSession = path.join('screenshots/session/' + imagePath)
  const fileNameEtalon = path.join('screenshots/etalon/' + imagePath)

  if (fs.existsSync(fileNameEtalon)) {
    // Etalon exists - create session screenshot and compare
    fs.mkdirSync(path.dirname(fileNameSession), { recursive: true })
    await page.screenshot({ path: fileNameSession })

    const imgSession = PNG.sync.read(fs.readFileSync(fileNameSession))
    const imgEtalon = PNG.sync.read(fs.readFileSync(fileNameEtalon))
    const { width, height } = imgSession
    const imgDiff = new PNG({ width, height })

    const numDiffPixels = pixelmatch(
      imgSession.data,
      imgEtalon.data,
      imgDiff.data,
      width,
      height,
      { threshold: 0.1 },
    )

    if (numDiffPixels > 0) {
      const fileNameDiff = path.join('screenshots/diff/' + imagePath)

      fs.mkdirSync(path.dirname(fileNameDiff), { recursive: true })
      fs.writeFileSync(fileNameDiff, PNG.sync.write(imgDiff))
    }
  } else {
    // Etalon does not exist - maybe this is a first run of the test - create etalon
    fs.mkdirSync(path.dirname(fileNameEtalon), { recursive: true })
    await page.screenshot({ path: fileNameEtalon })
  }
}

module.exports = screenshot
