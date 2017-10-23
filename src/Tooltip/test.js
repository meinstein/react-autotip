// external imports
import React from 'react'

// local imports
import Tooltip from '.'

describe('Tooltip', () => {
  // make sure it returns a component
  test('returns a component', () => {
    // make sure it returned a component
    expect(React.isValidElement(<Tooltip text="test">test</Tooltip>)).toBe(true)
  })
})
