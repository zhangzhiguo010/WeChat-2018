let token = null
const getToken = ()=>{
    return token
}
const setToken = (newToken)=>{
    return token = newToken
}
export {getToken, setToken}


// !function xx(){
//     let token = 100
//     return {
//         get: ()=>{},
//         set: ()=>{}
//     }
// }()