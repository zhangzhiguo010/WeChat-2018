import React, { Component } from 'react'
import {getToken} from '../../../utils/token'
import Icon from '../../common/icon/index'
import dialog from '../../common/dialog/index'

import './index.css'

class SlideBar extends Component{
    componentWillMount(){
        this.showAddFriend = ()=>{
            dialog.show({
                title: '添加好友',
                content: <div className='sb_dlg_header_inner'>
                            <input type="text" placeholder='输入名字'
                                ref = {(content)=>{this.nickNameRef = content}}
                            />
                        </div>,
                footer: <div className='sb_dlg_footer_inner'>
                            <div className="button" onClick={this.confirmAddFriend}>确定</div>
                        </div>
            })
        }
        this.confirmAddFriend = ()=>{
            sdk.conn.subscribe({
                to: this.nickNameRef.value.trim(),
                message: '你好，我是张治国，交个朋友呗！'
            })
            dialog.close()
        }
    }
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
                    <dir className="icon_wrapper setting" onClick={this.showAddFriend}>
                        <i className="iconfont icon-shezhi"></i>
                    </dir>
                </div>
            </div>
        )
    }
}

export default SlideBar