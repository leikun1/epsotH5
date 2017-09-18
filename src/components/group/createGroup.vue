<template>
<div>
  <header>
      <div class="header">
          <h1>创建群</h1>
          <router-link slot="left" to="/home?modelIndex=1" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="g-Give">
      <div class="giveFriend" id="userPortrait">
          <img :src="userPortrait">
      </div>
      <form action="" method="get">
    		<p style="margin-left:0.8rem;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>群组名称</span></p>
    		<div class="firmIntro-box">
    			 <input id="groupName" type="text" placeholder="群组长度 3 - 20 字符">
    		</div>
    		<p style="margin-left:0.8rem;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>群组描述</span></p>
    		<div class="firmIntro-box">
    			<textarea id="groupDescribe" rows="4" placeholder="在这里输入群组简介"></textarea>
    		</div>
    		<a href="javascript:;" class="btn btn-max" style="margin:.5rem 0;background-color:#06C1AE;" id="createGroup" @click="createGroup">创建</a>
      </form>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import $ from 'jquery'
  import { initLoginStatus } from '../../utils/utils'

  export default{
    name: 'CreateGroup',
    components: {
    },
    data(){
      return{
        userPortrait:logoSrc,
        userpk:""
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        this.userpk = userInfo.userpk;
        this.userPortrait = userInfo.userinfo.userinfoprofileimageurl?userInfo.userinfo.userinfoprofileimageurl:logoSrc;
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      createGroup:function(){
        var router = this.$router;
        var createGroup = this.createGroup;
        var userpk = this.userpk;
        var groupName = $("#groupName").val();
        var groupDescribe = $("#groupDescribe").val();
        if(groupName == ""){
          layer.open({content:"群组名称不能为空",skin: 'msg',time: 2});
        }else if(groupName.length < 3 || groupName.length > 20){
          layer.open({content:"群组名称长度为3-20个字符",skin: 'msg',time: 2});
        }else if(groupDescribe == ""){
          layer.open({content:"群组描述不能为空",skin: 'msg',time: 2});
        }else if(groupDescribe > 30){
          layer.open({content:"群组描述不能超过30个字符",skin: 'msg',time: 2});
        }else{
            var params = {
          		"driverId":userpk,
          		"groupName":groupName,
          		"description":groupDescribe,
          		"platform":"3"
          	};
          	$.post(GLOBALURL.CREATE_GROUP,params,function(data){
          		if(data.statusCode == 0){
          			layer.open({content:data.message,skin: 'msg',time: 2});
          			$("#groupName").val("");
          			$("#groupDescribe").val("");
                router.replace({path:"/home?modelIndex=1"});
          		}else if(data.statusCode == -999){
          			//initLoginStatus(createGroup());
          		}else{
          			layer.open({content:data.message,skin: 'msg',time: 2});
          		}
          	},"json");
        }
      }
    }
}
</script>
