const isEqual = (a, b) => {
  Object.keys(a).forEach(key => {
    if (b[key] === undefined) {
      return false
    }

    if (a[key] !== b[key]) {
      return false
    }
  })

  return true
}

export default isEqual