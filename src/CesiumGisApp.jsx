import React, { Component } from 'react'
import CesiumComponents from './CesiumComponents'
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import './css/cesium.css'
import viewerConfig from './cesium/viewer.config'
import CesiumTerrainProvider from 'cesium/Source/Core/CesiumTerrainProvider'
export default class CesiumGisApp extends Component {
    constructor () {
        super()
        this.state = {
            viewer: null
        }
    }
    componentDidMount() {
        const viewer = new Viewer(this.cesiumContainer, viewerConfig)
        var cesiumTerrainProviderMeshes = new CesiumTerrainProvider({
            url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
            requestWaterMask : true,
            requestVertexNormals : true
        });
        viewer.terrainProvider = cesiumTerrainProviderMeshes;
        this.setState({
            viewer
        })
    }

    render() {
        const viewer = this.state.viewer
        return (
            <div className='gis-app' id='cesiumContainer' ref={element => this.cesiumContainer = element}>
                {viewer ? <CesiumComponents viewer={viewer}/>: undefined} 
                {/* 做null判断，必须是undefined */}
            </div>
        )
       
    }
}