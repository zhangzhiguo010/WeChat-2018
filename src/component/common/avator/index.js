import React, {Component} from 'react'
import Icon from '../icon/index'
import './index.css'

class Avator extends Component{
    render(){
        return (
            <div className='avator'>
                <Icon type={this.props.type} />
            </div>
        )
    }
}

export default Avator