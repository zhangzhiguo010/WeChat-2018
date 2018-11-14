import actionCreator  from './actionCreator'
import {getToken} from '../../utils/token'
import {fetchAllFriend, changeFriendListWithMsg} from './session'
import eventEmitter from '../../utils/event'

const addTextMsgAaction = actionCreator('ADD_TEXT_MSG', 'to', 'message')

function addTextMsgAndChangeFriendList(who, message){
    return (dispatch, getState)=>{
        dispatch(addTextMsgAaction(who, message))
        changeFriendListWithMsg(message)(dispatch, getState)
    }
}

function init(){
    return (dispatch, getState)=>{
        sdk.conn.listen({   
            onOpened: ()=>{     //链接成功立即执行的回调函数
                dispatch(fetchAllFriend())
            },
            onTextMessage: (message)=>{
                message.value = message.value || message.data 
                addTextMsgAndChangeFriendList(message.from, message)(dispatch, getState)
            },
            onRoster: ()=>{   
                dispatch(fetchAllFriend())
            },
            onPresence: (message)=>{ 
                eventEmitter.emit('presence', message)
            }
        }) 
    }
}


function addTextMsg(to, message, chatType){
    return (dispatch, getState)=>{
        let name = getToken().user.nickname
        let id = sdk.conn.getUniqueId();              
        let msg = new WebIM.message('txt', id)
        msg.set({
            msg: message,                 
            to: to,               
            roomType: false,
            success:(id, serverMsgId)=>{ 
                msg.fromMe = true   // 用来区分信息是发送还是接收
                msg.from = name    // from：我的名字
                addTextMsgAndChangeFriendList(to, msg)(dispatch, getState)
            },
            fail: (e)=>{
                alert('消息到服务器失败')
            }
        });
        msg.body.chatType = chatType
        sdk.conn.send(msg.body);
    }
}

export {init, addTextMsg }
