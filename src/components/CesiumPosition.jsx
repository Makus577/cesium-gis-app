import React, { Component } from 'react'
import ScreenSpaceEvent from '../cesium/ScreenSpaceEvent'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import CesiumMath from 'cesium/Source/Core/Math'
console.log(CesiumMath)
export default class CesiumPosition extends Component {
    constructor () {
        super()  
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
            this.entity.label.text = '(' + this.longitudeString + ', ' + this.latitudeString + "," + this.height + ')';
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
    render() {
        
        return (
            <div>
                <ScreenSpaceEvent viewer={this.props.viewer} ScreenSpaceEventType={ScreenSpaceEventType.MOUSE_MOVE} handleAgru={this._mouseMove.bind(this)}/>
                <ScreenSpaceEvent viewer={this.props.viewer} ScreenSpaceEventType={ScreenSpaceEventType.WHEEL} handleAgru={this._wheel.bind(this)}/>
            </div>
        )
    }
}