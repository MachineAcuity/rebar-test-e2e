const TestSequencer = require('@jest/test-sequencer').default

class SortedSequencer extends TestSequencer {
  sort(tests) {
    tests = tests.sort((a, b) => {
      if (a.path < b.path) {
        return -1
      }
      if (a.path > b.path) {
        return 1
      }

      return 0
    })

    return tests
  }
}

module.exports = SortedSequencer
