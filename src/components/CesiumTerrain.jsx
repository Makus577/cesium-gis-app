import React, { Component } from 'react'
import '../css/terrain.css'
import sitellite from '../imgs/sitellite.png'
import terrain from '../imgs/terrain.png'
import vector from '../imgs/vector.png'
export default class CesiumZoom extends Component {
    constructor() {
        super()
        this.state = {
            display: false
        }
    }
    handleClick() {
        this.setState({
            display: !this.state.display
        })
    }
    render() {
        const { display } = this.state
        return (
            <div className='terrain' onClick={this.handleClick.bind(this)}>
                <div className={'layers ' + (display ? '' : 'hiden')}>
                    <img src={vector}    alt="矢量地图" />
                    <img src={sitellite} alt="卫星地图"/>
                    <img src={terrain}   alt="高程地图" />
                </div>
            </div>
        )
    }
}