import React, { Component } from 'react'
import '../css/isShowTerr.css'
import hotIcon from '../imgs/hot.png'
export default class CesiumShowHotP extends Component {
    isShowClick() {
        this.props.handleShow(!this.props.isShow)
    }
    render() {
        return (
            <div className={'showHotP' + (this.props.isShow ? ' top-left-radius' : '')}>
                {this.props.isShow ? <div className='showText' ><img src={hotIcon} alt="" onClick={this.isShowClick.bind(this)}/></div> : undefined}
                <div className='isShow' onClick={this.isShowClick.bind(this)}></div>
            </div>
        )
    }
}