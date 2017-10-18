// external imports
import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
// local imports
import { isEqual, getBoundingClientRect, calcPosition, enums } from '../utils'
import styles, { caretStyles } from './styles'

const motionConfig = {
  stiffness: 150,
  damping: 20
}

const initialState = {
  text: '',
  type: '',
  containerDims: {},
  tooltipDims: {},
  showTooltip: false
}

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

  state = initialState

  componentDidMount() {
    window.addEventListener(enums.ON_TOOLTIP, this._setTooltip)
  }

  componentWillUnmount() {
    window.removeEventListener(enums.ON_TOOLTIP, this._setTooltip)
  }

  componentDidUpdate(_, { tooltipDims: previousDims }) {
    const currentDims = getBoundingClientRect(this.tooltip)

    if (!isEqual(previousDims, currentDims)) {
      this.setState({ tooltipDims: currentDims })
    }
  }

  _setTooltip = ({ detail }) => {
    // if we have valid tooltip data to display
    if (detail.text) {
      this.setState(prevState => ({
        ...prevState,
        ...detail,
        tooltipDims: {},
        showTooltip: true,
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        showTooltip: false
      }))
    }
  }

  _getTranslation = (val, pos) => {
    switch (pos) {
    case 'top':
      return `translate(-50%, calc(${val}px - 100%))`
    case 'right':
      return `translate(${-val}px, -50%)`
    case 'bottom':
      return `translate(-50%, ${-val}px)`
    case 'left':
      return `translate(calc(${val}px - 100%), -50%)`
    default:
      return null
    }
  }

  render() {
    const { text, type, tooltipStyles, containerDims, tooltipDims, showTooltip } = this.state
    const { offset, padding, caretSize } = this.props
    const { pos = 'top', ...rest } = calcPosition({ containerDims, tooltipDims, offset, padding })

    return (
      <Motion
        defaultStyle={{
          opacity: 0,
          translate: 4
        }}
        style={{
          opacity: spring(showTooltip ? 1 : 0, motionConfig),
          translate: spring(showTooltip ? 0 : 4, motionConfig)
        }}
        onRest={() => !showTooltip && this.setState(() => initialState)}
      >
        {({opacity, translate}) => {
          return <div
            ref={ele => this.tooltip = ele}
            style={{
              ...styles.container[type],
              ...rest,
              ...tooltipStyles,
              opacity,
              transform: this._getTranslation(translate, pos)
            }}
          >
            <div style={styles.content[type]}>
              {text}
              {type === 'info' && <div style={caretStyles({caretSize})[pos]} />}
            </div>
          </div>
        }}
      </Motion>
    )
  }
}

export default TooltipContainer
