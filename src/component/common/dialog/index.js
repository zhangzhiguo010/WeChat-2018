import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Icon from '../icon/index'
import './index.css'

class Dialog extends Component{
    static defaultProps = {
      showMask: true
    }
    componentWillMount(){
        this.closeDialog = ()=>{
            close()
            this.props.onClose && this.props.onClose()    //执行callback，前提是存在 
        }
    }

    render(){
        let {title, content, footer, showMask} = this.props       
        return (
            <div className='dlg_wrapper'>
                {showMask ? 
                    <div className='dlg_mask' /> : 
                null}
                <div className='dlg'>
                    <div className='dlg_closeBtn' onClick={this.closeDialog}>
                        <Icon type='guanbi' />
                    </div>
                    <div className='dlg_header'>{title}</div>
                    <div className='dlg_main'>{content}</div>
                    <div className='dlg_footer'>{footer}</div>
                </div>
            </div>
        )
    }
}


let container
function show(props){
    container && close()
    if(container){
        close()
    }
    container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.render(<Dialog {...props}/>, container)
}

function close(){
    if(container){
        ReactDOM.unmountComponentAtNode(container)
        container.parentNode.removeChild(container)
        container = null
    }
}


export default {show, close}
