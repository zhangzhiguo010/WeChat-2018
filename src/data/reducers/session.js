function currentSessionReducer(initState={
    session: null,
    allFriend: []
}, action){
    switch(action.type){
        case 'CURRENT_SESSION':
            return Object.assign({}, initState, {session: action.payload.session})
        case 'FETCH_ALL_FRIEND':
            return Object.assign({}, initState, {allFriend: [...action.payload.allFriend]})
        default:
            return initState
    }
}

export { currentSessionReducer }