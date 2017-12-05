import React, { Component } from 'react' 
import SceneMode from 'cesium/Source/Scene/SceneMode'
import SceneModePickerViewModel from 'cesium/Source/Widgets/SceneModePicker/SceneModePickerViewModel'
import '../css/2d.css'
export default class Cesium2D extends Component {
    changeSceneMode() {
        const viewer = this.props.viewer
        const scene = viewer.scene
        var transitioner = new SceneModePickerViewModel(scene);
        if (scene.mode === 3) {
            // viewer.scene.mode = SceneMode.SCENE2D
            transitioner.morphTo2D();
        } else {
            // viewer.scene.mode = SceneMode.SCENE3D
            transitioner.morphTo3D();
        }
    }
    render() {
        return (
            <div>
                <div className='img-2d' onClick={this.changeSceneMode.bind(this)}>2D</div>
            </div>
        )
    }
}