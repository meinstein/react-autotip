// local imports
import isEmpty from './is-empty'

describe('utils', () => {
  describe('isEmpty()', () => {
    test('empty obj', () => {
      const res = isEmpty({})
      expect(res).toEqual(true)
    })

    test('non-empty obj', () => {
      const res = isEmpty({a: 2})
      expect(res).toEqual(false)
    })
  })
})
