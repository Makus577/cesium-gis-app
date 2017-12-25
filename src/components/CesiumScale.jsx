import React, { Component } from 'react'
import ScreenSpaceEvent from '../cesium/ScreenSpaceEvent'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import CesiumMath from 'cesium/Source/Core/Math'
import Cartesian2 from 'cesium/Source/Core/Cartesian2'
import EllipsoidGeodesic from 'cesium/Source/Core/EllipsoidGeodesic'
import defined from 'cesium/Source/Core/defined'

import '../css/scale.css'
export default class CesiumScale extends Component {
    constructor() {
        super()
        this.state = {
            barWidth: 0,
            distanceLabel: ''
        }
        this.distances = [
            1, 2, 3, 5,
            10, 20, 30, 50,
            100, 200, 300, 500,
            1000, 2000, 3000, 5000,
            10000, 20000, 30000, 50000,
            100000, 200000, 300000, 500000,
            1000000, 2000000, 3000000, 5000000,
            10000000, 20000000, 30000000, 50000000]
    }
    componentDidMount() {
        const { viewer } = this.props
        this.scene = viewer.scene
        this._removeSubscription = this.scene.postRender.addEventListener(() => {
            this.updateDistanceLegendCesium();
            
        }, this);
    }
    updateDistanceLegendCesium() {
        const scene = this.scene
        const distances = this.distances
        const geodesic = new EllipsoidGeodesic();
        // Find the distance between two pixels at the bottom center of the screen.
        var width = scene.canvas.clientWidth;
        var height = scene.canvas.clientHeight;

        var left = scene.camera.getPickRay(new Cartesian2((width / 2) | 0, height - 1));
        var right = scene.camera.getPickRay(new Cartesian2(1 + (width / 2) | 0, height - 1));

        var globe = scene.globe;
        var leftPosition = globe.pick(left, scene);
        var rightPosition = globe.pick(right, scene);
        if (!defined(leftPosition) || !defined(rightPosition)) {
            return;
        }

        var leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
        var rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);
        var leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
        var rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);

        geodesic.setEndPoints(leftCartographic, rightCartographic);
        var pixelDistance = geodesic.surfaceDistance;

        // Find the first distance that makes the scale bar less than 100 pixels.
        var maxBarWidth = 100;
        var distance;
        for (var i = distances.length - 1; !defined(distance) && i >= 0; --i) {
            if (distances[i] / pixelDistance < maxBarWidth) {
                distance = distances[i];
            }
        }
        if (defined(distance)) {
            var label;
            if (distance >= 1000) {
                label = (distance / 1000).toString() + ' km';
            } else {
                label = distance.toString() + ' m';
            }
            var width = (distance / pixelDistance) | 0;
            const { barWidth, distanceLabel} = this.state
            barWidth !== width ? this.setState({ barWidth: width }) : null
            distanceLabel !== label ? this.setState({ distanceLabel: label }) : null
        } else {
            this.barWidth = undefined;
            this.distanceLabel = undefined;
        }
    }
    render() {
        const { barWidth = '1000 km', distanceLabel='83' } = this.state 
        return (
            <div className="distance-legend">
                <div className="distance-legend-label" >{distanceLabel}</div>
                <div className="distance-legend-scale-bar"
                    style={{ width: barWidth + 'px', left: (5 + (125 - barWidth) / 2) + 'px'}}>
                </div>
            </div>
        )
    }
}