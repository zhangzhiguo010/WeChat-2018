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
                    console.log('注册成功')
                    history.push('/login')
                },
                ()=>{
                    console.log('注册失败')
                    tooltip.show({
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