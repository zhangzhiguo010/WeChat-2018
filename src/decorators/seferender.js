export default function safeRender(config){
    return function(target){ 
        if(config.active){
            [
                'render',
                'componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'componentWillUpdate',
                'componentDidUpdate',
                'compoentnWillUnmount',
                'shouldComponentUpdate'
            ].forEach((method)=>{
                let blankFn =  method === 'shouldComponentUpdate' ? ()=>{return true} : ()=>{return null}
                let unsafe = target.prototype[method] || blankFn    // 原来的方法  
                config.errorHandler = config.errorHandler || function(report){
                    console.log(report)
                }             

                target.prototype[method] = function(){              // 修改原方法
                    try{
                        return unsafe.call(this, arguments)
                    }catch(e){
                        let report = {
                            displayName: target.name,   // 组件名
                            method: method,             // 方法名
                            message: e.stack,           // 出了什么问题？
                            state: this.state,
                            props: this.props
                        }
                        config.errorHandler(report)
                        return blankFn.call(this, arguments)    // shouldComponentUpdate 和 render 函数在报错的时候也应该有返回值
                    }
                }
            })
        }
    
    }
}