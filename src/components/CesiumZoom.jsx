import React, { Component } from 'react' 
import '../css/zoom.css'
import Cartesian2 from 'cesium/Source/Core/Cartesian2'
import Cartesian3 from 'cesium/Source/Core/Cartesian3'
import IntersectionTests from 'cesium/Source/Core/IntersectionTests'
import Ray from 'cesium/Source/Core/Ray'
import SceneMode from 'cesium/Source/Scene/SceneMode'
import defined from 'cesium/Source/Core/defined'
import Cartographic from 'cesium/Source/Core/Cartographic'

export default class CesiumZoom extends Component {
    constructor() {
        super()
        this.relativeAmount = 2;
        this.cartesian3Scratch = new Cartesian3();
        this.rayScratch = new Ray();
        this.unprojectedScratch = new Cartographic();
    }
    zoomIn() {
        this.zoom(1 / this.relativeAmount)
    }
    zoomOut() {
        this.zoom(this.relativeAmount)
    }
    // _isInOut(wheelZoomAmount) {
    //     const viewer = this.props.viewer
    //     const mousePos = new Cartesian2(...this._getConvasCenter())
    //     console.log(mousePos)
    //     const cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position).height || Number.MAX_VALUE;
    //     const directionToZoom = viewer.camera.getPickRay(mousePos).direction;
    //     const zoomAmount = wheelZoomAmount * cameraHeight / 1000;

    //     viewer.camera.move(directionToZoom, zoomAmount);
    // }
    getCameraFocus(viewer, inWorldCoordinates, result) {
        var scene = viewer.scene;
        var camera = scene.camera;
        var rayScratch = this.rayScratch
        var unprojectedScratch = this.unprojectedScratch
        if (scene.mode === SceneMode.MORPHING) {
            return undefined;
        }

        if (!defined(result)) {
            result = new Cartesian3();
        }

        // TODO bug when tracking: if entity moves the current position should be used and not only the one when starting orbiting/rotating
        // TODO bug when tracking: reset should reset to default view of tracked entity

        if (defined(viewer.trackedEntity)) {
            result = viewer.trackedEntity.position.getValue(viewer.clock.currentTime, result);
        } else {
            rayScratch.origin = camera.positionWC;
            rayScratch.direction = camera.directionWC;
            result = scene.globe.pick(rayScratch, scene, result);
        }

        if (!defined(result)) {
            return undefined;
        }

        if (scene.mode == SceneMode.SCENE2D || scene.mode == SceneMode.COLUMBUS_VIEW) {
            result = camera.worldToCameraCoordinatesPoint(result, result);

            if (inWorldCoordinates) {
                result = scene.globe.ellipsoid.cartographicToCartesian(scene.mapProjection.unproject(result, unprojectedScratch), result);
            }
        } else {
            if (!inWorldCoordinates) {
                result = camera.worldToCameraCoordinatesPoint(result, result);
            }
        }

        return result;
    }
    zoom(relativeAmount) {
        var cartesian3Scratch = this.cartesian3Scratch
        this.viewer = this.props.viewer
        const scene = this.viewer.scene
        var camera = scene.camera;
        var orientation;

        switch (scene.mode) {
            case SceneMode.MORPHING:
                break;
            case SceneMode.SCENE2D:
                camera.zoomIn(camera.positionCartographic.height * (1 - this.relativeAmount));
                break;
            default:
                var focus;

                if (defined(this.viewer.trackedEntity)) {
                    focus = new Cartesian3();
                } else {
                    focus = this.getCameraFocus(this.viewer, false);
                }

                if (!defined(focus)) {
                    // Camera direction is not pointing at the globe, so use the ellipsoid horizon point as
                    // the focal point.
                    var ray = new Ray(camera.worldToCameraCoordinatesPoint(scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic)), camera.directionWC);
                    focus = IntersectionTests.grazingAltitudeLocation(ray, scene.globe.ellipsoid);

                    orientation = {
                        heading: camera.heading,
                        pitch: camera.pitch,
                        roll: camera.roll
                    };
                } else {
                    orientation = {
                        direction: camera.direction,
                        up: camera.up
                    };
                }
                var direction = Cartesian3.subtract(camera.position, focus, cartesian3Scratch);
                var movementVector = Cartesian3.multiplyByScalar(direction, relativeAmount, direction);
                var endPosition = Cartesian3.add(focus, movementVector, focus);

                if (defined(this.viewer.trackedEntity) || scene.mode == SceneMode.COLUMBUS_VIEW) {
                    // sometimes flyTo does not work (jumps to wrong position) so just set the position without any animation
                    // do not use flyTo when tracking an entity because during animatiuon the position of the entity may change
                    camera.position = endPosition;
                } else {
                    camera.flyTo({
                        destination: endPosition,
                        orientation: orientation,
                        duration: 0.5,
                        convert: false
                    });
                }
            
        }
    }
    // _getCenter() {
    //     const viewer = this.props.viewer
    //     var windowPosition = new Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
    //     var pickRay = viewer.scene.camera.getPickRay(windowPosition);
    //     var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
    //     var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    //     const longitude = (pickPositionCartographic.longitude * (180 / Math.PI));
    //     const latitude = (pickPositionCartographic.latitude * (180 / Math.PI));
    //     return [longitude, latitude]
    // }
    // _getConvasCenter() {
    //     const viewer = this.props.viewer
    //     const canvas = viewer.scene.canvas
    //     return [canvas.width / 2, canvas.height / 2]
    // }
    render() {
        return (
            <div className='zoomInOut'>
                <div className='zoomIn' onClick={this.zoomIn.bind(this)}></div>
                <div className='zoomOut' onClick={this.zoomOut.bind(this)}></div>
            </div>
        )
    }
}