import React, { Component } from 'react'
import '../css/compass.css'
import compass from '../imgs/compass.png'
export default class CesiumCompass extends Component {
    //如何实现监听事件
    componentDidMount() {
        const { viewer } = this.props
        var cesiumWidget = viewer.cesiumWidget;
        var camera = cesiumWidget.scene.camera;
        var lastCamera = camera;
        cesiumWidget.clock.onTick.addEventListener(() => {
            camera = cesiumWidget.scene.camera;
            if (!(camera.heading === lastCamera.heading) ||
                !(camera.pitch === lastCamera.pitch) ||
                !(camera.roll === lastCamera.roll)) {
                let rotate = this._transformRTo(camera.heading)
                this.compass.style.transform = 'rotate('+rotate+'deg)'
                lastCamera = camera;
            }
        });
    }
    _transformRTo(r) {
        return r / Math.PI * 180 % 360
    }
    render() {
        return (
            <div className='compass-img'>
                <div><img src={compass} alt="" className='compass-img' ref={img => this.compass = img}/></div>
            </div>
        )
    }
}