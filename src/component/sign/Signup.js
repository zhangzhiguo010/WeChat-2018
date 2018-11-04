import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpToServer} from '../../data/actions/signUpAction'
import SignBasic from './SignBasic'
import tooltip from '../../component/common/tooltip/index'
import history from '../../history/history'


@connect(
    (state)=>{return {status: state.signUp.status}},
    {signUpToServer: signUpToServer}
)
class SignUp extends Component{
    componentWillMount(){
        // handleSignUp做三件事：收集用户输入、和服务器建立联系、指定成功任务和失败任务
        this.handleSignUp = (data)=>{
            if(!data.userName || !data.password || !data.nickName){
                tooltip.show({
                    type: 'error',
                    content: '账号密码不能为空'
                })
                return 
            }
            let options = { 
                username: data.userName.trim().toLowerCase(),
                password: data.password,
                nickname: data.nickName,
                appKey: WebIM.config.appkey,
                apiUrl: WebIM.config.apiURL,
            }
            this.props.signUpToServer(options).then(
                ()=>{
                    history.push('/login')          //注册成功时跳转到登录页面，让用户输入用户名和密码后即可正常使用
                },
                ()=>{
                    tooltip.show({                  //注册失败时，给出一个提示
                        content: '注册失败了',
                        type: 'error'
                    })
                }
            )
        }
    }
    render(){
        return (
            <SignBasic hint="signUp" handleSignUp={this.handleSignUp} status={this.props.status}/>
        )
    }
}

export default SignUp 