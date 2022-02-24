import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import { FahrtRoutes } from './FahrtRoutes'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <FahrtRoutes />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
