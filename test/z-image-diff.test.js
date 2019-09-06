const fs = require('fs')

describe('Screenshot differences', () => {
  test('Diff directory does not exist', async () => {
    expect(fs.existsSync('screenshots/diff/')).toBe(false)
  })
})
