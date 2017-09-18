<template>
  <div class="all_box">
	    <!-- 功能板块 -->
	    <div class="big_button" style="border-bottom:1px solid #f1f1f1;" id="groupModel">
  	    <div style="width:100%;margin-bottom:8px;">
  				<div class="big_rigt_p fl" style="width:33.3333%">
  					<a href="javascript:void(0);" @click="pageTurn('group/ownGroup')" ><i class="index-icon micon-menu13" style="margin:0.6rem 1.85rem 0;"></i><h3>我的群组</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl" style="width:33.3333%">
  					<a href="javascript:void(0);" @click="pageTurn('group/nearGroup')"><i class="index-icon micon-menu14" style="margin:0.6rem 1.85rem 0;"></i><h3>附近群组</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl" style="width:33.3333%">
  					<a href="javascript:void(0);" @click="pageTurn('group/createGroup')"><i class="index-icon micon-menu15" style="margin:0.6rem 1.85rem 0;"></i><h3>创建群组</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="cl"></div>
  			</div>
	    </div>
		  <!--群列表-->
      <div id="groupList">
      	<!-- <div @click="turnChatPage('/group/groupChat',group.id,group.number,group.creater,group.name)" v-for="group in groupList" class="card_ecchange plus-pass" :data-pk="group.id" :data-id="group.number" :data-creater="group.creater" :data-name="group.name">
      		<i class="images_card"><img :src="group.createrImageUrl"></i>
          <span>[{{group.onlineNum}}/{{group.totalNumbers}}]</span>
      		<h1>{{group.name}}</h1>
      		<p>{{group.description}}</p>
      	</div> -->
      </div>
		  <!--群列表end-->
	</div>
</template>

<script>
  import { Group,Cell,Swiper,Scroller,Divider } from 'vux'
  import { getPersonalGroupList} from '../utils/api'
  import logoSrc from './../images/epsot_logo.jpg'
  import GLOBALURL from './../utils/global'
  import $ from 'jquery'

  export default{
    name: 'Group',
    data(){
      return{
        groupList:[]
      }
    },
    components:{
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper
    },
    created () {
      //this.getPersonalGroupList();
    },
    methods:{
      turnChatPage:function(turnPath,groupPk,groupId,createrPk,groupName){
        var groupInfo = {
          "groupPk":groupPk,
          "groupId":groupId,
          "createrPk":createrPk,
          "groupName":groupName
        };
        sessionStorage.setItem("groupInfo",JSON.stringify(groupInfo));
        this.$router.replace({path:turnPath});
      },
      // async getPersonalGroupList() {
      //   var userInfo = sessionStorage.getItem("userInfo");
      //   if (userInfo) {
      //   	 userInfo = JSON.parse(userInfo);
      //     let data = await getPersonalGroupList(userInfo.userpk);
      //     var result = data.groupList;
      //     if(result && result.length>0){
      //       this.groupList = [];
      //       for(var i=0;i<result.length;i++){
    	// 				var grouperNum = 0;
    	// 				var onlineNum = 0;
    	// 				var grouperList = result[i].drivers;
    	// 				var groupId = result[i].number;
      //        var groupPk = result[i].id;
      //        var createrPk = result[i].creater;
      //        var groupName = result[i].name;
    	// 				if(grouperList && grouperList.length>0){
    	// 					grouperNum = grouperList.length;
    	// 					for(var j=0;j<grouperNum;j++){
    	// 						var isOnline = grouperList[j].isOnline;
    	// 						if(isOnline!=0){
    	// 							onlineNum ++;
    	// 						}
    	// 					}
    	// 				}
      //        result[i].onlineNum = onlineNum;
      //        result[i].createrImageUrl =  result[i].createrImageUrl?result[i].createrImageUrl:logoSrc;
      //        result[i].description = result[i].description?result[i].description:"暂无简介";
      //        this.groupList.push(result[i]);
    	// 			}
      //     }
      //   }
      // },
      // 初始化个人群组列表
      getPersonalGroupList:function(){
        var router = this.$router;
        var userInfo = sessionStorage.getItem  ("userInfo");
        if (userInfo) {
          	userInfo = JSON.parse(userInfo);
            var params = {
              "driverId":userInfo.userpk
            };
            $.post(GLOBALURL.GET_GROUP_LIST,params,function(data){
              if(data.statusCode == 0){
                var result = data.groupList;
                  if(result && result.length>0){
                  var html = "";
                  for(var i=0;i<result.length;i++){
                    var grouperNum = 0;
                    var onlineNum = 0;
                    var grouperList = result[i].drivers;
                    var groupId = result[i].number;
                    if(grouperList && grouperList.length>0){
                      grouperNum = grouperList.length;
                      for(var j=0;j<grouperNum;j++){
                        var isOnline = grouperList[j].isOnline;
                        if(isOnline!=0){
                          onlineNum ++;
                        }
                      }
                    }
                    var msgHtml = "";
                    // var _MEMBERS = sessionStorage.getItem("_MEMBERS");
                    // if(_MEMBERS){
                    //   var msgNum = 0;
                    //   for(var j=0;j<_MEMBERS.length;j++){
                    //     if(groupId == _MEMBERS[j].groupId && _MEMBERS[j].readStatus == "0"){
                    //       msgNum ++;
                    //     }
                    //   }
                    //   if(msgNum>0){
                    //     msgHtml = "<em id=\"nav-badge\">"+msgNum+"</em>";
                    //   }
                    // }
                    var createrImageUrl = result[i].createrImageUrl?result[i].createrImageUrl:logoSrc;
                    html += "<div class=\"card_ecchange plus-pass \" data-pk='"+result[i].id+"' data-id='"+result[i].number+"' data-creater='"+result[i].creater+"' data-name='"+result[i].name+"'>";
                    html += "	<i class=\"images_card\"><img src="+createrImageUrl+">"+msgHtml+"</i>";
                    html += "	<span>["+onlineNum+"/"+grouperNum+"]</span>";
                    html += "	<h1>"+result[i].name+"</h1>";
                    html += "	<p>"+(result[i].description?result[i].description:"暂无简介")+"</p>";
                    html += "</div>";
                  }
                  $("#groupList").html(html);
                  $("#groupList .card_ecchange").click(function(){
                    var groupPk = $(this).attr("data-pk");
                    var groupId = $(this).attr("data-id");
                    var createrPk = $(this).attr("data-creater");
                    var groupName = $(this).attr("data-name");
                    var groupInfo = {
                      "groupPk":groupPk,
                      "groupId":groupId,
                      "createrPk":createrPk,
                      "groupName":groupName
                    };
                    sessionStorage.setItem("groupInfo",JSON.stringify(groupInfo));
                    router.replace({path:"/group/groupChat"});
                  });
                }
              }else{
                layer.msg(data.message,{icon:5,time:1000});
              }
            },"json");
        }
      },
      // 页面跳转
      pageTurn:function(turnPath){
        var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo) {
          this.$router.replace({path:turnPath});
        }else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      }
    }
  }
</script>
