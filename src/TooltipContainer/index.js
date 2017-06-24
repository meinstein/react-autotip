// external imports
import React from 'react'
import PropTypes from 'prop-types'
// local imports
import { isEmpty, isEqual, getBoundingClientRect, calcPosition, enums } from '../utils'
import styles, { caretStyles } from './styles'
import './styles.css'


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
    offset: 8,
    padding: 16,
    caretSize: 5
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
        className={`react-autotip-${isEmpty(rest) ? 'hidden' : 'active'}`}
        style={{ ...styles.container[type], ...rest, ...tooltipStyles }}
        ref={tooltip => this.tooltip = tooltip}
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
