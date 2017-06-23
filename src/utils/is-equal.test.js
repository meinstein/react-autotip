// local imports
import isEqual from './is-equal'

describe('utils', () => {
  describe('isEqual()', () => {

    test('two empty objects', () => {
      const res = isEqual({}, {})
      expect(res).toEqual(true)
    })

    test('one empty and one non-empty obj', () => {
      const res = isEqual({}, {a: 2})
      expect(res).toEqual(false)
    })

    test('two objects with diff num of keys', () => {
      const res = isEqual({a: 2, b: 1}, {a: 2})
      expect(res).toEqual(false)
    })

    test('two objects with same keys/props in diff order', () => {
      const res = isEqual({a: 2, b: 1}, {b: 1, a: 2})
      expect(res).toEqual(true)
    })

    test('two objects with same keys but diff props', () => {
      const res = isEqual({a: 10, b: 11}, {a: 12, b: 13})
      expect(res).toEqual(false)
    })
  })
})
