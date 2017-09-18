<template>
<div>
  <header>
      <div class="header">
          <h1>邀请入群</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!--更多专家列表-->
 	<div class="contact-search">
 		<i class="ba-color0 icon-search"></i>
 		<input id="searchData" type="search" placeholder="手机号码/昵称" @keyup="searchData()" v-model="searchInfo">
 	</div>
 	<div class="m-Mien expert-list">
 		<ul id="professorList"></ul>
  </div>
  <!--更多专家列表end-->

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var _prepath = "";
  var createrPk = "";
  var groupId = "";
  var groupName = "";

  export default{
    name: 'InviteGroup',
    components: {
    },
    data(){
      return{
        searchInfo:""
      }
    },
    created () {
      var groupInfo = sessionStorage.getItem("groupInfo");
      if(groupInfo) {
        groupInfo = JSON.parse(groupInfo);
        groupId = groupInfo.groupId;
        createrPk = groupInfo.createrPk;
        groupName = groupInfo.groupName;
      }
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
      searchData:function(){
          var searchInfo = this.searchInfo;
      		var userPhone = "";
      		var userName = "";
      		if(!isNaN(searchInfo) && searchInfo.length>3){
      			userPhone = searchInfo;
      			this.searchUserlist(userPhone,userName);
      		}else if(searchInfo.length>0){
      			userName = searchInfo;
      			this.searchUserlist(userPhone,userName);
      		}else{
      			$("#professorList").html("");
      		}
      },
      // 搜索用户列表
      searchUserlist:function(userPhone,userName){
        var searchUserlist = this.searchUserlist;
      	var params = {
      		"userId":userPhone,
      		"userName":userName,
      		"userPk":""
      	};
      	$.post(GLOBALURL.QUERY_GROUP_USER,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result){
      				var html = "";
      				for(var i=0;i<result.length;i++){
      					var picUrl = result[i].userInfoProfileImageURL;
      					var userName = result[i].userInfoName;
      					var userPhone = result[i].userPhoneNumber;
      					var userPk = result[i].userPk;
      					html += "<li>";
      					html += "	<a href=\"javascript:void(0);\" class=\"cl\">";
      					html += "	  <img src="+picUrl+" style=\"width:2.5rem;height:2.5rem;\">";
      					html += "	  <div class=\"mienIntro\">";
      					html += "		<span class=\"userPhone\" data-id="+userPhone+" data-name="+userName+">";
      					html += "			<b style=\"font-size:0.7rem\">邀请</b>";
      					html += "		</span>";
      					html += "		<h1>"+userName+"</h1>";
      					html += "		<p>"+userPhone+"</p>";
      					html += "	  </div>";
      					html += "	</a>";
      					html += "</li> ";
      				}
      				$("#professorList").html(html);
      				$("#professorList .userPhone").click(function(){
      					var userId = $(this).attr("data-id");
      					var userName = $(this).attr("data-name");
                layer.open({
                  content: '是否邀请'+userName+'加入群组?'
                  ,btn: ['确定', '取消']
                  ,yes: function(index){
                    layer.close(index);
                    var params = {
                      "driverId":createrPk,
                      "groupId":groupId,
                      "userId":userId,
                      "groupName":groupName,
                      "platform":"3",
                    };
                    $.post(GLOBALURL.INVITE_JOIN_GROUP,params,function(data){
                      if(data.statusCode == 0){
                        layer.open({content:data.message,skin:'msg',time: 2});
                      }else{
                        layer.open({content:data.message,skin:'msg',time: 2});
                      }
                    },"json");
                  }
                });
              });
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(searchUserlist(userPhone,userName));
      		}else{
            layer.open({content:data.message,skin:'msg',time: 2});
      		}
      	},"json");
      }
    }
}
</script>
