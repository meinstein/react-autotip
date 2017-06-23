// external imports
import React from 'react'
// internal imports
import { TooltipContainer, Tooltip } from '../src'
// local imports
import styles from './styles'

const App = () => (
  <div style={styles.container}>
    {/* must render one instance of TooltipContainer somewhere */}
    <TooltipContainer />
    <div style={{display: 'flex', height: '100vh', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Tooltip
          style={styles.tooltip}
          type="info"
          text="testing the tooltip"
        >
          <div style={styles.infoBox}>
            type=info
          </div>
        </Tooltip>
        <Tooltip
          style={styles.tooltip}
          type="dialog"
          text="testing the tooltip"
        >
          <div style={styles.dialogBox}>
            type=dialog
          </div>
        </Tooltip>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Tooltip
          style={styles.tooltip}
          type="info"
          text="testing the tooltip"
        >
          <div style={styles.infoBox}>
            type=info
          </div>
        </Tooltip>
        <Tooltip
          style={styles.tooltip}
          type="dialog"
          text="testing the tooltip"
        >
          <div style={styles.dialogBox}>
            type=dialog
          </div>
        </Tooltip>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Tooltip
          style={styles.tooltip}
          type="info"
          text="testing the tooltip"
        >
          <div style={styles.infoBox}>
            type=info
          </div>
        </Tooltip>
        <Tooltip
          style={styles.tooltip}
          type="dialog"
          text="testing the tooltip"
        >
          <div style={styles.dialogBox}>
            type=dialog
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
)

export default App
