const getBoundingClientRect = ele => {
  if (ele) {
    const rect = ele.getBoundingClientRect()

    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
  }

  return {}
}

export default getBoundingClientRect
