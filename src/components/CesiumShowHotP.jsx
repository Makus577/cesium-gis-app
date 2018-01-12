import React, { Component } from 'react'
import '../css/isShowTerr.css'
import hotIcon from '../imgs/arrow.png'
export default class CesiumShowHotP extends Component {
    isShowClick() {
        this.props.handleShow(!this.props.isShow)
    }
    render() {
        return (
            <div className={'showHotP' + (this.props.isShow ? ' top-left-radius' : '')}>
                {this.props.isShow ? <div className='showText' onClick={this.isShowClick.bind(this)}>热点</div> : undefined}
                <div className={'isShow ' + (this.props.isShow ? 'arrow-transfrom' : 'arrow')} onClick={this.isShowClick.bind(this)}></div>
            </div>
        )
    }
}