<template>
<div>
  <header>
      <div class="header">
          <h1>附近群</h1>
          <router-link slot="left" to="/home?modelIndex=1" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box groupList">
	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { formatDate,initLoginStatus } from '../../utils/utils'
  import logoSrc from './../../images/epsot_logo.jpg'
  import $ from 'jquery'

  export default{
    name: 'NearGroup',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        var userpk = userInfo.userpk;
        this.initUserGroupList(userpk); // 初始化个人群组列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      initUserGroupList:function(userpk){
        var initUserGroupList = this.initUserGroupList;
        var loading = layer.open({type: 2});
        var router = this.$router;
      	var params = {
      		"startNum":"",
      		"totalNum":"",
      		"groupName":"",
      		"groupId":""
      	};
      	$.post(GLOBALURL.GET_ALL_GROUP_LIST,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result && result.length>0){
      				var html = "";
      				for(var i=0;i<result.length;i++){
      					if(userpk != result[i].createUserpk){
      						var createTime = formatDate(new Date(Number(result[i].createTime)));
      						var grouperNum = result[i].totalUsers;
      						var onlineNum = 0;
      						var description = "群主很懒,什么都没留下";
      						description = result[i].description?result[i].description:description;
      						var createrImageUrl = result[i].userinfoprofileimageurl?result[i].userinfoprofileimageurl:logoSrc;
      						html += "<div class=\"card_ecchange plus-pass\" data-pk="+result[i].usergroupPK+" data-id="+result[i].groupID+">";
      						html += "	<i class=\"images_card\"><img src="+createrImageUrl+"></i>";
      						html += "	<span>"+grouperNum+"人</span>";
      						html += "	<h1>"+result[i].groupName+"</h1>";
      						html += "	<p>"+description+"</p>";
      						html += "	<p>创建时间："+createTime+"</p>";
      						html += "</div>";
      					}
      				}
      				$(".groupList").html(html);
      				$(".groupList .card_ecchange").click(function(){
      					var groupPk = $(this).attr("data-pk");
      					var groupId = $(this).attr("data-id");
                router.replace({path:"../group/groupDetail",query:{groupType:0,groupPk:groupPk,groupId:groupId}});
      				});
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initUserGroupList(userpk));
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	},"json");
      }
   }
}
</script>
