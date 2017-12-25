import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CesiumGisApp from './CesiumGisApp'
import { AppContainer } from 'react-hot-loader'
import './css/index.css'

import "cesium/Source/Widgets/widgets.css";

import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";
buildModuleUrl.setBaseUrl('./cesium/');

renderWithHotReload(CesiumGisApp)
function renderWithHotReload(RootElement) {
    ReactDOM.render(
        <AppContainer>
            <RootElement/>
        </AppContainer>,
        document.getElementById('root')
    )
}

if (module.hot) {
    module.hot.accept('./CesiumGisApp', () => {
        const CesiumGisApp = require('./CesiumGisApp').default
        renderWithHotReload(CesiumGisApp)
    })
}
