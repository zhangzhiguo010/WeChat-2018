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

function changeFriendListWithMsg(msg){
    return (dispatch, getState)=>{
        let name = msg.body ? msg.body.to : msg.from            // 发送消息的朋友
        let allFriend = getState().currentSession.allFriend     // 所有好友
        let newAllFriend = allFriend.map((item)=>{              // 新的好友列表
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