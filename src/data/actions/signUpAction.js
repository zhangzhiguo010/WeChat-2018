
import actionCreator  from './actionCreator'
const signUpAction = actionCreator('SIGNUP', 'status') 


// 收集用户输入的数据
// 指定响应成功和失败时执行的函数
// 和服务器建立联系
// 成功时自动执行成功函数，失败时自动执行失败函数
// 这里成功函数和失败函数，分别是在调用signUpToServer时在then里指定的，做到了不一样的情景执行不一样的任务


const signUpToServer = (options)=>{
    return (dispatch, getState)=>{
        return new Promise((resolve, reject)=>{
            // options对象里应该定义响应成功和失败的函数，但是被我定义在了then里面
            let onSuccess = options.success
            let onError = options.error
            options.success = ()=>{
                dispatch(signUpAction(2))   //修改store中的注册状态为成功2
                onSuccess && onSuccess()    //此处不执行
                resolve()                   //注册成功时执行该函数，在then中被指定
            }
            options.error = ()=>{
                dispatch(signUpAction(3))
                onError && onError()    
                reject()
            }
            sdk.conn.registerUser(options) 
        })
    }
}
export { signUpToServer }