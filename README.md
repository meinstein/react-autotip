# react-autotip

[![Build Status](https://travis-ci.org/meinstein/react-autotip.svg?branch=master)](https://travis-ci.org/meinstein/react-autotip)
[![Coverage Status](https://coveralls.io/repos/github/meinstein/react-autotip/badge.svg?branch=master)](https://coveralls.io/github/meinstein/react-autotip?branch=master)
[![npm](https://img.shields.io/npm/v/react-autotip.svg)](https://www.npmjs.com/package/react-autotip)

A handful of simple, auto-positioning tooltips *(compatible only with React 16+)*

`npm i react-autotip`


## TooltipPortalProvider

```js
import { TooltipPortalProvider } from 'react-autotip'

ReactDOM.render(
  <TooltipPortalProvider>
    <App />
  </TooltipPortalProvider>,
  document.getElementById('app')
)
```

#### Props

|   name         |     default    |    description                                                    |
|----------------|----------------|-------------------------------------------------------------------|
| style          |       {}       | Pass styling to the portal DOM element                            |

## Tooltip

```js
import Tooltip from 'react-autotip'

const MyComponent = () => (
  <Tooltip type="info" text="I am tooltip.">
    <div>
      Hover over me to to reveal tooltip.
    </div>
  </Tooltip>
)
```

#### Automatic Positioning

Wrap any element with a Tooltip and it will automatically position itself to either the top, right, bottom, or left based on where in the viewport its child element is rendered.

#### Type (prop)

|   name         |     default    |    description                                                    |
|----------------|----------------|-------------------------------------------------------------------|
| info           |       ✘        | A standard tooltip with a small caret                             |
| dialog         |                | A caret-less tooltip with a white background                      |

#### Other props

|   name         |     default    |    description                                                    |
|----------------|----------------|-------------------------------------------------------------------|
| text           |        ""      | The text to render inside the tooltip                             |
| style          |        {}      | Pass any positioning style, etc here                              |
| tooltipStyles  |        {}      | Change aspects of the tooltip's style                             |
| delay          |        0ms     | Delay before tooltip appears (in milliseconds)                    |
| toggleOnClick  |        false   | Tooltip appears only after clicking on target element             |
| motionConfig   | {stiffness: 210: damping: 20}| Choose your own params  [here](https://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/)|
| padding        |        16px    | Minimum padding between edge of viewport and tooltip              |
| offset         |        8px     | Offset between the tooltip and the tooltip's child                |
| caretSize      |        5px     | Size of the tooltip's caret                                       |
