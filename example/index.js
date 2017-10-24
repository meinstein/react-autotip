// external imports
import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { TooltipPortalProvider } from '../src'
// local imports
import App from './app'

const render = Component => {
  ReactDOM.render(
    <TooltipPortalProvider>
      <AppContainer>
        <Component />
      </AppContainer>
    </TooltipPortalProvider>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  })
}
