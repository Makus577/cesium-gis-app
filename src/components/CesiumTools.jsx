import React, { Component } from 'react'
import '../css/tools.css'
import CesiumDistance from './CesiumDistance'

export default class CesiumTools extends Component {
    constructor() {
        super()
        this.state = {
            distance: false,
            height: false,
            area: false
        }
    }
    disClick() {
        this.setState({
            distance: !this.state.distance
        })
    }
    render() {
        const { distance, height, area } = this.state
        return (
            <div className='toolGroup'>
                <div className='toolBtn'>工具</div>
                <div className='tools'>
                    <div className='tool' onClick={this.disClick.bind(this)}>距离</div>
                    {
                        distance ? <CesiumDistance isDistance={distance} viewer={this.props.viewer}/> : ''
                    }
                    <div className='tool'>高度</div>
                    <div className='tool'>面积</div>
                </div>
            </div>
        )
        
    }
}