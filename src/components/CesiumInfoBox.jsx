import React, { Component } from 'react'
import ScreenSpaceEvent from '../cesium/ScreenSpaceEvent'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import Cartographic from 'cesium/Source/Core/Cartographic'
import Cartesian3 from 'cesium/Source/Core/Cartesian3'
import SceneTransforms from 'cesium/Source/Scene/SceneTransforms'
import icon from '../imgs/1.png'
import '../css/infoBox.css'

export default class CesiumInfoBox extends Component {
    componentDidMount() {
        this._test()
    }
    handleInfoBox(movement) {
        const viewer = this.props.viewer
        var pick = viewer.scene.pick(movement.position);
        if (pick && pick.id) {//选中某模型  
            var cartographic = Cartographic.fromCartesian(pick.id._position._value);//世界坐标转地理坐标（弧度）
            var point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];//地理坐标（弧度）转经纬度坐标
            var destination = Cartesian3.fromDegrees(point[0], point[1], 3000.0);
           
            // $('#trackPopUp').show();
            // $('#trackPopUpLink').html(content);
            let c = SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, pick.id._position._value);
            removeHandler && removeHandler()
            var removeHandler = viewer.scene.postRender.addEventListener( () => {
                var changedC = SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, pick.id._position._value);
                // If things moved, move the popUp too
                if ((c.x !== changedC.x) || (c.y !== changedC.y)) {
                    c = changedC;
                   this._positionPopUp(c)
                }

            });
            this._positionPopUp(c)
        }
        else {
            // removeHandler()
            this._hiden()
        }
    }
    _test() {
        const viewer = this.props.viewer
        var citizensBankPark = viewer.entities.add({
            position: Cartesian3.fromDegrees(-75.166493, 39.9060534),
            //广告牌
            billboard: {
                image: icon,
                width: 64,
                height: 64
            },
            
        });
        viewer.zoomTo(citizensBankPark);
    }
    _positionPopUp(c) {
        
        const style = this._getStyle(this.infobox)
        const width = Number.parseFloat(style.width)
        const height = Number.parseFloat(style.height)
        var x = c.x - (width) / 2;
        var y = c.y - (height) - 50;
        this.infobox.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)'
        this._show();
    }
    _getStyle(ele) {
        var style = null;

        if (window.getComputedStyle) {
            style = window.getComputedStyle(ele, null);
        } else {
            style = ele.currentStyle;
        }

        return style;
    }
    _hiden () {
        this.infobox.style.display = 'none'
    }
    _show() {
        this.infobox.style.display = 'block'
    }
    handleClick() {
        this.infobox.style.display = 'none'
    }
    render() {
        return (
            <div>
                <div id="popup" className="ol-popup" ref={infobox => this.infobox = infobox}>
                    <a href="#" onClick={this.handleClick.bind(this)} id="popup-closer" className="ol-popup-closer"></a>
                    <div id="popup-content">112</div>
                    <div className='selectImg'>
                        <svg xmlns="http://www.w3.org/2000/svg"width="31.5px" height="31.5px">
                            <path fillRule="evenodd" stroke="rgb(0, 90, 255)" strokeWidth="1px" strokeLinecap="butt" strokeLinejoin="miter" fill="none"
                                d="M15.500,0.500 C23.784,0.500 30.500,7.216 30.500,15.500 C30.500,23.784 23.784,30.500 15.500,30.500 C7.216,30.500 0.500,23.784 0.500,15.500 C0.500,7.216 7.216,0.500 15.500,0.500 Z" />
                            <path fillRule="evenodd" fill="rgb(0, 90, 255)"
                                d="M15.705,9.541 C19.110,9.541 21.870,12.301 21.870,15.705 C21.870,19.110 19.110,21.870 15.705,21.870 C12.301,21.870 9.541,19.110 9.541,15.705 C9.541,12.301 12.301,9.541 15.705,9.541 Z" />
                        </svg>
                    </div>
                </div>
                
                <ScreenSpaceEvent viewer={this.props.viewer}
                    ScreenSpaceEventType={ScreenSpaceEventType.LEFT_CLICK}
                    handleAgru={this.handleInfoBox.bind(this)} />
            </div>
        )
    }
}