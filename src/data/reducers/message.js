// msgList = { 'zhang': [], 'wang': []}

function messageReducer(initState={
    msgList: {},
    currentMsg: []
}, action){
    switch(action.type){
        case 'ADD_TEXT_MSG':            
            return Object.assign({}, initState, {msgList: addTextMsg(action.payload.to, action.payload.message, initState.msgList)})
        case 'GET_ALONE_MSG':
            return Object.assign({}, initState, {currentMsg: filterMsgList(action.payload.to, initState.msgList)})
        default:
            return initState
    }
}

export { messageReducer }


function filterMsgList(to, msgList){
    return msgList[to] ? [...msgList[to] ] : []
}

function addTextMsg(to, msg, msgList){
    let list = msgList[to] || []
    list.push(msg)
    msgList[to] = list
    return Object.assign({}, msgList)   //想要触发bubblePanel组件渲染，此处必须生成新的地址，原因未知
}