import React, { Component } from 'react'
import '../css/tools.css'
import CesiumDistance from './CesiumDistance'
import CesiumArea from './CesiumArea'
import tools from '../imgs/tools.png'
import toolS from '../imgs/tool.png'
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
    areaClick() {
        console.log(this.state.area)
        this.setState({
            area: !this.state.area
        })
    }
    render() {
        const { distance, height, area } = this.state
        return (
            <div className='toolGroup'>
                <div className='toolBtn'><img src={tools} alt=""/></div>
                <div className='tools'>
                    <div className='tool dis' onClick={this.disClick.bind(this)}></div>
                    {
                        distance ? <CesiumDistance isDistance={distance} viewer={this.props.viewer}/> : ''
                    }
                    <div className='tool hei'></div>
                    <div className='tool area' onClick={this.areaClick.bind(this)}></div>
                    {
                        area ? <CesiumArea isArea={area} viewer={this.props.viewer}/> : ''
                    }
                    <div className='tool more'></div>
                </div>
            </div>
        )
        
    }
}