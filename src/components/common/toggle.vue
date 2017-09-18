<template>
<div id="toggle" data-simplersidebar="disabled" style="position: fixed; top: 0px; bottom: 0px; width: 250px; right: 0px; z-index: 3000;">
  <div class="setBg-box"></div>
  <div class="cy-user">
    <div class="userPu">
      <!-- 头像部分 -->
      <div class="userPu-h" @click="pageTurn('',false,false,'tologin')">
        <div class="user-h-img"><img :src="picurl"></div>
        <div class="user-h-text">
          <div class="user-name">{{username}}</div>
          <div class="user-association">用户中心</div>
        </div>
      </div>
      <!-- 头像部分 end -->
      <!-- 资料板块 -->
      <div class="datum-box">
        <ul class="datum-list toggle">
          <li class="dropdown">
            <div @click="pageTurn('',false,false,'msglist')">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-envelope"></i><b>我的消息</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
          <li class="dropdown">
            <div @click="pageTurn('user/orders',true,true)">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-shopping-cart"></i><b>我的订单</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
          <!-- <li class="dropdown">
            <div @click="pageTurn('user/carstatus',true,true)">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-dashboard"></i><b>我的车况</b><span class="icon-angle-right"></span></h1>
            </div>
          </li> -->
          <li class="dropdown">
            <div @click="pageTurn('user/violations',true,true)">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-warning-sign"></i><b>违章记录</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
          <li class="dropdown" style="border-bottom:1px solid #d9d9d9;">
            <div @click="pageTurn('user/controll',true,true)">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-magic"></i><b>车机控制</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
          <li class="dropdown">
            <div @click="pageTurn('user/aboutus',false,false)">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-rss"></i><b>关于我们</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
          <li class="dropdown">
            <div @click="pageTurn('',false,false,'setting')">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-cog"></i><b>我的设置</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
          <li class="dropdown">
            <div id="loginOut" @click="pageTurn('',true,false,'loginout')">
              <h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color0 icon-off"></i><b>退出登录</b><span class="icon-angle-right"></span></h1>
            </div>
          </li>
        </ul>
      </div>
      <!-- 资料板块 end-->
    </div>
  </div>
  <!-- 个人中心 user end-->
</div>
</template>

<script>
  import { Tabbar,TabbarItem } from 'vux'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'

  export default{
    name: 'AppToggle',
    components: {
      Tabbar,
    },
    data(){
      return{
        picurl:logoSrc,
        username:""
      }
    },
    created () {
        var userInfo = sessionStorage.getItem("userInfo");
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          this.picurl = userInfo.userinfo.userinfoprofileimageurl?userInfo.userinfo.userinfoprofileimageurl:logoSrc;
          this.username = userInfo.userinfo.userinfoname;
        }else{
          this.picurl = logoSrc;
          this.username = "未登录";
        }
    },
    methods: {
      pageTurn:function(turnPath,needLogin,needDriver,turnType){
          var userInfo = sessionStorage.getItem("userInfo");
          var isDriver = sessionStorage.getItem("_isDriver");
          var clearLogininfo = this.clearLogininfo;
          if(needLogin && !userInfo){
            layer.open({content:'请您先登录...',skin:'msg',time: 2});
          }else if(turnType == "tologin"){
            if(!userInfo){
              this.$router.replace({path:'user/login'})
            }else{
              this.$router.replace({path:'user/usercenter'})
            }
          }else if(turnType == "loginout"){
            layer.open({
              content: '是否确认退出登录?'
              ,btn: ['确定', '取消']
              ,yes: function(index){
                layer.close(index);
                sessionStorage.removeItem('userInfo');
                localStorage.removeItem('_userAccount');
                layer.open({content:'退出成功',skin: 'msg',time: 2});
                userInfo = null;
                clearLogininfo();
              }
            });
          }else if(turnType == "setting" || turnType == "msglist"){ // 商城
            layer.open({content:'抱歉,该功能暂不开放...',skin:'msg',time: 2});
          }else if(isDriver=="false" && needDriver){
            layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
      		}else{
            this.$router.replace({path:turnPath})
          }
      },
      clearLogininfo:function(){
        this.picurl = logoSrc;
        this.username = "未登录";
      }
    }
  }
</script>
