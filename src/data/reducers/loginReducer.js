// 初始：0， 进行中：1， 成功：2，  失败：3

const loginReducer = (initState={status: 0}, action)=>{
    switch(action.type){
        case 'LOGIN':
            return Object.assign({}, initState, {status: action.payload.status})
        default:
            return initState
    }
}
export { loginReducer }