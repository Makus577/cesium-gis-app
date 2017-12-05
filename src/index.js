import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CesiumGisApp from './CesiumGisApp'
import './css/index.css'

import "cesium/Source/Widgets/widgets.css";

import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";
buildModuleUrl.setBaseUrl('./cesium/');

ReactDOM.render(<CesiumGisApp/>, document.getElementById('root'))
