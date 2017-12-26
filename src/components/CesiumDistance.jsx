import React, { Component } from 'react' 
import Cartesian3 from 'cesium/Source/Core/Cartesian3'
import PolylinePipeline from 'cesium/Source/Core/PolylinePipeline'
import Ellipsoid from 'cesium/Source/Core/Ellipsoid'
import Color from 'cesium/Source/Core/Color'
import Cartographic from 'cesium/Source/Core/Cartographic'
import CesiumLeftClick from './CesiumLeftClick'
import EllipsoidGeodesic from 'cesium/Source/Core/EllipsoidGeodesic'
export default class CesiumDistance extends Component {
    componentDidMount() {
        
    }
    PToPDistance(disS, disE) {
        
        const positions = Cartesian3.fromDegreesArray([
            ...disS,
            ...disE]);
        // 第二种方法 start
        // var startCartographic = Cartographic.fromDegrees(disS[0], disS[1]);

        // var endCartographic = Cartographic.fromDegrees(disE[0], disE[1]);
        
        // /**根据经纬度计算出距离**/
        // var geodesic =new EllipsoidGeodesic();
        // geodesic.setEndPoints(startCartographic, endCartographic);
        
        // var distance=geodesic.surfaceDistance;
        // console.log(distance) end
        
        const surfacePositions = PolylinePipeline.generateArc({
            positions: positions
        });
        const scratchCartesian3 = new Cartesian3();

        const surfacePositionsLength = surfacePositions.length;
        let totalDistanceInMeters = 0;
        for (var i = 3; i < surfacePositionsLength; i += 3) {
            scratchCartesian3.x = surfacePositions[i] - surfacePositions[i - 3];
            scratchCartesian3.y = surfacePositions[i + 1] - surfacePositions[i - 2];
            scratchCartesian3.z = surfacePositions[i + 2] - surfacePositions[i - 1];
            totalDistanceInMeters += Cartesian3.magnitude(scratchCartesian3);
        }
        return totalDistanceInMeters * 0.001
        // var totalDistanceInKm = totalDistanceInMeters * 0.001;
        // console.log('Distance: ' + totalDistanceInKm + ' km');
    }
    handleleftClick(click) {
        const { viewer } = this.props
        var position = viewer.camera.pickEllipsoid(click.position);
        var cartographicPosition = Ellipsoid.WGS84.cartesianToCartographic(position);
        var y = cartographicPosition.latitude;
        var x = cartographicPosition.longitude;
        
        //下面是测试的
        var entity = viewer.entities.add({
            position: Cartesian3.fromRadians(x, y),
            ellipse: {
                semiMinorAxis: 10,
                semiMajorAxis: 10,
                fill: false,
                outline: true,
                material: Color.RED,
                outlineColor: Color.RED,
                outlineWidth: 2
            }
        });
        
        return [x, y]
    }
    calcDis(pos) {
        // for (let entity of entities) {
        //     console.log(entity.position.getValue())
        // }
        const dis = this.PToPDistance(pos[0], pos[1])
        console.log(dis + ' km')

    }
    render() {
        return this.props.isDistance ? <CesiumLeftClick viewer={this.props.viewer} handleleftClick={this.handleleftClick.bind(this)} calcDis={this.calcDis.bind(this)}/> : null
    }
}