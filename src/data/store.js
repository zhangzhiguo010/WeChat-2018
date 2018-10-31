import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { signUpReducer } from './reducers/signUpReducer' 
import { loginReducer } from './reducers/loginReducer'
import { currentSessionReducer } from './reducers/session'
import { messageReducer } from './reducers/message'

const reducers = combineReducers({
    signUp: signUpReducer,
    login: loginReducer,
    currentSession: currentSessionReducer,
    message: messageReducer
})

const middlewares = [thunk]
// const store = createStore(reducers, applyMiddleware(...middlewares))
const store = applyMiddleware(...middlewares)(createStore)(reducers)

export default store


// const store = createStore(reducers, {}, applyMiddleware(...middlewares))
// dispatch收到的参数是函数：
// const loginToServer = (options)=>{
//     return (dispatch, getState)=>{
//         // 异步的操作
//          return action对象
//     }
// }

// 我怀疑中间件thunk把dispatch做了修改，如果传入的参数是函数，就执行它，并且把store上的方法传给它；
// if (typeof action === 'function') {
//     return action(dispatch, getState, extraArgument);
//   }
//   return next(action);
// }

// 最后执行store.dispatch(acton函数的结果，即普通action对象)

