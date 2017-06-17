import { styles } from '../utils'

const caretSize = 5

const container = {
  position: 'fixed',
  fontFamily: styles.fontFamily,
  zIndex: 100,
}

const content = {
  position: 'relative',
  lineHeight: 1,
}

const caret = {
  width: 0,
  height: 0,
  position: 'absolute',
  borderStyle: 'solid',
}

export default {
  container: {
    info: {
      ...container,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: styles.opaqueGrey,
      color: 'white',
      pointerEvents: 'none',
      borderRadius: 4,
    },
    dialog: {
      ...container,
      backgroundColor: 'white',
      border: `1px solid ${styles.lightgrey}`,
      boxShadow: '0 2px 17px 0 rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      minWidth: 150,
      maxWidth: 300
    }
  },
  content: {
    info: {
      ...content,
      padding: 1.5 * styles.unit,
    },
    dialog: {
      ...content,
      padding: 3 * styles.unit,
    }
  },
  caret: {
    top: {
      ...caret,
      left: '50%',
      transform: 'translateX(-50%)',
      borderColor: `${styles.opaqueGrey} transparent transparent transparent`,
      borderWidth: `${caretSize}px ${caretSize}px 0 ${caretSize}px`,
      bottom: -caretSize,
    },
    right: {
      ...caret,
      top: '50%',
      transform: 'translateY(-50%)',
      borderColor: `transparent ${styles.opaqueGrey} transparent transparent`,
      borderWidth: `${caretSize}px ${caretSize}px ${caretSize}px 0`,
      left: -caretSize,
    },
    left: {
      ...caret,
      top: '50%',
      transform: 'translateY(-50%)',
      borderColor: `transparent transparent transparent ${styles.opaqueGrey}`,
      borderWidth: `${caretSize}px 0 ${caretSize}px ${caretSize}px`,
      right: -caretSize,
    },
    bottom: {
      ...caret,
      left: '50%',
      transform: 'translateX(-50%)',
      borderColor: `transparent transparent ${styles.opaqueGrey} transparent`,
      borderWidth: `0 ${caretSize}px ${caretSize}px ${caretSize}px`,
      top: -caretSize,
    }
  }
}
