# 一、项目过程：
```js
	/* store状态树 */
	1. signUp:
		1. status:0
		
		* 'SIGNUP':
			dispatch({type:'SIGNUP', payload:{status:number}})
			修改后: status:number
	2. login:
		1. status:0
		
		* 'LOGIN'
			dispatch({type:'LOGIN', payload:{status:number}})
			修改后: status:number
	3. currentSession:
		1. session: null
		2. allFriend: []
		
		* 'CURRENT_SESSION' →→→ 修改session
			dispatch({type:'CURRENT_SESSION', payload:{session:'zhang'}})
			修改后：session:'zhang'
		* 'FETCH_ALL_FRIEND'→→→ 修改allFriend
			dispatch({type:'FETCH_ALL_FRIEND', {allFriend:[{},{}...]}})
			修改后：[{},{}...]
	4. message: 
		1. msgList: {}
		 	msgList = { '好友1': [{好友1的消息}, {我发的消息}], '好友2': [{我发的消息}, {好友2发的消息}]}
		2. currentMsg: []
		
		* 'ADD_TEXT_MSG' →→→ 修改msgList
			dispatch({type:'ADD_TEXT_MSG', payload:{to:'', message:''}})
			修改后：{zhang: ['你好'], ...}
		* 'GET_ALONE_MSG' →→→ 修改currentMsg
			dispatch({type:'GET_ALONE_MSG', payload:{to:''}})
			修改后：['你好']		
```

```js
    sdk.conn.listen({   
        //监听：链接成功时，立即执行此函数
        onOpened: ()=>{     
            dispatch(fetchAllFriend())
        },
        onTextMessage: (message)=>{
            message.value = message.value || message.data
            dispatch(addTextMsgAaction(message.from, message))
            dispatch(changeFriendListWithMsg(message))
        },
        onRoster: (response)=>{  
            dispatch(fetchAllFriend())
        },
        onPresence: (response)=>{   
            eventEmitter.emit('presence', response)
        }
    }) 
```

##1、注册过程：

```js
	let options = { 
        username: data.userName.trim().toLowerCase(),
        password: data.password,
        nickname: data.nickName,
        appKey: WebIM.config.appkey,
        apiUrl: WebIM.config.apiURL,
        success: ()=>{
        	history.push('/login')	//跳转到登录页面 
        },
        error: ()=>{
	        tooltip.show({
                type: 'error',
                content: '注册失败了'
            })
        }
    }
    sdk.conn.registerUser(options) 
```

##2、登录过程：

```js
    let options = { 
        user: data.userName.trim(),
        pwd: data.password,
        appKey: WebIM.config.appkey,
        apiUrl: WebIM.config.apiURL,
        success: ()=>{
        	setToken(token)         //记录token  
        	history.push('/chat')	//跳转到聊天页面 
        },
        error: ()=>{
        	tooltip.show({
                type: 'error',
                content: '登录失败了'
            })
        }
    }
```

##3、我加别人为好友过程：

1. 我加别人为好友时，点击添加按钮出现dialog组件弹出层，输入对方名字和留言信息
2. 调用subscribe API 传入对方名字和短信息，
```js
	sdk.conn.subscribe({
		to: /* 对方的名字 */,
		message: /* 留言信息 */
	})
```
3. 首先调用onRoster监听函数
```js
	/* onRoster函数response响应数据 */
    response: [{subscription: 'none'}]
```
4. 等待对方做出反应：

* 别人拒绝时，首先调用onPresence监听函数, 然后调用onRoster监听函数
```js
	/* onPresence函数response响应数据 */
	{type: 'subscribed'}
	
	/* onRoster函数response响应数据 */
	[{subscription: 'both'}]
```

* 别人拒绝时，首先调用onPresence监听函数, 然后调用onRoster监听函数
```js
	/* onPresence函数response响应数据 */
	{type: 'unsubscribed'}
	
	/* onRoster函数response响应数据 */
	[{subscription: 'none'}]
```

##4、别人加我为好友过程：

1. 别人添加我为好友时，首先调用onPresence监听函数，
```js
	/* onPresence函数response响应数据 */
	{type: 'subscribe'}
```

2. 等待我做出反应：

* 我点击同意按钮后，先调用同意函数，然后调用onRoster监听函数，最后调用onPresence监听函数
```js
	/* 点击同意按钮 */
    sdk.conn.subscribed({     
        to: message.from,
        message : '[resp:true]'
    });
    sdk.conn.subscribe({
        to: message.from,
        message : '[resp:true]'
    });
    
	/* onRoster函数response响应数据 */
	[{subscription: 'both'}]
	
	/* onPresence函数response响应数据 */
	{type: 'subscribed'}
```

* 我点击拒绝按钮后，只调用拒绝函数
```js
	/* 点击拒绝按钮 */
    sdk.conn.unsubscribed({
        to: message.from,
        message : 'rejectAddFriend'
    })
```

##5、我收消息过程：

1. 好友发来消息时，首先调用onTextMessage监听函数，运行两次dispatch

```js
	/* onTextMessage监听函数response响应数据 */
	{from: /*好友名字*/, value: /*文本消息*/, data:/*文本消息*/}
	
	
	/* 将消息添加到消息列表 */
	dispatch({
		type:'ADD_TEXT_MSG', payload:{to:/*发送消息的朋友名字*/, message:/*消息内容*/}
	})	
	/* 修改好友列表 */
	dispatch({
		type:'FETCH_ALL_FRIEND', {allFriend:[{to:/*对话的好友名字*/, newMsg:/*消息内容*/}...]}
	})
```

##6、我发消息过程：

```js
	/* 创建文本消息，发到服务器，成功以后放入消息列表，自动渲染气泡页 */
    let id = sdk.conn.getUniqueId();              
    let msg = new WebIM.message('txt', id)
    msg.set({
        msg: msg /*消息内容*/,                 
        to: to /*接收消息的人*/,               
        roomType: false,
        success:(id, serverMsgId)=>{ 
            msg.fromMe = true   // 用来区分信息是发送还是接收
```
	
	