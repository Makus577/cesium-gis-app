import React, { Component } from 'react'
import '../css/tools.css'
import CesiumDistance from './CesiumDistance'
import CesiumArea from './CesiumArea'
import settings from '../imgs/settings.png'
import dis from '../imgs/dis.png'
import hei from '../imgs/height.png'
import areaImg from '../imgs/area.png'
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
                <div className='toolBtn'><img src={settings} alt=""/></div>
                <div className='tools'>
                    <div className='tool dis' onClick={this.disClick.bind(this)}><img src={dis} alt=""/><span>距离</span></div>
                    {
                        distance ? <CesiumDistance isDistance={distance} viewer={this.props.viewer}/> : ''
                    }
                    <div className='tool hei'><img src={hei} alt=""/><span>高度</span></div>
                    <div className='tool area' onClick={this.areaClick.bind(this)}><img src={areaImg} alt=""/><span>面积</span></div>
                    {
                        area ? <CesiumArea isArea={area} viewer={this.props.viewer}/> : ''
                    }
                    <div className='tool more'></div>
                </div>
            </div>
        )
        
    }
}