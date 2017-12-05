import React, { Component } from 'react'
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'

export default class ScreenSpaceEvent extends Component {
    componentDidMount() {
        this._handleEvent()
    }
    _handleEvent() {
        const { viewer, ScreenSpaceEventType, handleAgru} = this.props
        var handler = new ScreenSpaceEventHandler(viewer.canvas);
        handler.setInputAction((arg) => { 
            console.log(arg)
            handleAgru(arg)
        }, ScreenSpaceEventType);
        // (agruments) => { //关键词
        //     console.log(arguments, ScreenSpaceEventType)
        //     handleAgru(arguments)
        // }
    }
    render() {
        return null
    }
}