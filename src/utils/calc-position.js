// external imports
import { isEmpty } from '.'

const calcPosition = ({ containerDims, tooltipDims, offset, padding }) => {
  // return empty when container or tooltip dims not provided
  if (isEmpty(containerDims) || isEmpty(tooltipDims)) {
    return {}
  }

  // the dims of the parent element that spawns the tooltip
  const { top, left, width, height } = containerDims
  // container's horizontal center point
  const horizontalCenter = left + (width / 2)
  // container's vertical center point
  const verticalCenter = top + (height / 2)

  // top, left, translateX, and translateY values for positioning
  // the tooltip in a centered fashion across various orientations
  const positions = {
    top: {
      top: top - offset,
      left: horizontalCenter
    },
    bottom: {
      top: top + height + offset,
      left: horizontalCenter
    },
    left: {
      top: verticalCenter,
      left: left - offset
    },
    right: {
      top: verticalCenter,
      left: left + width + offset
    }
  }

  // default pos
  let pos = 'top'

  // container's top, minus offset, minus the tooltip's height,
  // minus window padding, is less than zero
  if ((top - offset - tooltipDims.height - padding) < 0) {
    pos = 'bottom'
  }

  // container's center-point val, minus half the tooltip's width,
  // minus the window padding is less than 0
  if ((horizontalCenter - (tooltipDims.width / 2) - padding) < 0) {
    pos = 'right'
  }

  // container's center-point val plus half the tooltip's width,
  // plus the window padding, exceeds the window's inner width
  if ((horizontalCenter + (tooltipDims.width / 2) + padding) > window.innerWidth) {
    pos = 'left'
  }

  return {
    pos,
    top: positions[pos].top,
    left: positions[pos].left
  }
}

export default calcPosition
