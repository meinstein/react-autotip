// external imports
import React from 'react'
import PropTypes from 'prop-types'
// local imports
import { getBoundingClientRect, enums } from '../utils'
import styles from './styles'


class Tooltip extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    toggleOnClick: PropTypes.bool,
    tooltipStyles: PropTypes.object,
    type: PropTypes.oneOf(['info', 'dialog'])
  }

  static defaultProps = {
    type: 'info'
  }

  _dispatch() {
    // constructor custom event
    const event = new CustomEvent(enums.ON_TOOLTIP, {
      detail: {
        text: this.props.text,
        type: this.props.type,
        tooltipStyles: this.props.tooltipStyles,
        containerDims: getBoundingClientRect(this.node)
      }
    })

    // dispatch event
    window.dispatchEvent(event)
  }

  _clear() {
    // constructor custom event
    const event = new CustomEvent(enums.ON_TOOLTIP, {
      detail: {
        text: '',
        type: '',
        tooltipStyles: {},
        containerDims: {}
      }
    })

    // dispatch event
    window.dispatchEvent(event)
  }

  render() {
    const { toggleOnClick } = this.props

    return (
      <div
        ref={node => this.node = node}
        style={{...styles.container, ...this.props.style}}
        onClick={toggleOnClick ? this._dispatch : this._clear}
        onScroll={this._clear}
        onMouseLeave={this._clear}
        onMouseEnter={!toggleOnClick && this._dispatch}
      >
        {this.props.children}
      </div>
    )
  }

  constructor() {
    super()

    this._dispatch = this._dispatch.bind(this)
    this._clear = this._clear.bind(this)
  }
}

export default Tooltip
