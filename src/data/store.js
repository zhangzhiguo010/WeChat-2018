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
const store = applyMiddleware(...middlewares)(createStore)(reducers)

export default store

