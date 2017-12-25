import React, { Component } from 'react'
import ScreenSpaceEvent from '../cesium/ScreenSpaceEvent'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import CesiumMath from 'cesium/Source/Core/Math'
console.log(CesiumMath)
export default class CesiumPosition extends Component {
    constructor () {
        super()
        this.state = {
            degree: '',
            heigth: ''
        } 
    }
    componentDidMount() {
        this.viewer = this.props.viewer
        //得到当前三维场景
        this.scene = this.viewer.scene;
        //得到当前三维场景的椭球体
        this.ellipsoid = this.scene.globe.ellipsoid;
        this.entity = this.viewer.entities.add({
            label: {
                show: false
            }
        });
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
            this.entity.position = this.cartesian;
            this.entity.label.show = true;
            this.setState({
                degree: ('东经E ' + this._transfromDegree(this.longitudeString) + ', 北纬N ' + this._transfromDegree(this.latitudeString)),
                height: ("海拔" + this._transfromHeigth(this.height))
            })
            console.log(this._transfromHeigth(this.height))
            this.entity.label.text = '(东经E ' + this._transfromDegree(this.longitudeString) + ', 北纬N ' + this._transfromDegree(this.latitudeString) + ",海拔" + this._transfromHeigth(this.height) + ')';
        } else {
            this.entity.label.show = false;
        }
    }
    _wheel(wheelment) {
        this.height = Math.ceil(this.viewer.camera.positionCartographic.height);
        this.entity.position = this.cartesian;
        this.entity.label.show = true;
        this.entity.label.text = '(' + this.longitudeString + ', ' + this.latitudeString + "," + this.height + ')';
        console.log(this.entity.label.text)
    }
    _transfromDegree(deg) {
        const degree = Math.trunc(deg)
        const minute = Math.trunc((deg - degree) * 60)
        const second = (((deg - degree) * 60 - minute) * 60).toFixed(2)
        return `${degree}°${minute}'${second}`
    }
    _transfromHeigth(height) {
        if (height > 9999) {
            return `${Math.trunc(height / 1000)} km`
        }
        return `${height} m`
    }
    render() {
        const { degree, heigth }  = this.state
        return (
            <div>
                <ScreenSpaceEvent viewer={this.props.viewer} ScreenSpaceEventType={ScreenSpaceEventType.MOUSE_MOVE} handleAgru={this._mouseMove.bind(this)}/>
                <ScreenSpaceEvent viewer={this.props.viewer} ScreenSpaceEventType={ScreenSpaceEventType.WHEEL} handleAgru={this._wheel.bind(this)}/>
                <div className='degree' ref={degree => this.degree = degree}>{degree}</div>
                <div className='height' ref={heigth => this.height = heigth}>{heigth}</div>
            </div>
        )
    }
}