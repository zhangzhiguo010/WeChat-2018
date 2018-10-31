
import actionCreator  from './actionCreator'
const signUpAction = actionCreator('SIGNUP', 'status') 

const signUpToServer = (options)=>{
    return (dispatch, getState)=>{
        return new Promise((resolve, reject)=>{
            let onSuccess = options.success
            let onError = options.error
            options.success = ()=>{
                dispatch(signUpAction(2))
                onSuccess && onSuccess() 
                resolve()
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