// local imports
import calcPosition, { offset, padding } from './calc-position'

// dims of container that spawns tooltip
const container = { height: 25, width: 25 }
// dims of tooltip
const tooltipDims = { height: 50, width: 100 }


describe('utils', () => {
  describe('calcPosition()', () => {

    beforeEach(() => global.window = ({ innerWidth: 500 }))

    test('returns empty object when tooltip dims not available', () => {
      const res = calcPosition({ tooltipDims: {} })
      expect(res).toEqual({})
    })

    test('can position to the top of container (default)', () => {
      // the dims of the container that spawns the tooltip
      const containerDims = { ...container, top: 100, left: 100 }
      const res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('top')
    })

    test('can position to the right of container', () => {
      const left = padding + (tooltipDims.width / 2) - (container.width / 2)

      const containerDims = { ...container, top: 100, left }
      let res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('top')



      containerDims.left = left - 1
      res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('right')
    })

    test('can position to the left of container', () => {
      const left = window.innerWidth - (tooltipDims.width / 2) - padding - (container.width / 2)

      const containerDims = { ...container, top: 100, left }
      let res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('top')

      containerDims.left = left + 1
      res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('left')
    })

    test('can position to the bottom of container', () => {
      const top = padding + tooltipDims.height + offset

      const containerDims = { ...container, left: 100, top }
      let res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('top')

      containerDims.top = top - 1
      res = calcPosition({ containerDims, tooltipDims })
      expect(res.pos).toEqual('bottom')
    })
  })
})
