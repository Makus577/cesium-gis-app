import React, { Component } from 'react'

import CesiumTools from './components/CesiumTools'
import CesiumSeo from './components/CesiumSeo'
import CesiumCompass from './components/CesiumCompass'
import Cesium2D from './components/Cesium2D'
import CesiumZoom from './components/CesiumZoom'
import CesiumTerrain from './components/CesiumTerrain'
import CesiumShowHotP from './components/CesiumShowHotP'
import CesiumHotPoint from './components/CesiumHotPoint'
import CesiumPosition from './components/CesiumPosition'
import './css/components.css'

export default class CesiumComponents extends Component {
    constructor() {
        super()
        this.state = {
            isShow: true
        }
    }
    handleShow(isShow) {
        this.setState({
            isShow
        })
    }
    render() {
        console.log(this.props.viewer)
        const {isShow} = this.state
        return (
            <div className='component'>
                <div className='tools-seo'>
                    <CesiumTools viewer={this.props.viewer}/>
                    <CesiumSeo />
                </div>
                <div className='compass'>
                    <CesiumCompass/>
                </div>
                <div className={'sh-Tools ' + (isShow ? '' :'transform')}>
                    <div className='cesium-2d'>
                        <Cesium2D viewer={this.props.viewer}/>
                    </div>
                    <div className='zoom-terrain'>
                        <CesiumZoom viewer={this.props.viewer}/>
                        <CesiumTerrain />
                    </div>
                    <div className='show-hot-point'>
                        <CesiumShowHotP isShow={isShow} handleShow={this.handleShow.bind(this)}/>
                    </div>
                    
                </div>
                <div className={'hot-point ' + (isShow ? '' : 'hide')}>
                    <CesiumHotPoint />
                </div>
                <div>
                    <CesiumPosition viewer={this.props.viewer}/>
                </div>
            </div>
        )
       
    }
}

