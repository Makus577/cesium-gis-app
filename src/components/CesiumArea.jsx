import React, { Component } from 'react' 
import Cartesian3 from 'cesium/Source/Core/Cartesian3'
import PolygonPipeline from 'cesium/Source/Core/PolygonPipeline'
import Ellipsoid from 'cesium/Source/Core/Ellipsoid'
import Color from 'cesium/Source/Core/Color'
import Cartographic from 'cesium/Source/Core/Cartographic'
import CesiumLeftClick from './CesiumLeftClick'
import EllipsoidGeodesic from 'cesium/Source/Core/EllipsoidGeodesic'
export default class CesiumDistance extends Component {
    componentDidMount() {
    }
    getArea(theEntity) {
        const {viewer} = this.props
        // Get the polygon from your "entity"
        var polygon = theEntity.polygon;
        var hierarchy = polygon.hierarchy._value;
        console.log(theEntity)
        // "indices" here defines an array, elements of which defines the indice of a vector
        // defining one corner of a triangle. Add up the areas of those triangles to get
        // an approximate area for the polygon
        var indices = PolygonPipeline.triangulate(hierarchy, hierarchy.holes);
        var area = 0; // In square kilometers

        for (var i = 0; i < indices.length; i += 3) {
            var vector1 = hierarchy[indices[i]];
            var vector2 = hierarchy[indices[i+1]];
            var vector3 = hierarchy[indices[i+2]];

            // These vectors define the sides of a parallelogram (double the size of the triangle)
            var vectorC = Cartesian3.subtract(vector2, vector1, new Cartesian3());
            var vectorD = Cartesian3.subtract(vector3, vector1, new Cartesian3());

            // Area of parallelogram is the cross product of the vectors defining its sides
            var areaVector = Cartesian3.cross(vectorC, vectorD, new Cartesian3());
            
            // Area of the triangle is just half the area of the parallelogram, add it to the sum.
            area += Cartesian3.magnitude(areaVector)/2.0;
        }
        console.log(area) 
        this.area.value = area       
    }
    handleleftClick(click) {
        const { viewer } = this.props
        var position = viewer.camera.pickEllipsoid(click.position);
        var cartographicPosition = Ellipsoid.WGS84.cartesianToCartographic(position);
        var y = cartographicPosition.latitude;
        var x = cartographicPosition.longitude;
        //下面是测试的
        var entity = viewer.entities.add({
            name : 'Wyoming',
            polygon : {//polygon是多边形  Cesium.PolygonHierarchy （positions, holes）
              hierarchy : Cartesian3.fromDegreesArray([//hierarchy分层（位置，孔）
                                        -109.080842,45.002073,
                                        -105.91517,45.002073,
                                        -104.058488,44.996596,
                                        -104.053011,43.002989,
                                        -104.053011,41.003906,
                                        -105.728954,40.998429,
                                        -107.919731,41.003906,
                                        -109.04798,40.998429,
                                        -111.047063,40.998429,
                                        -111.047063,42.000709,
                                        -111.047063,44.476286,
                                        -111.05254,45.002073]),
              height : 0,
              material : Color.RED.withAlpha(0.5),//使用红色，绿色，蓝色和alpha值指定的颜色，范围从0（无强度）到1.0（全强度）。
              outline : true,//几何轮廓存在
              outlineColor : Color.BLACK//设置轮廓颜色为黑色
            }
        });
        
       this.getArea(entity)
       viewer.zoomTo(entity)
    }
    render() {
        return <div ref={area => this.area = area}>
        <CesiumLeftClick viewer={this.props.viewer}
        handleleftClick={this.handleleftClick.bind(this)}/></div>
    }
}
