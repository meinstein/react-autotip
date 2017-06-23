const isEqual = (a, b) => {
  for (const [key, value] of Object.entries(a)) {
    if (b[key] !== value) {
      return false
    }
  }

  return true
}

export default isEqual
