import React, { Component } from 'react'
import {connect} from 'react-redux'
import SlideBar from './sliderBar'
import BubblePanel from './bubblePanel'
import SessionList from './sessionList'
import {init} from '../../data/actions/message'
import './index.css'

@connect(
    ()=>({}),
    {init}
)
class Chat extends Component{
    componentWillMount(){
        this.props.init()
    }
    render(){    
        // 点击Link链接，渲染chat页面（不重载），读取location信息，传给sessionList子组件，现在换了一种方式，此处没用上
        let {chatType, friendName} = Object.assign({}, this.props.location.state)
        return (
            <div className="ctn-chat">
                <SlideBar />
                <SessionList chatType={chatType} chatId={friendName}/>
                {friendName ? <BubblePanel chatType={chatType} chatId={friendName} /> : null}
            </div>
        )
    }
}

export default Chat