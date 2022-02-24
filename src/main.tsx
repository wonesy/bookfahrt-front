import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import { FahrtRoutes } from './FahrtRoutes'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <FahrtRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
