<template>
<div>
  <header>
    <div class="header">
        <h1 class="groupName">群聊天</h1>
        <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
        <ul class="mymenu return" style="font-size:0.8rem;left:inherit;right:0;width:2rem;" @click="tabToggle()">
          <li style="background:#06C1AE;"><a href="javascript:void(0);" style="color:#fff;font-size:1.0rem;"><i class="icon-plus"></i></a>
            <ul class="submenu groupAction">
              <li><a href="javascript:void(0);" data-type="1" @click="groupAction(1)"><i class="ba-color0 icon-info-sign"></i>群介绍</a></li>
              <li><a href="javascript:void(0);" data-type="2" @click="groupAction(2)"><i class="ba-color0 icon-group"></i>群地图</a></li>
              <li><a href="javascript:void(0);" data-type="3" @click="groupAction(3)"><i class="ba-color0 icon-download-alt"></i>退出群</a></li>
              <li><a href="javascript:void(0);" data-type="4" @click="groupAction(4)"><i class="ba-color0 icon-upload-alt"></i>添加成员</a></li>
              <li><a href="javascript:void(0);" data-type="5" @click="groupAction(5)"><i class="ba-color0 icon-minus-sign"></i>群解散</a></li>
            </ul>
          </li>
        </ul>
    </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="chat">
    <div class="box_bd scroll-wrapper" style="margin-bottom: 0px;background-color:#f0f0f0;">
      <canvas id="emoji" class="emoji-canvas" width="720" height="1500"></canvas>
      <div class="scroll-content J_scrollContent">
        <div class="chatContent" id="chatContent" style="overflow-y:auto;"></div>
      </div>
    </div>
    <div class="box_ft close">
      <div class="input-wrapper J_inputWrapper">
        <!-- <button type="button" class="btn cy-btn btn-red" id="sendMessage">按住说话</button> -->
        <x-button type="primary" class="btn cy-btn btn-red" id="sendMessage" style="width:90%;">按住说话</x-button>
      </div>
    </div>
  </div>

  <!-- 录音  -->
  <div class="comment-module" hidden="hidden">
    <div class="kuang" style="left:6rem;right:6rem;">
      <div class="comment-con">
        <img src="../../images/group/radio.jpg" />
      </div>
    </div>
  </div>

</div>
</template>

<style>
  @import './../../styles/chat.css';
</style>

<script>
  import { XButton } from 'vux'
  import GLOBALURL from './../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import MSGLEFT from './../../images/group/msg_left.png'
  import MSGRIGHT from './../../images/group/msg_right.png'
  import { initLoginStatus,dateFormatMin } from '../../utils/utils'
  import $ from 'jquery'

  var _prepath = "";
  var userPk = "";
  var groupId =  "";
  var userPic = "";
  var userName = "";
  var userId = "";
  var groupPk =  "";
  var _MEMBERS = "";

  export default{
    name: 'GroupChat',
    components: {
      XButton
    },
    data(){
      return{
      }
    },
    created () {
      _prepath = sessionStorage.getItem("_prepath");
      sessionStorage.setItem("_prepath",this.$route.fullPath);
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userPk = userInfo.userpk;
        userId = userInfo.userphonenumber;
        userPic = userInfo.userinfo.userinfoprofileimageurl?userInfo.userinfo.userinfoprofileimageurl:logoSrc;
        userName = userInfo.userinfo.userinfoname;
      }
    },
    mounted(){
     	var createrPk = "";
      var groupName = "";
     	var groupInfo = sessionStorage.getItem("groupInfo");
     	if(groupInfo) {
     		groupInfo = JSON.parse(groupInfo);
     		groupPk = groupInfo.groupPk;
     		groupId = groupInfo.groupId;
     		createrPk = groupInfo.createrPk;
     		groupName = groupInfo.groupName;
     	}
     	$(".groupName").text(groupName);
   		if(groupId == "G1600000000"){
   			$(".groupAction li:eq(3) a").addClass("off");
   			$(".groupAction li:eq(4) a").addClass("off");
   			$(".groupAction li:eq(2) a").addClass("off");
   		}else if(userPk!=createrPk){
   			$(".groupAction li:eq(3) a").addClass("off");
   			$(".groupAction li:eq(4) a").addClass("off");
   		}else{
   			$(".groupAction li:eq(2) a").addClass("off");
   		}
      this.rongyunInit();
      this.initJSSDK();
      this.initMessageList();
    },
    methods: {
      tabToggle(){
        $(".mymenu li").toggleClass("active");
      },
      // 群操作
      groupAction:function(actionType){
        var isOff = $(".groupAction li:eq("+(actionType-1)+") a").hasClass("off");
        if(!isOff){
          if(actionType == "1"){
            this.$router.replace({path:"/group/groupDetail?groupType=1&groupPk="+groupPk+"&groupId="+groupId});
          }else if(actionType == "2"){ // 群地图
            this.$router.replace({path:"/group/groupMap?groupPk="+groupPk});
          }else if(actionType == "3"){ // 退出群
            this.quitGroup(userPk,groupId,userId);
          }else if(actionType == "4"){ // 邀请成员
            this.$router.replace({path:"/group/inviteGroup?groupPk="+groupPk});
          }else if(actionType == "5"){ // 解散群
            this.dismissGroup(userPk,groupId);
          }
        }
      },
      // 返回上一页
      pageBack:function(){
        if(_prepath &&　_prepath.indexOf("home")==-1 && _prepath.indexOf("groupChat")==-1){
          this.$router.replace({path:_prepath});
        }else{
          this.$router.replace({path:"/home?modelIndex=1"});
        }
      },

      // 退出群
      quitGroup:function(userPk,groupId,userId){
        var router = this.$router;
        layer.open({
          content: '是否确认退出群组?',btn: ['确定', '取消'],yes: function(index){
            layer.close(index);
            var params = {
              "driverId":userPk,
              "groupId":groupId,
              "userId":userId,
              "platform":"3",
            };
            $.post(GLOBALURL.QUIT_GROUP,params,function(data){
              if(data.statusCode == 0){
                layer.open({content:'退出群成功',skin:'msg',time: 2});
                router.replace({path:"/group/ownGroup"});
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
            },"json");
          }
        });
      },

      // 解散群
      dismissGroup:function(userPk,groupId){
        var dismissGroup = this.dismissGroup;
        var router = this.$router;
        layer.open({content: '是否确认解散群组?',btn: ['确定', '取消'],yes: function(index){
            layer.close(index);
            var params = {
              "driverId":userPk,
              "groupId":groupId,
              "platform":"3",
            };
            $.post(GLOBALURL.DISMISS_GROUP,params,function(data){
              if(data.statusCode == 0){
                layer.open({content:data.message,skin:'msg',time: 2});
                router.replace({path:"/group/ownGroup"});
              }else if(data.statusCode == -999){
                //initLoginStatus(dismissGroup(userPk,groupId));
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
            },"json");
          }
        });
      },

      // 初始化消息列表
      initMessageList:function(){
      	var html ="";
        _MEMBERS = sessionStorage.getItem("_MEMBERS");
        if(_MEMBERS){
          _MEMBERS = JSON.parse(_MEMBERS);
        }else{
          _MEMBERS = [];
        }
      	for(var i=0;i<_MEMBERS.length;i++){
      		var _groupId =  _MEMBERS[i].groupId;
      		var sendTime = _MEMBERS[i].sendTime;
      		var senderPic = _MEMBERS[i].senderPic;
      		var senderName = _MEMBERS[i].senderName;
      		var senderPk = _MEMBERS[i].senderPk;
      		var duration = _MEMBERS[i].duration;
      		var content = _MEMBERS[i].content;
      		var readStatus = _MEMBERS[i].readStatus;
      		if(readStatus == "0"){
      			readStatus = "<span style=\"color:red;font-size:0.3rem;\">●</span>";
      		}else{
      			readStatus = "<span style=\"color:red;font-size:0.3rem;display:none;\">●</span>";
      		}
      		if(groupId == _groupId){
      			var imgHtml= "";
      			var typeClass= "";
      			var typeClass_ = "";
            var imgSrc = "";
      			if( (userPk+"_") == senderPk || (userId+"_") == senderPk){
      				imgSrc = MSGLEFT;
      				imgHtml = "<pre>"+readStatus+"<img src='"+imgSrc+"' /></pre>";
      				typeClass = "bubble bubble_primary right";
      				typeClass_ = "message me";
      			}else{
      				imgSrc = MSGRIGHT;
      				imgHtml = "<pre><img src='"+imgSrc+"' />"+readStatus+"</pre>";
      				typeClass = "bubble bubble_default left";
      				typeClass_ = "message others";
      			}
      			html +="<div class=\"clearfix\">";
      			html +="	<div class=\"message\">";
      			html +="		<p class=\"message_system\">";
      			html +="			<span class=\"content\">"+dateFormatMin(Number(sendTime))+"</span>";
      			html +="		</p>";
      			html +="	</div>";
      			html +="</div>";
      			html +="<div class=\"clearfix\">";
      			html +="	<div class='"+typeClass_+"'>";
      			html +="		<div class=\"avatar\">";
      			html +="			<img src='"+senderPic+"' alt="+senderName+">";
      			html +="		</div>";
      			html +="		<div class=\"content\" data-index='"+i+"'>";
      			html +="			<p class=\"author_name\">"+senderName+"</p>";
      		  html +="			<div class='"+typeClass+"'>";
      			html +="				<div class=\"bubble_cont\">";
      			html +="					<div class=\"plain\">"+imgHtml;
      			html +="					</div>";
      			html +="				</div>";
      			html +="			</div>";
      			html +="		</div>";
      			html +="	</div>";
      			html +="</div>";
      		}
      	}
      	$("#chatContent").html(html);
      	$("#chatContent .content").click(function(){
          layer.open({content:'点击录音播放事件~~',skin:'msg',time: 2});
      		var index = $(this).attr("data-index");
      		var content = _MEMBERS[index].content;
      		_MEMBERS[index].readStatus = "1";
      		$(this).find("span").hide();
      		RongIMLib.RongIMVoice.preLoaded(content, function(){
            layer.open({content:'RY录音播放事件~~',skin:'msg',time: 2});
      			// 播放声音
      			var duration = content.length/1024;
      			RongIMLib.RongIMVoice.play(content,duration);
      		});
      	  sessionStorage.setItem("_MEMBERS",JSON.stringify(_MEMBERS));
      	});
      	//$(".J_scrollContent").scrollTop($("#chatContent")[0].scrollHeight);
      },

      // 初始化微信jssdk
      initJSSDK:function(){
        var wechat = this.$wechat;
        var uploadluyin = this.uploadluyin;
        var playVoice = this.playVoice;
      	var params = {
      		"userPk":userPk,
      		"pageUrl":document.URL
      	};
      	$.post(GLOBALURL.QUERY_WXCONFIG_URL,params,function(data){
      		if(data.statusCode == "0"){
      			var result  = data.value;
      			wechat.config({
      			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      			    appId: result.appId, // 必填，公众号的唯一标识
      			    timestamp: result.timestamp , // 必填，生成签名的时间戳
      			    nonceStr: result.nonceStr, // 必填，生成签名的随机串
      			    signature: result.signature,// 必填，签名，见附录1
      			    jsApiList: [
      			       "startRecord",
      			       "stopRecord",
      			       "onVoiceRecordEnd",
      			       "playVoice",
      			       "pauseVoice",
      			       "stopVoice",
      			       "uploadVoice"
      			    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      			});
      			var radio = "";
      			wechat.ready(function () {
      				 var STARTTIME = 0;
      				 var ENDTIME = 0;
      				 $("#sendMessage").on('touchstart',function () {
      				      wechat.startRecord({
      				            success: function(){
                              $(".comment-module").show();
      				            	  STARTTIME = new Date().getTime();
      				                wechat.onVoiceRecordEnd({
      				                    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
      				                    complete: function (res) {
                                      layer.open({content:'最多只能录制一分钟',skin:'msg',time: 2});
      				                        var localId = res.localId;
      				                        uploadluyin(localId,60000);
      				                        playVoice(localId);
      				                        $(".comment-module").hide();
      				                    }
      				                });
      				            },
      				            cancel: function () {
                            layer.open({content:'用户拒绝授权录音',skin:'msg',time: 2});
      				              return false;
      				            }
      				     });
      				 });
      				 $("#sendMessage").on('touchend',function () {
      				    	console.log("-------按钮松开事件------");
      				    	ENDTIME = new Date().getTime();
      				        //录音时间
      				        var luyintime= ENDTIME - STARTTIME;
      				        if(luyintime < 1000){
      				        	  ENDTIME = 0;
      				            STARTTIME = 0;
      				            wechat.stopRecord({});
                          $(".comment-module").hide();
                          layer.open({content:'录音时间不能少于1秒',skin:'msg',time: 2});
      				            return false;
      				            // 小于300ms，不录音
      				        }else {
      				            wechat.stopRecord({
      				                success: function (res) {
      				                    var localId = res.localId;
                                  $(".comment-module").hide();
      				                    uploadluyin(localId,luyintime);
      				                    playVoice(localId);
                                  console.log("-------上传录音------");
      				                }
      				            });
      				        }
      				    });
      			});
      		}else{
      			console.log(data.message);
      		}
      	},"json");
      },

      uploadluyin:function(localId,luyintime) {
          var sendMessage = this.sendMessage;
          this.$wechat.uploadVoice({
              localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
              	$.post(GLOBALURL.GET_WXMEDIAFILE_URL,{"mediaId":serverId},function(data){
          			if(data.statusCode == 0){
          				var content = data.value;
          				var extra = groupId +"---"+Date.parse(new Date())+"---"+userPic;
          				sendMessage(groupId,content,luyintime,extra,userPk,userName);
          			}else{
                  layer.open({content:data.message,skin: 'msg',time: 2});
          			}
          		},"json");
              }
          });
      },

      playVoice:function(localId){
          this.$wechat.playVoice({
          	localId: localId
          });
      },
      //融云初始化
      rongyunInit:function(){
    			RongIMClient.init(GLOBALURL.RONGYUN_CHAT_ACCOUNT_APPKEY); // 初始化融云token
    			RongIMLib.RongIMVoice.init(); // 初始化语音
    			this.setStatusListener(); // 设置监听器
    			this.connectRYServer(); // 连接融云服务器
      },
      // 监听状态
      setStatusListener:function(){
         var dealMessage = this.dealMessage;
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
      },
      //连接
      connectRYServer:function(){
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
      },
      // 发送消息
      sendMessage:function(groupId,content,duration,extra,userPk,userName){
        var initMessageList = this.initMessageList;
      	console.log("------发送消息事件------");
      	var msg = new RongIMLib.VoiceMessage ({content:content,duration:duration,extra:extra,user:{"id":userPk+"_","name":userName}});
      	var conversationtype = RongIMLib.ConversationType.GROUP; // 群组消息
      	var targetId = groupId; // 目标 Id
      	RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
          // 发送消息成功
          onSuccess: function (message) {
      			layer.open({content:'消息发送成功~~',skin:'msg',time: 2});
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
              initMessageList();
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
              layer.open({content:'发送失败~~'+info,skin:'msg',time: 2});
              }
          });
      },
      // 处理接收到消息的函数
      dealMessage:function(message){
      	// 消息对象
      	layer.open({content:'收到消息~~',skin:'msg',time: 2});
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
          this.initMessageList();
      	}
      }
    }
}
</script>
<style>
.fold-enter-active {
animation-name: fold-in;
animation-duration: .6s;
}
.fold-leave-active {
animation-name: fold-out;
animation-duration: .6s;
}
@keyframes fold-in {
0% {
  transform: translate3d(100%, 0, 0);
}
100% {
  transform: translate3d(0, 0, 0);
}
}
@keyframes fold-out {
0% {
  transform: translate3d(0, 0, 0);
}
100% {
  transform: translate3d(100%, 0, 0);
}
}
</style>
