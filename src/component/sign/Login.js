import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginToServer} from '../../data/actions/loginAction'
import SignBasic from './SignBasic'
import tooltip from '../../component/common/tooltip/index'
import history from '../../history/history'
import {setToken} from '../../utils/token'

// zhangzhiguo2580
@connect(
    (state)=>{return {status: state.login.status}},
    {loginToServer: loginToServer}
)
class Login extends Component{
    componentWillMount(){
        this.handleLogin = (data)=>{
            // console.log('点击登录')
            if(!data.userName || !data.password){
                tooltip.show({
                    type: 'error',
                    content: '账号密码不能为空'
                })
                return 
            }
            let options = { 
                user: data.userName.trim(),
                pwd: data.password,
                appKey: WebIM.config.appkey,
                apiUrl: WebIM.config.apiURL,
            }
            
            this.props.loginToServer(options).then(
                (token)=>{
                    setToken(token)
                    history.push('/chat')

                },
                (err)=>{
                    tooltip.show({
                        type: 'error',
                        content: '登录失败了'
                    })
                }
            )
        }
    }
    render(){
        return (
            <SignBasic hint="login" handleLogin={this.handleLogin} status={this.props.status}/>
        )
    }
}

export default Login 