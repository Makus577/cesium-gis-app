import React, { Component } from 'react' 
import '../css/zoom.css'
export default class CesiumZoom extends Component {
    render() {
        return (
            <div className='zoomInOut'>
                <div className='zoomIn'>+</div>
                <div className='zoomOut'>-</div>
            </div>
        )
    }
}