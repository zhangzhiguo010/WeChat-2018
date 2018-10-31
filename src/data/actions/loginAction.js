// import sdk from '../../sdk/init'
// import actionCreator  from './actionCreator'

// const loginAction = actionCreator('LOGIN', 'status') 

const loginToServer = (options)=>{
    return (dispatch, getState)=>{
        return new Promise((resolve, reject)=>{
            options.success = (token)=>{
                resolve(token)
            }
            options.error = (err)=>{ 
                reject(err)
            }
            sdk.conn.open(options) 
        })
    }
}

export { loginToServer }

// const loginToServer = (options)=>{
//     return (dispatch, getState)=>{
//         let startTime = Date.now()
//         setTimeout(()=>{
//             dispatch({
//                 type: 'LOGIN',
//                 payload: {
//                     status: 100
//                 }
//             })
//             console.log(Date.now() - startTime)
//         }, 2000)
//     }
// }