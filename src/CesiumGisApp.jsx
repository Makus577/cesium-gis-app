import React, { Component } from 'react'
import CesiumComponents from './CesiumComponents'
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Rectangle from 'cesium/Source/Core/Rectangle'
import './css/cesium.css'
import viewerConfig from './cesium/viewer.config'
import CesiumTerrainProvider from 'cesium/Source/Core/CesiumTerrainProvider'
import fullscreen from './utils/fullscreen'
console.log(fullscreen)
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
        this._flyToChina(viewer)
        this.setState({
            viewer
        })
        document.addEventListener(fullscreen.raw.fullscreenchange, function() {
           document.getElementById('fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType"> ' + (fullscreen.isFullscreen ? '退出全屏' : '全屏') + '</a>')
          })
          document.getElementById('fullscreen').onclick = () =>{
            if (fullscreen.isFullscreen === true) {
                fullscreen.exit()
              } else {
                fullscreen.request()
              }
          }
        
    }
    _flyToChina(viewer) {
        viewer.camera.flyTo({
            destination: Rectangle.fromDegrees(80, 22, 130, 50),
            duration: 8
        })
    }
    render() {
        const viewer = this.state.viewer
        return (
            <div className='gis-app' id='cesiumContainer' ref={element => this.cesiumContainer = element}>
                {viewer ? <CesiumComponents viewer={viewer}/>: undefined} 
                {/* 做null判断，必须是undefined */}
                {/* <div id='fullscreen'>全屏</div> */}
            </div>
        )
       
    }
}