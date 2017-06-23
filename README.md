# react-autotip

[![Build Status](https://travis-ci.org/meinstein/react-autotip.svg?branch=master)](https://travis-ci.org/meinstein/react-autotip)
[![Coverage Status](https://coveralls.io/repos/github/meinstein/react-autotip/badge.svg?branch=master)](https://coveralls.io/github/meinstein/react-autotip?branch=master)
[![npm](https://img.shields.io/npm/v/react-autotip.svg)](https://www.npmjs.com/package/react-autotip)

A handful of simple, auto-positioning tooltips

## Example

```js
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

## Types

- `info`: (*default*) A standard tooltip with a small caret.
- `dialog`: A sleek, caret-less tooltip with a white background & slight box shadow.
