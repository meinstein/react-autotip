// external imports
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Motion, spring, presets } from 'react-motion'
// local imports
import { getBoundingClientRect, calcPosition, enums, isEqual, isEmpty } from './utils'
import styles, { caretStyles, getMargin } from './styles'

const initialState = {
  tooltipDims: {},
  showTooltip: false,
  timeoutID: null
}

class Tooltip extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.node,
    style: PropTypes.object,
    toggleOnClick: PropTypes.bool,
    tooltipStyles: PropTypes.object,
    type: PropTypes.oneOf(['info', 'dialog']),
    // the offset between the tooltip and the tooltip's parent
    offset: PropTypes.number,
    // the padding between the edge of the window and the tooltip
    padding: PropTypes.number,
    // the size of the caret on info tooltips
    caretSize: PropTypes.number,
    motionConfig: PropTypes.shape({
      stiffness: PropTypes.number,
      damping: PropTypes.number
    }),
    delay: PropTypes.number
  }

  static defaultProps = {
    type: 'info',
    offset: enums.offset,
    padding: enums.padding,
    caretSize: enums.caretSize,
    motionConfig: {
      stiffness: 210,
      damping: 20
    }
  }

  state = initialState

  componentWillReceiveProps = nextProps => {
    // hide tooltip if the text is removed
    if (this.props.text && !nextProps.text) {
      this._hideTooltip()
    }
  }

  componentDidUpdate = (_, { tooltipDims: previousDims }) => {
    const currentDims = getBoundingClientRect(this.tooltip)

    if (!isEqual(previousDims, currentDims)) {
      this.setState(prevState => ({
        ...prevState,
        tooltipDims: currentDims
      }))
    }
  }

  _showTooltip = () => {
    const { delay, text } = this.props
    // only show if there is some text provided
    if (text) {
      if (delay) {
        this.setState(prevState => ({
          ...prevState,
          timeoutID: setTimeout(this._activateTooltip, delay)
        }))
      } else {
        this._activateTooltip()
      }
    }
  }

  _activateTooltip = () => this.setState(prevState => ({
    ...prevState,
    showTooltip: true
  }))

  _hideTooltip = () => this.setState(prevState => {
    clearTimeout(prevState.timeoutID)
    return {
      ...prevState,
      showTooltip: false,
      timeoutID: null
    }
  })

  get _tooltipNode() {
    return document.getElementById(enums.REACT_AUTOTIP)
  }

  _reset = () => this.setState(() => initialState)

  get _tooltip() {
    // get the dims of the container element
    const containerDims = getBoundingClientRect(this.containerNode)
    // grab state
    const { showTooltip, tooltipDims } = this.state
    // grab tooltip props
    const { text, type, offset, padding, caretSize, tooltipStyles } = this.props
    // grab position data
    const { pos = 'top', ...rest } = calcPosition({ containerDims, tooltipDims, offset, padding })

    return (
      <Motion
        defaultStyle={{
          opacity: 0,
          margin: 4
        }}
        style={{
          opacity: spring(showTooltip ? 1 : 0, presets.stiff),
          margin: spring(showTooltip ? 0 : 4, this.props.motionConfig)
        }}
        onRest={showTooltip ? () => ({}) : this._reset}
      >
        {({opacity, margin}) => (
          <div
            ref={node => this.tooltip = node}
            style={{
              // pre-cooked styles depending on type
              ...styles.tooltipContainer[type],
              // positional data
              ...rest,
              // any custom user-provided styles
              ...tooltipStyles,
              // interpolated opacity prop
              opacity,
              // interpolated margin
              ...getMargin(margin, pos)
            }}
          >
            <div style={styles.content[type]}>
              {text}
              {type === 'info' && <div style={caretStyles({caretSize})[pos]} />}
            </div>
          </div>
        )}
      </Motion>
    )
  }

  render = () => (
    <div
      ref={node => this.containerNode = node}
      style={{...styles.container, ...this.props.style}}
      onClick={this.props.toggleOnClick ? this._showTooltip : this._hideTooltip}
      onScroll={this._hideTooltip}
      onMouseLeave={this._hideTooltip}
      onMouseEnter={this.props.toggleOnClick ? () => ({}) : this._showTooltip}
    >
      {this.props.children}
      {(this.state.showTooltip || !isEmpty(this.state.tooltipDims)) && (
        ReactDOM.createPortal(this._tooltip, this._tooltipNode)
      )}
    </div>
  )
}

// exports
export default Tooltip
export TooltipPortalProvider from './Provider'
