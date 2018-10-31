import React, { Component } from 'react'
import dialog from '../../common/dialog/index'
import { Link } from 'react-router-dom' 
import {connect} from 'react-redux'
import {currentSessionActon} from '../../../data/actions/session'
import Avator from '../../common/avator/index'
import eventEmitter from '../../../utils/event'
import shallowequal from 'shallowequal'
import './index.css'

@connect(
    (state)=>{return {allFriend: state.currentSession.allFriend}}
)
class SessionList extends Component{
    componentWillMount(){       
        eventEmitter.on('presence', this.handlePresence)
    }
    componentWillUnmount(){
        eventEmitter.removeListener('presence', this.handlePresence)
    }
    handlePresence(message){
        // 信息类型是subscribe时，就是：“添加好友”
        if (message.type === 'subscribe') {
            dialog.show({
                title: '好友申请',
                content: <div>
                            <div>{message.from}邀请你加为好友</div>
                            <div>留言：{message.status}</div>
                        </div>,
                footer: <div>
                            <button className='reject' onClick={this.reject.bind(this, message)}>拒绝</button>
                            <button className='accept' onClick={this.accept.bind(this, message)}>同意</button>
                        </div>
            })
        } 
    }
    accept(message){
        sdk.conn.subscribed({     
            to: message.from,
            message : '[resp:true]'
        });
        sdk.conn.subscribe({        //需要反向添加对方好友
            to: message.from,
            message : '[resp:true]'
        });
        dialog.close()
    }
    reject(message){
        sdk.conn.unsubscribed({
            to: message.from,
            message : 'rejectAddFriend'
        })
        dialog.close()
    }
    render(){
        let {chatId, allFriend} = this.props
        return (
            <div className="sessionList">
                <ul>{
                    allFriend.length===0 ? null : allFriend.map((item)=>{
                        let isSelected = chatId === item.name ? true : false
                        return (
                            <li key={item.name} className={isSelected ? 'list listActive' : 'list'}>
                                <SessionItem  friend={item}/>
                            </li>
                        )
                    })
                }</ul>

                {/* {allFriend.length===0 ? null : allFriend.map((item)=>{   
                    let isSelected = chatId === item.name ? true : false
                    return <SessionItem key={item.name} friend={item} isSelected={isSelected}/>
                })} */}
            </div>
        )
    }
}

@connect(
    ()=>{return {}},
    {currentSessionActon}
)
class SessionItem extends Component{
    componentWillMount(){
        this.itemClick = ()=>{
            let {currentSessionActon, friend} = this.props
            currentSessionActon(friend)     //已经改造，connect函数自动dispatch
        }  
    }
    shouldComponentUpdate(nextProps, nextState){
        // 问题点：以前好友A发一条消息，渲染四次，因为好友列表中有四个好友
        // 改善：好友A发一条消息，只要好友A渲染（渲染目的是添加消息预览）,其他好友不渲染
        // 当上一个好友对象和新的好友对象不同时，此函数返回true，进行渲染
        // 为什么不同？因为如果是好友A发的消息，就会在A对象上添加newMsg属性，故而不同
        // 附加：如果上一次点击的和这次点击的不同，返回true进行渲染，渲染两次（一个是去掉active, 一个是加上active） 
        return !shallowequal(this.props.friend, nextProps.friend) || !shallowequal(this.props.isSelected, nextProps.isSelected)
    }
    render(){      
        let {friend} = this.props    
        let url = {
            pathname: `/chat/single/${friend.name}`,
            state: {'chatType': 'single', 'friendName': `${friend.name}`}
        }
        // 点击Link链接，渲染chat页面（不重载），读取location信息，传给sessionList子组件
        return (
            <div className='sessionItem'>
                <Link to={url} onClick={this.itemClick} >  
                    <div className="sm_lf">
                        <img src={require('../../../img/photo_other.jpg')} alt=""/>
                    </div>
                    <div className="sm_rt">
                        <h3>{friend.name}</h3>
                        <p>{friend.newMsg ? friend.newMsg.value : ''}</p>
                    </div>
                </Link>
            </div>
        )
    }
}
export default SessionList