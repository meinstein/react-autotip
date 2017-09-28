// external imports
import React from 'react'
import { mount } from 'enzyme'

// local imports
import Tooltip from '.'

describe('Tooltip', () => {
  // stub dispatchEvent method
  beforeEach(() => global.dispatchEvent = jest.fn())

  // make sure it returns a component
  test('returns a component', () => {
    // make sure it returned a component
    expect(React.isValidElement(<Tooltip text="test">test</Tooltip>)).toBe(true)
  })

  test('onMouseEnter triggers dispatchEvent', () => {
    // render component
    const wrapper = mount(
      <Tooltip text="test">
        <span>test</span>
      </Tooltip>
    )

    // simulate mouseenter on tooltip container
    wrapper.find('div').first().simulate('mouseenter')
    // verify that dispatchEvent was called
    expect(global.dispatchEvent.mock.calls.length).toBe(1)
  })

  test('onMouseLeave triggers dispatchEvent', () => {
    // render component
    const wrapper = mount(
      <Tooltip text="test">
        <span>test</span>
      </Tooltip>
    )

    // simulate mouseleave on tooltip container
    wrapper.find('div').first().simulate('mouseleave')
    // verify that dispatchEvent was called
    expect(global.dispatchEvent.mock.calls.length).toBe(1)
  })

  test('onClick triggers dispatchEvent', () => {
    // render component
    const wrapper = mount(
      <Tooltip text="test">
        <span>test</span>
      </Tooltip>
    )

    // simulate click on tooltip container
    wrapper.find('div').first().simulate('click')
    // verify that dispatchEvent was called
    expect(global.dispatchEvent.mock.calls.length).toBe(1)
  })

  test('toggleOnClick requires click event in order to dispatchEvent', () => {
    // render component
    const wrapper = mount(
      <Tooltip text="test" toggleOnClick>
        <span>test</span>
      </Tooltip>
    )

    // simulate mouseenter on tooltip container
    wrapper.find('div').first().simulate('mouseenter')
    // verify that dispatchEvent was was NOT called
    expect(global.dispatchEvent.mock.calls.length).toBe(0)

    // simulate click on tooltip container
    wrapper.find('div').first().simulate('click')
    // verify that dispatchEvent was called
    expect(global.dispatchEvent.mock.calls.length).toBe(1)
  })
})
