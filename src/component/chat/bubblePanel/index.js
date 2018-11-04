import React, { Component } from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {addTextMsg} from '../../../data/actions/message'
import './index.css'

@connect(
    (state)=>{return {
        session: state.currentSession.session,      // sessionList组件中我选择的好友（我点击的Link）
        msgList: state.message.msgList              // 所有好友所有信息
    }},
    {addTextMsg}
)
class BubblePanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            message: '',
            aloneMessage: ''
        }
    }
    componentWillMount(){
        this.handleUserInput = (ev)=>{
            this.setState({message: ev.target.value})
        }
        this.sendMessage = ()=>{
            let {addTextMsg, session, chatType} = this.props
            let {message} = this.state
            this.setState({
                message: ''
            })
            session && this.state.message.trim()!=='' && addTextMsg(session.name, message, chatType)
        }
        this.getAloneMessage = ()=>{
            let {msgList, session} = this.props
            // if(!session){
            //     return []
            // }
            let xx = session!==null ? session.name : ''
            return msgList[xx] || []
        }
    }
    componentDidUpdate(){
        this.mainRef.scrollTop = this.mainRef.scrollHeight
    }
    render(){
        let {session} = this.props
        let aloneMessage = this.getAloneMessage()
        return (
            <div className='bp'>
                <div className="bp_header">
                    {session ? session.name : ''}
                </div>
                <div className="bp_main" ref={(content)=>{this.mainRef = content}}>
                    <div className="timeHint"></div>
                    {
                        aloneMessage.map((item)=>{
                            return <MessageItemErrorWrapper key={item.id} msg={item} />
                        })
                    }
                </div>
                <div className="bp_footer">
                    <textarea name="" id="" cols="30" rows="10" placeholder='输入消息' className='textArea' 
                        value={this.state.message}
                        onChange={this.handleUserInput} 
                    />
                    <div className='sendButton' onClick={this.sendMessage}>发送</div>
                </div>
            </div>
        )
    }
}

export default BubblePanel


class MessageItemErrorWrapper extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err, info){
        this.setState({
            hasError: true
        })
    }
    render(){
        if(this.state.hasError){
            return <div>出错了，请联系RD修复</div>
        }
        return <MessageItem msg={this.props.msg} />
    }
}


class MessageItem extends Component{
    render(){
        let {msg} = this.props
        // 如何区分收到的还是发出的？在发出的对象上添加fromMe属性，有该属性就是我发出，没有该属性就是我收到
        let fromMe = msg.fromMe ? true : false  
        let mi_item = classnames({
            'mi_item': true,
            'you': !fromMe,
            'me': fromMe
        })      
        return (
            <div className={mi_item}>
                <figure className='mi_photo'>
                    <img src={require('../../../img/photo_other.jpg')} alt="头像"/>
                </figure>
                <div className='mi_text'>
                    
                    {msg.value}
                    <div className='san'></div>
                </div>
            </div>
        )
    }
}