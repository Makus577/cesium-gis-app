import React, { Component } from 'react'
import ScreenSpaceEvent from '../cesium/ScreenSpaceEvent'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import CesiumMath from 'cesium/Source/Core/Math'
import '../css/position.css'
export default class CesiumPosition extends Component {
    constructor () {
        super()
        this.state = {
            lon: '',
            lat: '',
            heigth: ''
        } 
    }
    componentDidMount() {
        this.viewer = this.props.viewer
        //得到当前三维场景
        this.scene = this.viewer.scene;
        //得到当前三维场景的椭球体
        this.ellipsoid = this.scene.globe.ellipsoid;
        this.longitudeString = null;
        this.latitudeString = null;
        this.height = null;
        this.cartesian = null;
    }
    _mouseMove(movement) {
        this.cartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, this.ellipsoid);
        if (this.cartesian) {
            //将笛卡尔坐标转换为地理坐标
            var cartographic = this.ellipsoid.cartesianToCartographic(this.cartesian);
            //将弧度转为度的十进制度表示
            this.longitudeString = CesiumMath.toDegrees(cartographic.longitude);
            this.latitudeString = CesiumMath.toDegrees(cartographic.latitude);
            //获取相机高度
            this.height = Math.ceil(this.viewer.camera.positionCartographic.height);
            this.setState({
                lon: this._transfromDegree(this.longitudeString),
                lat: this._transfromDegree(this.latitudeString),
                height: this._transfromHeigth(this.height)
            })
        } else {
        }
    }
    _wheel(wheelment) {
        this.height = Math.ceil(this.viewer.camera.positionCartographic.height);
        this.setState({
            lon: this._transfromDegree(this.longitudeString),
            lat: this._transfromDegree(this.latitudeString),
            height: this._transfromHeigth(this.height)
        })
    }
    _transfromDegree(deg) {
        const degree = Math.trunc(deg)
        const minute = Math.trunc((deg - degree) * 60)
        const second = (((deg - degree) * 60 - minute) * 60).toFixed(2)
        return `${degree}°${minute}'${second}"`
    }
    _transfromHeigth(height) {
        if (height > 9999) {
            return `${Math.trunc(height / 1000)} km`
        }
        return `${height} m`
    }
    render() {
        const { lon, lat, height }  = this.state
        return (
            <div className='position-msg'>
                <ScreenSpaceEvent viewer={this.props.viewer} ScreenSpaceEventType={ScreenSpaceEventType.MOUSE_MOVE} handleAgru={this._mouseMove.bind(this)}/>
                <ScreenSpaceEvent viewer={this.props.viewer} ScreenSpaceEventType={ScreenSpaceEventType.WHEEL} handleAgru={this._wheel.bind(this)}/>
                <div className='lon' ref={lon => this.lon = lon}>北纬N&nbsp;{lon}</div>
                <div className='lat' ref={lat => this.lat = lat}>&nbsp;东经E&nbsp;{lat}</div>
                <div className='height' ref={height => this.heigh = height}>
                    &nbsp;海拔&nbsp;{height}</div>
            </div>
        )
    }
}