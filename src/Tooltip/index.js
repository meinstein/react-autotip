// external imports
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Motion, spring, presets } from 'react-motion'
// local imports
import { getBoundingClientRect, calcPosition, enums, isEqual, isEmpty } from '../utils'
import styles, { caretStyles, getTranslation } from './styles'

const initialState = {
  tooltipDims: {},
  showTooltip: false,
  timeoutID: null
}

class Tooltip extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
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
      stiffness: 180,
      damping: 12
    }
  }

  constructor() {
    super()

    this.state = initialState
    this.body = document.getElementsByTagName('body')[0]
  }

  componentDidMount = () => this._addTooltipNode()

  componentWillReceiveProps = nextProps => {
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
    const { delay } = this.props

    if (delay) {
      this.setState(prevState => ({
        ...prevState,
        timeoutID: setTimeout(this._activateTooltip, delay)
      }))
    } else {
      this._activateTooltip()
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

  _removeTooltipNode = () => this._tooltipNode.remove()

  _reset = () => this.setState(() => initialState)

  _addTooltipNode = () => {
    // only add tooltip node to dom if none exists yet
    if (!this._tooltipNode) {
      const newTooltipNode = document.createElement('div')
      newTooltipNode.id = enums.REACT_AUTOTIP
      this.body.appendChild(newTooltipNode)
    }
  }

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
          translate: 4
        }}
        style={{
          opacity: spring(showTooltip ? 1 : 0, presets.stiff),
          translate: spring(showTooltip ? 0 : 4, this.props.motionConfig)
        }}
        onRest={showTooltip ? () => ({}) : this._reset}
      >
        {({opacity, translate}) => (
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
              // interpolated translation props
              transform: getTranslation(translate, pos)
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

export default Tooltip
