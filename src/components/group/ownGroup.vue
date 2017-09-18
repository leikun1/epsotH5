<template>
<div>
  <header>
      <div class="header">
          <h1>我的群</h1>
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
    name: 'OwnGroup',
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
        var router =  this.$router;
        var params = {
          "driverId":userpk
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
                if(grouperList && grouperList.length>0){
                  grouperNum = grouperList.length;
                  for(var j=0;j<grouperNum;j++){
                    var isOnline = grouperList[j].isOnline;
                    if(isOnline!=0){
                      onlineNum ++;
                    }
                  }
                }
                var createrImageUrl = result[i].createrImageUrl?result[i].createrImageUrl:logoSrc;
                html += "<div class=\"card_ecchange plus-pass\" data-pk="+result[i].id+" data-id="+result[i].number+" data-creater="+result[i].creater+" data-name="+result[i].name+">";
                html += "	<i class=\"images_card\"><img src="+createrImageUrl+"></i>";
                html += "	<span>["+onlineNum+"/"+grouperNum+"]</span>";
                html += "	<h1>"+result[i].name+"</h1>";
                html += "	<p>"+(result[i].description?result[i].description:"暂无简介")+"</p>";
                html += "	<p>创建时间："+result[i].createTime+"</p>";
                html += "</div>";
              }
              $(".groupList").html(html);
              $(".groupList .card_ecchange").click(function(){
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
                router.replace({path:"../group/groupChat"});
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
