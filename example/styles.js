const box = {
  padding: 16,
  borderRadius: 4
}

export default {
  container: {
    width: '100vw',
    height: '100vh'
  },
  infoBox: {
    ...box,
    background: 'steelblue'
  },
  dialogBox: {
    ...box,
    background: 'indianred'
  },
  tooltip: {
    margin: 16,
  }
}
