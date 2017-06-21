import { styles } from '../utils'

const caretSize = 5

const container = {
  position: 'fixed',
  fontFamily: styles.fontFamily,
  zIndex: 100,
  borderRadius: 2,
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
    },
    dialog: {
      ...container,
      backgroundColor: 'white',
      border: `1px solid ${styles.lightgrey}`,
      boxShadow: '0px 4px 14px 1px rgba(0, 0, 0, 0.1)',
    }
  },
  content: {
    info: {
      ...content,
      padding: 2 * styles.unit,
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
