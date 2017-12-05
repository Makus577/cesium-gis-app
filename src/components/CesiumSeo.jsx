import React, { Component } from 'react'
import '../css/seo.css'

export default class CesiumSeo extends Component {
    searchClick() {
        console.log(this.input.value)
    }
    render() {
        return (
            <div className='seo'>
                    <input type="text" className='content' placeholder='nihao' ref={(input)=> this.input = input}/>
                    <button className='search' onClick={this.searchClick.bind(this)}>搜索</button>
            </div>
        )
    }
}