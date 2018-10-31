import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// tooltip样式 48分钟
class Tooltip extends Component{
    static defaultProps = {
        time: 3000,         //3s自动消失
        type: 'success',    //默认成功的样式
        content: ''         // 显示的内容
    }
    render(){
        // 视频2 36分钟 添加类
        let {type, content} = this.props
        return (
            <div className="tooltips">
                <div>{`${type}: ${content}`}</div>
            </div>
        )
    }
}



let d
let timer = null
function show(props){
    if(d){
        close()
    }
    d = document.createElement('div')
    document.body.appendChild(d)
    ReactDOM.render(<Tooltip {...props} />, d)

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
        close()
    }, props.time || 3000);
}
function close(){
    if(d){
        ReactDOM.unmountComponentAtNode(d)
        d.parentNode.removeChild(d)
        d = null
    }
}

const tooltip = {show, close}

export default tooltip