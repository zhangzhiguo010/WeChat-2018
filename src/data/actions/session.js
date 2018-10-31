import actionCreator  from './actionCreator'

const currentSessionActon = actionCreator('CURRENT_SESSION', 'session')

const fetchAllFriendAction = actionCreator('FETCH_ALL_FRIEND', 'allFriend')


function fetchAllFriend(){           // 找到互为好友的人
    return (dispatch, getState)=>{
        return new Promise((resolve, reject)=>{
            sdk.conn.getRoster({
                success: (response)=>{     
                    let myFriends = response.filter((item)=>{
                        return item.subscription === 'both'
                    })
                    dispatch(fetchAllFriendAction(myFriends))
                    resolve()
                },
                error: (err)=>{
                    reject()
                }
            })
        })
    }
}

// 来到消息就执行该函数
// 接收到一条消息，可能是我发送的，也可能是好友发送的
// 遍历好友数组，假设消息的发送者是好友AAA，就给它添加newMsg属性，属性值就是他发送的那一条消息
// 在好友列表那个组件里，判断是否有newMsg属性，有的话就当做预览展示出来
function changeFriendListWithMsg(msg){
    return (dispatch, getState)=>{
        let name = msg.from   // 消息的发送者
        let allFriend = getState().currentSession.allFriend     //所有好友
        let newAllFriend = allFriend.map((item)=>{      // 新的好友列表
            let newItem = {...item}
            if(newItem.name === name){
                newItem.newMsg = msg
            }
            return newItem
        })
        dispatch(fetchAllFriendAction(newAllFriend))
    }
}

export { fetchAllFriend, currentSessionActon, changeFriendListWithMsg }









// const signUpAction = actionCreator('SIGNUP', 'status') 

// const signUpToServer = (options)=>{
//     return (dispatch, getState)=>{
//         return new Promise((resolve, reject)=>{
//             let onSuccess = options.success
//             let onError = options.error
//             options.success = ()=>{
//                 dispatch(signUpAction(2))
//                 onSuccess && onSuccess() 
//                 resolve()
//             }
//             options.error = ()=>{
//                 dispatch(signUpAction(3))
//                 onError && onError()    
//                 reject()
//             }
//             sdk.conn.registerUser(options) 
//         })
//     }
// }
// export { signUpToServer }