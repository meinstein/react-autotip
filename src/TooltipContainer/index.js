// external imports
import React from 'react'
import PropTypes from 'prop-types'
// local imports
import { isEmpty, isEqual, getBoundingClientRect, calcPosition, enums } from '../utils'
import styles, { caretStyles } from './styles'
import './styles.scss'


class TooltipContainer extends React.Component {

  static propTypes = {
    // the offset between the tooltip and the tooltip's parent
    offset: PropTypes.number,
    // the padding between the edge of the window and the tooltip
    padding: PropTypes.number,
    // the size of the caret on info tooltips
    caretSize: PropTypes.number,
  }

  static defaultProps = {
    offset: enums.offset,
    padding: enums.padding,
    caretSize: enums.caretSize
  }

  componentDidMount() {
    window.addEventListener(enums.ON_TOOLTIP, this.setTooltip)
  }

  componentWillUnmount() {
    window.removeEventListener(enums.ON_TOOLTIP, this.setTooltip)
  }

  componentDidUpdate(_, { tooltipDims: previousDims }) {
    const currentDims = getBoundingClientRect(this.tooltip)

    if (!isEqual(previousDims, currentDims)) {
      this.setState({ tooltipDims: currentDims })
    }
  }

  setTooltip({ detail }) {
    this.setState({
      ...detail,
      tooltipDims: {}
    })
  }

  render() {
    const { text, type, tooltipStyles, containerDims, tooltipDims } = this.state
    const { offset, padding, caretSize } = this.props
    const { pos = 'top', ...rest } = calcPosition({ containerDims, tooltipDims, offset, padding })

    return (
      <div
        className={`react-autotip-${isEmpty(rest) ? 'hidden' : `active-${pos}`}`}
        style={{ ...styles.container[type], ...rest, ...tooltipStyles }}
        ref={ele => this.tooltip = ele}
      >
        <div style={styles.content[type]}>
          {text}
          {type === 'info' && <div style={caretStyles({caretSize})[pos]} />}
        </div>
      </div>
    )
  }

  constructor() {
    super()

    this.state = {
      text: '',
      type: '',
      containerDims: {},
      tooltipDims: {},
    }

    this.setTooltip = this.setTooltip.bind(this)
  }
}

export default TooltipContainer
