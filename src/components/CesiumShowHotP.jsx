import React, { Component } from 'react'
import '../css/isShowTerr.css'
export default class CesiumShowHotP extends Component {
    isShowClick() {
        this.props.handleShow(!this.props.isShow)
    }
    render() {
        return (
            <div className={'showHotP' + (this.props.isShow ? ' top-left-radius' : '')}>
                {this.props.isShow ? <div className='showText'>热点</div> : undefined}
                <div className='isShow' onClick={this.isShowClick.bind(this)}>^^</div>
            </div>
        )
    }
}