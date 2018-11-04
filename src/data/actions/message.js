import actionCreator  from './actionCreator'
import {getToken} from '../../utils/token'
import {fetchAllFriend, changeFriendListWithMsg} from './session'
import eventEmitter from '../../utils/event'

const addTextMsgAaction = actionCreator('ADD_TEXT_MSG', 'to', 'message')

// const getAloneMsgAaction = actionCreator('GET_ALONE_MSG', 'message')

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
                message.value = message.value || message.data   // 做个兼容
                addTextMsgAndChangeFriendList(message.from, message)(dispatch, getState)
            },
            onRoster: ()=>{     // 别人处理完我发送的关于“好友请求”的信息，执行此函数
                dispatch(fetchAllFriend())
            },
            onPresence: (message)=>{   // 别人发来的关于“好友请求”的信息，执行此函数
                eventEmitter.emit('presence', message)
            }
        }) 
    }
}

/* 
*   任务一：发送文本消息到服务器（此处服务器接收消息和好友接收消息是有区别的）
*   任务二：保存此条消息到store
*/
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

/* 获取to的聊天消息 */
function getAloneMsg(){}

/* 改变消息状态，页面动态更新气泡提示：如对方看到后显示已经看过，没看过时下方显示消息未读 */
function changeMsgStatus(){}


export {init, addTextMsg, getAloneMsg, changeMsgStatus}
