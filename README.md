# react-autotip

[![Build Status](https://travis-ci.org/meinstein/react-autotip.svg?branch=master)](https://travis-ci.org/meinstein/react-autotip)
[![Coverage Status](https://coveralls.io/repos/github/meinstein/react-autotip/badge.svg?branch=master)](https://coveralls.io/github/meinstein/react-autotip?branch=master)
[![npm](https://img.shields.io/npm/v/react-autotip.svg)](https://www.npmjs.com/package/react-autotip)

A handful of simple, auto-positioning tooltips

`npm i react-autotip`

## Example

```js
import { Tooltip, TooltipContainer } from 'react-autotip'

const MyComponent = () => (
  <div>
    {/* must render one instance of TooltipContainer somewhere in your app */}
    <TooltipContainer />
    <div>
      <Tooltip type="info" text="I am a tooltip">
        <div />
      </Tooltip>
    </div>
  </div>
)
```

## Automatic Positioning

Wrap any element with a Tooltip and it will automatically position itself to either the top, right, bottom, or left based on where in the viewport its child element is rendered.

## TooltipContainer

#### Props
|   name         |     default    |    description                                                    |
|----------------|----------------|-------------------------------------------------------------------|
| padding        |        16px    | Minimum padding between edge of viewport and tooltip              |
| offset         |        8px     | Offset between the tooltip and the tooltip's child                |
| caretSize      |        5px     | Size of the tooltip's caret                                       |

## Tooltip

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
