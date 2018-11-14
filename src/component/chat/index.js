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
        let {chatType, friendName} = Object.assign({}, this.props.location.state)
        return (
            <div className="ctn-chat">
                <SlideBar />
                <SessionList chatType={chatType} chatId={friendName}/>
                <BubblePanel chatType={chatType} chatId={friendName} />
            </div>
        )
    }
}

export default Chat