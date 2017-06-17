// external imports
import React from 'react'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import extend from 'lodash/extend'
// local imports
import { calcPosition, enums } from '../utils'
import styles from './styles'
import './styles.css'

class TooltipContainer extends React.Component {


  componentDidMount() {
    window.addEventListener(enums.ON_TOOLTIP, this.setTooltip)
  }

  componentWillUnmount() {
    window.removeEventListener(enums.ON_TOOLTIP, this.setTooltip)
  }

  componentDidUpdate(_, { tooltipDims: previousDims }) {
    const currentDims = extend({}, this.tooltip.getBoundingClientRect())

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
    const { text, type, containerDims, tooltipDims } = this.state
    const { pos = 'top', ...rest } = calcPosition({ containerDims, tooltipDims })

    return (
      <div
        className={`ds-tooltip-${isEmpty(rest) ? 'hidden' : 'active'}`}
        style={{ ...styles.container[type], ...rest }}
        ref={tooltip => this.tooltip = tooltip}
      >
        <div style={styles.content[type]}>
          {text}
          {type === 'info' && <div style={styles.caret[pos]} />}
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
