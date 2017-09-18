<template>
<div>
  <header>
      <div class="header">
          <h1>群组详情</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="circle2-head">
		<div class="Frjbg"><img src="../../images/index/bg_pictrue.jpg"></div>
		<div>
			<div class="user-img"><img class="groupImgUrl" src="./../../images/epsot_logo.jpg"></div>
			<div class="user-head-d" style="margin-left:0.6rem;">
				<p class="groupName">--</p>
				<p style="font-size:0.6rem;">创建时间：<span class="createTime">--</span></p>
				<p style="font-size:0.6rem;">成员数量：<span class="groupUserNum">0</span></p>
			</div>
		</div>
	</div>

	<div style="border-bottom:10px solid #f1f1f1;">
		<h1 style="margin-left:0.6rem;">群介绍</h1>
		<p style="margin-left:0.6rem;font-size:0.7rem;" class="groupDescribe">--</p>
	</div>

	<div class="Member">
	  <h1 style="margin-left:0.6rem;">群成员</h1>
		<!-- 成员列表 -->
		<ul class="MemberList" id="userList"></ul>
		<!-- 成员列表 end-->
	</div>
	<div style="bottom:0;position:fixed;width:90%;display:none;" class="groupType" v-show="showGroupType">
		<a href="javascript:;" class="btn btn-max" style="background-color:#06C1AE;width:100%" @click="applyShow()">申请入群</a>
	</div>

	<div class="comment-module applyContent" hidden="hidden" style="display:none;">
		<div class="kuang">
			<div class="comment-h">
				<i class="icon-remove applyClose" @click="applyClose()"></i>
				<p>验证信息</p>
				<button type="button" class="btn applySend" @click="applySend()">发送</button>
			</div>
			<div class="comment-con">
				<textarea rows="6" class="applyMsg"></textarea>
			</div>
		</div>
	</div>
</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { formatDate,initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var _prepath = "";
  var groupId = "";

  export default{
    name: 'GroupDetail',
    components: {
    },
    data(){
      return{
        "showGroupType":false
      }
    },
    created () {
      var groupPk = this.$route.query.groupPk;
      var groupType = this.$route.query.groupType;
      groupId = this.$route.query.groupId;
      console.log("====groupType===="+groupType);
      if(groupType == 0){
        this.showGroupType = true;
      }else{
        this.showGroupType = false;
      }
      this.initUsersInfo(groupPk);
      this.initGroupInfo(groupId);
      _prepath = sessionStorage.getItem("_prepath");
    },
    methods: {
      // 返回上一页
      pageBack:function(){
        if(_prepath){
          this.$router.replace({path:_prepath});
        }else{
          this.$router.replace({path:"/home?modelIndex=1"});
        }
      },
    	applyClose:function(){
        $(".applyContent").hide();
    		$(".applyMsg").val("");
      },
      applyShow:function(){
        $(".applyContent").show();
      },
      applySend:function(){
        var applyMsg = $(".applyMsg").val();
        if(applyMsg == ""){
          layer.open({content:"验证信息不能为空",skin: 'msg',time: 2});
        }else if(applyMsg.length > 30){
          layer.open({content:"验证信息不能超过30个字符",skin: 'msg',time: 2});
        }else{
          this.applyJoinGroup(groupId,applyMsg);
        }
      },
      // 初始化成员列表
      initUsersInfo:function(groupPk){
        var initUsersInfo = this.initUsersInfo;
        var params = {
      		"groupPk":groupPk
      	};
      	$.post(GLOBALURL.GET_GROUP_USER_STATUS,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result && result.length>0){
      				var html = "";
      				$(".groupUserNum").text(result.length);
      				for(var i=0;i<result.length;i++){
      					var imageUrl = result[i].imageUrl?result[i].imageUrl:logoSrc;
      					var isOnline = result[i].isOnline;
      					var onlineClass = "";
      					if(isOnline=="0"){
      						isOnline = "离线";
      						onlineClass = "off";
      					}else{
      						isOnline = "在线";
      						onlineClass = "on"
      					}
      					html += "<li>";
      					html += "	<a href=\"javascript:void(0);\">";
      					html += "		<img src="+imageUrl+">";
      					html += "		<div class=\"ML-txt\">";
      					html += "			<b>"+result[i].driverName+"<i class=\"icon-mobile-phone "+onlineClass+"\"></i></b>";
      					html += "			<p>"+isOnline+"</p>";
      					html += "		</div>";
      					html += "		<em class=\"icon-angle-right\"></em>";
      					html += "	</a>";
      					html += "</li>";
      				}
      				$("#userList").html(html);
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initUsersInfo(groupPk));
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}

      	},"json");
      },

      // 初始化群组信息
      initGroupInfo:function(groupId){
        var initGroupInfo = this.initGroupInfo;
        var params = {
      		"startNum":"",
      		"totalNum":"",
      		"groupName":"",
      		"groupId":groupId
      	};
      	$.post(GLOBALURL.GET_ALL_GROUP_LIST,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result && result.length>0){
      				var html = "";
      				var grouperNum = result[0].totalUsers;
      				var onlineNum = 0;
      				var createTime = formatDate(new Date(Number(result[0].createTime)));
      				var description = "群主很懒,什么都没留下";
      				description = result[0].description?result[0].description:description;
      				var createrImageUrl = result[0].userinfoprofileimageurl?result[0].userinfoprofileimageurl:logoSrc;

      				$(".groupName").text(result[0].groupName);
      				$(".createTime").text(createTime);
      				$(".groupUserNum").text(grouperNum);
      				$(".groupDescribe").text(description);
      				$(".groupImgUrl").attr("src",createrImageUrl);
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initGroupInfo(groupId));
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      },
      // 申请入群
      applyJoinGroup:function(groupId,applyMsg){
        var applySend = this.applySend;
        var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		var userpk = userInfo.userpk;
      		var params = {
      			"driverId":userpk,
      			"groupId":groupId,
      			"reason":applyMsg
      		};
      		$.post(GLOBALURL.JOIN_GROUP,params,function(data){
      			if(data.statusCode == 0){
              layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".applyContent").hide();
      				$(".applyMsg").val("");
      			}else if(data.statusCode == -999){
      				//initLoginStatus(applyJoinGroup());
      			}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		},"json");
    	  }
      }
    }
}
</script>
