import React, { Component } from 'react'
import '../css/hotPoint.css'
import icon1 from '../imgs/1.png'
import next from '../imgs/right.png'
import last from '../imgs/left.png'
// const arr = [icon1, icon2, icon3]
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
        console.log(marginLeft)
        marginLeft += 110
        console.log(marginLeft)
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
        marginLeft -= 110
        this.imgs.style.marginLeft = marginLeft + 'px';
    }
    render() {
        const imgPoints = [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        return (
            <div className='hot-points'>
                <div className='gallery'>
                    <div className='last' onClick={this.imgPointLast.bind(this)}>
                        <img src={last} alt="" /></div>
                    <div className='imgPoints'>
                        <div className='imgs' ref={imgs => this.imgs = imgs}>
                            {
                                imgPoints.map((imgPoint, index) => {
                                    return (
                                        <div className='point-img' key={index}>
                                            <img src={icon1} alt=""/>
                                            <div className='img-text'>故宫{index}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div className='next' onClick={this.imgPointNext.bind(this)}><img src={next} alt=""/></div>
                </div>
            </div>
        )
    }
}