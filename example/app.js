// external imports
import React from 'react'
// internal imports
import { Tooltip } from '../src'
// local imports
import styles from './styles'

const App = () => (
  <div style={styles.container}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{}}>
        <Tooltip
          style={styles.tooltip}
          type="info"
          text="testing the tooltip"
          delay={350}
        >
          <div style={styles.infoBox}>
            type=info
            <br/>
            delay=350ms
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
      <div style={{}}>
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
      <div style={{}}>
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
          delay={500}
        >
          <div style={styles.dialogBox}>
            type=dialog <br/>
            delay=500ms
          </div>
        </Tooltip>
      </div>
    </div>

    {/* click to toggle example */}
    <div style={{marginTop: 50}}>
      <Tooltip
        style={styles.tooltip}
        type="info"
        text="testing the tooltip"
        toggleOnClick
      >
        <div style={styles.infoBox}>
          toggleOnClick
          <br/>
          type=info
        </div>
      </Tooltip>
      <Tooltip
        style={styles.tooltip}
        type="dialog"
        text="testing the tooltip"
        toggleOnClick
      >
        <div style={styles.dialogBox}>
          toggleOnClick
          <br/>
          type=dialog
        </div>
      </Tooltip>
    </div>
  </div>
)

export default App
