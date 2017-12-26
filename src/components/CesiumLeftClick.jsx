import React, { Component } from 'react'
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'

export default class CesiumLeftClick extends Component {
    componentDidMount() {
        this._leftClick()
    }
    _leftClick() {
        // 处理两个点的距离
        const { viewer } = this.props
        const position = []
        var handler = new ScreenSpaceEventHandler(viewer.canvas);
        handler.setInputAction((click) => {
            if (position.length === 2) {
                return 
            }
            position.push(this.props.handleleftClick(click))
            if (position.length === 2) {
                console.log(position)
                this.props.calcDis(position)
            }
            
            
        }, ScreenSpaceEventType.LEFT_CLICK);
        
    }
    render() {
        return null
    }
}