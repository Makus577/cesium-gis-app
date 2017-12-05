import React, { Component } from 'react'
import '../css/hotPoint.css'
export default class CesiumHotPoint extends Component {
    imgPointLast() {
        let marginLeft = this.imgs.style.marginLeft
        marginLeft = Number.parseFloat(marginLeft)
        console.log(marginLeft)
        if (Number.isNaN(marginLeft)) {
            marginLeft = '0'
        } 
        if (marginLeft >= 0) {
            return
        }
        marginLeft += 180
        this.imgs.style.marginLeft = marginLeft + 'px';
    }
    imgPointNext() {
        let marginLeft = this.imgs.style.marginLeft
        marginLeft = Number.parseFloat(marginLeft)
        console.log(marginLeft)
        if (Number.isNaN(marginLeft)) {
            marginLeft = '0'
        }
        if (marginLeft <= -180*2) {
            return
        }
        marginLeft -= 180
        this.imgs.style.marginLeft = marginLeft + 'px';
    }
    render() {
        const imgPoints = [1, 2, 3, 4,5,6,7,8,9,10,11,12]
        return (
            <div className='hot-points'>
                <div className='gallery'>
                    <div className='last' onClick={this.imgPointLast.bind(this)}>/</div>
                    <div className='imgPoints'>
                        <div className='imgs' ref={imgs => this.imgs = imgs}>
                            {
                                imgPoints.map((imgPoint, index) => {
                                    return (
                                        <div className='point-img' key={index}>
                                            {imgPoint}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div className='next' onClick={this.imgPointNext.bind(this)}>></div>
                </div>
            </div>
        )
    }
}