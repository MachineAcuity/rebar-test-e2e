const TestSequencer = require('@jest/test-sequencer').default

class SortedSequencer extends TestSequencer {
  sort(tests) {
    return tests
  }
}

module.exports = SortedSequencer
