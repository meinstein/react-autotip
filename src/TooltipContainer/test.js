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
    const events = {}
    // stub event being added
    window.addEventListener = jest.fn((event, cb) => events[event] = cb)
    // stub remove event listener
    window.removeEventListener = jest.fn()

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
    events[enums.ON_TOOLTIP]({detail})

    // take snapshot of state
    const state = wrapper.state()

    // remove tooltipDims
    Reflect.deleteProperty(state, 'tooltipDims')

    expect(state).toEqual(detail)

    // no unmount the component
    wrapper.unmount()

    // make sure we remove event listener on unmount
    expect(window.removeEventListener.mock.calls.length).toBe(1)
  })
})
