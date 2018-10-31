// key = ['name', 'age', 'sex']
// value = ['zhang', 18, 'nan']
const actionCreator = (type, ...key)=>{
    return (...value)=>{
        let action = { type: type, payload: {} }
        key.forEach((item, index)=>{
            action.payload[key[index]] = value[index]
        })
        return action
    }
}

export default actionCreator
