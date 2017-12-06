import React, { Component } from 'react' 
import '../css/zoom.css'
import Cartesian2 from 'cesium/Source/Core/Cartesian2'
export default class CesiumZoom extends Component {
    zoomIn() {
        this._isInOut(4)
    }
    zoomOut() {
        this._isInOut(-4)
    }
    _isInOut(wheelZoomAmount) {
        const viewer = this.props.viewer
        const mousePos = new Cartesian2(...this._getConvasCenter())
        console.log(mousePos)
        const cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position).height || Number.MAX_VALUE;
        const directionToZoom = viewer.camera.getPickRay(mousePos).direction;
        const zoomAmount = wheelZoomAmount * cameraHeight / 1000;

        viewer.camera.move(directionToZoom, zoomAmount);
    }
    _getCenter() {
        const viewer = this.props.viewer
        var windowPosition = new Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
        var pickRay = viewer.scene.camera.getPickRay(windowPosition);
        var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
        var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
        const longitude = (pickPositionCartographic.longitude * (180 / Math.PI));
        const latitude = (pickPositionCartographic.latitude * (180 / Math.PI));
        return [longitude, latitude]
    }
    _getConvasCenter() {
        const viewer = this.props.viewer
        const canvas = viewer.scene.canvas
        return [canvas.width / 2, canvas.height / 2]
    }
    render() {
        return (
            <div className='zoomInOut'>
                <div className='zoomIn' onClick={this.zoomIn.bind(this)}></div>
                <div className='zoomOut' onClick={this.zoomOut.bind(this)}></div>
            </div>
        )
    }
}