export default function(a, b) {
  // grab keys of respective objects
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  // if two empty objects
  if (aKeys.length === 0 && bKeys.length === 0) {
    return true
  }

  // if lengths are different
  if (aKeys.length !== bKeys.length) {
    return false
  }

  for (const key of aKeys) {
    if (a[key] !== b[key]) {
      return false
    }
  }

  return true
}
