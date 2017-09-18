var _CALLBACKFUNC = null;
import $ from 'jquery'
import GLOBALURL from '../utils/global'

//融云初始化
export function rongyunInit(callbackFunc){
	  if(GLOBALURL.RONGYUN_CHAT_ACCOUNT_APPKEY){
			RongIMClient.init(GLOBALURL.RONGYUN_CHAT_ACCOUNT_APPKEY); // 初始化融云token
			RongIMLib.RongIMVoice.init(); // 初始化语音
			setStatusListener(); // 设置监听器
			connectRYServer(); // 连接融云服务器
			_CALLBACKFUNC = callbackFunc;
		}
}

// 监听状态
export function setStatusListener(){
	 // 设置连接监听状态 （ status 标识当前连接状态 ）
	 // 连接状态监听器
	 RongIMClient.setConnectionStatusListener({
	    onChanged: function (status) {
	        switch (status) {
	            case RongIMLib.ConnectionStatus.CONNECTED:
	                console.log('链接成功');
	                break;
	            case RongIMLib.ConnectionStatus.CONNECTING:
	                console.log('正在链接');
	                break;
	            case RongIMLib.ConnectionStatus.DISCONNECTED:
	                console.log('断开连接');
	                break;
	            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
	                console.log('其他设备登录');
	                break;
	              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
	                console.log('域名不正确');
	                break;
	            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
	              console.log('网络不可用');
	              break;
	            }
	  }});

	 // 消息监听器
	 RongIMClient.setOnReceiveMessageListener({
	    // 接收到的消息
	    onReceived: function (message) {
	        // 判断消息类型
	        switch(message.messageType){
	            case RongIMClient.MessageType.TextMessage:
	              // message.content.content => 消息内容
	            	console.log("收到文字消息:"+JSON.stringify(message));
	            	dealMessage(message);
	              break;
	            case RongIMClient.MessageType.VoiceMessage:
	              // 对声音进行预加载
	            	console.log("收到声音消息:"+JSON.stringify(message.content.user.name));
	            	dealMessage(message);
	              break;
	            case RongIMClient.MessageType.ImageMessage:
	               // message.content.content => 图片缩略图 base64。
	               // message.content.imageUri => 原图 URL。
	               break;
	            case RongIMClient.MessageType.DiscussionNotificationMessage:
	               // message.content.extension => 讨论组中的人员。
	               break;
	            case RongIMClient.MessageType.LocationMessage:
	               // message.content.latiude => 纬度。
	               // message.content.content => 位置图片 base64。
	               break;
	            case RongIMClient.MessageType.RichContentMessage:
	               // message.content.content => 文本消息内容。
	               // message.content.url => 原图 URL。
	               break;
	            case RongIMClient.MessageType.InformationNotificationMessage:
	                // do something...
	               break;
	            case RongIMClient.MessageType.ContactNotificationMessage:
	                // do something...
	               break;
	            case RongIMClient.MessageType.ProfileNotificationMessage:
	                // do something...
	               break;
	            case RongIMClient.MessageType.CommandNotificationMessage:
	                // do something...
	               break;
	            case RongIMClient.MessageType.CommandMessage:
	                // do something...
	               break;
	            case RongIMClient.MessageType.UnknownMessage:
	                // do something...
	               break;
	            default:
	                // do something...
	        }
	    }
	});
}

//连接
export function connectRYServer(){
	  RongIMClient.connect(GLOBALURL.RONGYUN_CHAT_ACCOUNT_TOKEN,{
        onSuccess: function() {
          console.log("connect successfully");
        },
        onTokenIncorrect: function() {
          console.log('token ');
        },
        onError:function(errorCode){
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                  info = '不可接受的协议版本';
                  break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                  info = 'appkey不正确';
                  break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                  info = '服务器不可用';
                  break;
              }
              console.log(errorCode);
        }
	  });
}
// 发送消息
export function sendMessage(groupId,content,duration,extra,userPk,userName){
	console.log("------发送消息事件------");
	var msg = new RongIMLib.VoiceMessage ({content:content,duration:duration,extra:extra,user:{"id":userPk+"_","name":userName}});
	var conversationtype = RongIMLib.ConversationType.GROUP; // 群组消息
	var targetId = groupId; // 目标 Id
	RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
    // 发送消息成功
    onSuccess: function (message) {
      //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
      var msgContent = message.content;
    	if(msgContent.messageName == "VoiceMessage"){
    		var base64Str = msgContent.content; // 声音文件
    		var duration = msgContent.duration; // 声音长度
    		var extras = msgContent.extra.split("---");
    		var groupId = extras[0]; // 群组id
    		var sendTime = extras[1]; // 发送时间
    		var senderPic = extras[2]; // 发送人头像
    		var senderName = msgContent.user.name; // 发送人姓名
    		var senderPk = msgContent.user.id; // 发送人pk
    		var _members= {
    			"groupId":groupId,
    			"sendTime":sendTime,
    			"senderPic":senderPic,
    			"senderName":senderName,
    			"senderPk":senderPk,
    			"duration":duration,
    			"content":base64Str,
    			"readStatus":"0"
    		};
    		var _MEMBERS = sessionStorage.getItem("_MEMBERS");
    		if(!_MEMBERS){
    			_MEMBERS = [];
    		}else{
    			_MEMBERS = JSON.parse(_MEMBERS);
    		}
    		_MEMBERS.push(_members);
    	  sessionStorage.setItem("_MEMBERS",JSON.stringify(_MEMBERS));
				if(_CALLBACKFUNC){
					_CALLBACKFUNC();
				}
    	}
    },
    onError: function (errorCode,message) {
        var info = '';
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误';
                break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息';
                break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中';
                break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中';
                break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中';
                break;
            default :
                info = x;
                break;
        }
        console.log('发送失败:' + info);
        }
    });
}
// 处理接收到消息的函数
export function dealMessage(message){
	//console.log(JSON.stringify(message));
	// 消息对象
	var msgContent = message.content;
	if(msgContent.messageName == "VoiceMessage"){
		var base64Str = msgContent.content; // 声音文件
		var duration = msgContent.duration; // 声音长度
		var extras = msgContent.extra.split("---");
		var groupId = extras[0]; // 群组id
		var sendTime = extras[1]; // 发送时间
		var senderPic = extras[2]; // 发送人头像
		var senderName = msgContent.user.name; // 发送人姓名
		var senderPk = msgContent.user.id; // 发送人pk
		var _members = {
				"groupId":groupId,
				"sendTime":sendTime,
				"senderPic":senderPic,
				"senderName":senderName,
				"senderPk":senderPk,
				"duration":duration,
				"content":base64Str,
				"readStatus":"0"
		};
		var _MEMBERS = sessionStorage.getItem("_MEMBERS");
		if(!_MEMBERS){
			_MEMBERS = [];
		}else{
			_MEMBERS = JSON.parse(_MEMBERS);
		}
		_MEMBERS.push(_members);
	  sessionStorage.setItem("_MEMBERS",JSON.stringify(_MEMBERS));
		if(_CALLBACKFUNC){
			_CALLBACKFUNC();
		}
	}
}
