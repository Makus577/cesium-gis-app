import React, { Component } from 'react'
import '../css/seo.css'
import searchIcon from '../imgs/seo.png'

export default class CesiumSeo extends Component {
    searchClick() {
        console.log(this.input.value)
    }
    render() {
        return (
            <div className='seo'>
                    <input type="text" className='content' placeholder='nihao' ref={(input)=> this.input = input}/>
                    <div className='search' onClick={this.searchClick.bind(this)}>
                        <img src={searchIcon} alt=""/>
                </div>
            </div>
        )
    }
}