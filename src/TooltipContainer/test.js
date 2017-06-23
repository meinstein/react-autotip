// external imports
import React from 'react'
import { mount } from 'enzyme'
import { enums } from '../utils'
// local imports
import TooltipContainer from '.'

describe('Tooltip Container', () => {
  // make sure it returns a component
  test('returns a component', () => {
    // make sure it returned a component
    expect(React.isValidElement(<TooltipContainer />)).toBe(true)
  })

  test('recieves and registers data from custom event', () => {
    // keep track of events being added
    const map = {}
    window.addEventListener = jest.fn((event, cb) => map[event] = cb)

    // render component
    const wrapper = mount(<TooltipContainer />)

    // construct mock detail object
    const detail = {
      text: 'test',
      type: 'info',
      tooltipStyles: {},
      containerDims: {}
    }

    // call method attached to custom event
    map[enums.ON_TOOLTIP]({detail})

    // take snapshot of state
    const state = wrapper.state()

    // remove tooltipDims
    Reflect.deleteProperty(state, 'tooltipDims')

    expect(state).toEqual(detail)
  })
})
