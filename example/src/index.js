import React from 'react'
import ReactDOM from 'react-dom'

import { QueryProvider } from '@tev/use-media-query'

import './index.css'
import App from './App'

const breakpoints = {
  xs: 300,
  sm: 500,
  md: 700,
  lg: 900,
  xl: 1400,
  xxl: 1800,
  xxxl: 2400
}

ReactDOM.render(
  <QueryProvider breakpoints={breakpoints}>
    <App />
  </QueryProvider>,

  document.getElementById('root')
)
