import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './data/store'
import history from './history/history'
import conn from './sdk/init'
import {getToken} from './utils/token'
import Login from './component/sign/Login'
import Signup from './component/sign/Signup'
import Chat from './component/chat/index'
import {HashRouter as Router, Route} from 'react-router-dom' 
import './App.css'



window.sdk = { conn: conn }

class Home extends Component{
    render(){
        let token = getToken()
        return (
            <div>
                {!token && 
                    history.location.pathname!=='/login' ? history.push('/login') : 
                null}
            </div>
        )
    }
}

export default class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <div className='app_Wrapper'>
                        <Route path="/" component={Home} />
                        <Route path="/signUp" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/chat" component={Chat} /> 
                        {/* <Route path="/chat/:chatType/:chatId" component={Chat} />  */}
                    </div>
                </Router>
            </Provider>
        )
    }
}