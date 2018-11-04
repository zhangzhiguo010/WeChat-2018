import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import safeRender from '../../decorators/seferender'
import './signBasic.css'

@safeRender({
    active: true,
    errorHandler: function(e){
        alert(e.displayName + "----" + e.method)
    }
})


class SignBasic extends Component{
    constructor(props){
        super(props)
        this.state = {
            hint: {
                header: '',
                button: '',
                account: '',
                footer: '',
                aLink: '',
                showNickName: false
            },
            userName: '',
            password: '',
            nickName: ''
        }
    }
    componentWillMount(){
        this.props.hint==="signUp" ? 
        this.setState({ hint: {header: '注册', button: '注册', account: '已有账户', footer: '立即登录', aLink: '/login',  showNickName: true } }) :             
        this.setState({ hint: {header: '登录', button: '登录', account: '没有账户', footer: '立即注册', aLink: '/signUp', showNickName: false} })

        this.changeInput = (event)=>{
            switch(event.target.name){
                case 'userName':
                    return  this.setState({userName: event.target.value})
                case 'password':
                    return  this.setState({password: event.target.value.trim()})
                case 'nickName':
                    return  this.setState({nickName: event.target.value})
                default:
                    return 
            }
        }

        this.handleSubmit = (ev)=>{
            ev.preventDefault()
            this.props.hint==="signUp" ? 
            this.props.handleSignUp(this.state) : 
            this.props.handleLogin(this.state)
        }
    } 
    render(){
        return (
            <div className="signBasic">
                <header>
                    <div className='header_inner'>
                        <h1 className='logo'>张治国 聊天小作品</h1>
                        <div className='signUpBtn'>
                            <Link to={this.state.hint.aLink}>{this.state.hint.footer}</Link>
                        </div>
                    </div>
                </header>
                <main>
                    <div className='main_inner'>
                        <form>
                            <h3>{this.state.hint.header}</h3>
                            <div className='row'>
                                <i className="iconfont icon-photo"></i>
                                <input type="text" name="userName" placeholder="用户名" className="input firstInput"
                                    value={this.state.userName} 
                                    onChange={this.changeInput}
                                />
                            </div>
                            <div className='row'>
                                <i className="iconfont icon-clock"></i>
                                <input type="password" name="password" placeholder="密码" className="input"
                                    value={this.state.password} 
                                    onChange={this.changeInput}
                                />
                            </div>

                            {this.state.hint.showNickName ? 
                                <div className='row'>
                                    <i className="iconfont icon-photo"></i>
                                    <input type="text" name="nickName" placeholder="输入昵称" className="input"
                                        value={this.state.nickName} 
                                        onChange={this.changeInput}
                                    /> 
                                </div>
                            : null}
                                
                            <div className='button_wrapper'>
                                <input type="submit" name="submit" className="button"
                                    value={this.state.hint.button}
                                    onClick={this.handleSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}


export default SignBasic