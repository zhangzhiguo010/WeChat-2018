import React, { Component } from 'react'
import {getToken} from '../../../utils/token'
import './index.css'

class SlideBar extends Component{
    render(){
        let tokenUser = getToken()
        let username = tokenUser ? tokenUser.user.username : ''
        return (
            <div className="sb">
                <div className='sb_header'>
                    <div className="photo_wrapper avator">
                        <img src={require('../../../img/photo.jpg')} alt=""/>
                    </div>
                    <p className='myNickName'>{username}</p>
                </div>
                <div className='sb_main'>
                    <div className="icon_wrapper chat">
                        <i className="iconfont icon-chat"></i>
                    </div>
                </div>
                <div className='sb_footer'>
                    <dir className="icon_wrapper setting">
                        <i className="iconfont icon-shezhi"></i>
                    </dir>
                </div>
            </div>
        )
    }
}

export default SlideBar