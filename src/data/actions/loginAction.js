// 收集用户输入的数据
// 指定响应成功和失败时执行的函数
// 和服务器建立联系
// 成功时自动执行成功函数，失败时自动执行失败函数

// 这里成功函数和失败函数，分别是在调用loginToServer时再then里指定的，做到了不一样的情景执行不一样的任务

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