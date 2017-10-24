// external imports
import React from 'react'
import PropTypes from 'prop-types'
// local imports
import { enums } from '../utils'

class PortalProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  }

  static defaultProps = {
    style: {}
  }

  componentDidMount = () => {
    // grab style prop
    const { style: styleObj } = this.props
    // create the tooltip element
    const element = document.createElement('div')
    // assign the react-autotip id to element
    element.id = enums.REACT_AUTOTIP
    // assign any passed in style
    Object.keys(styleObj).forEach(style => element.style[style] = styleObj[style])
    // grab the document body
    const body = document.getElementsByTagName('body')[0]
    // append the tooltip
    body.appendChild(element)
  }

  componentWillUnmount = () => document.getElementById(enums.REACT_AUTOTIP).remove()

  render = () => this.props.children
}

export default PortalProvider
