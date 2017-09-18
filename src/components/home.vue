<template>
  <div>
    <app-header :model-name="modelName" v-on:toggle="sideToggle"></app-header>
    <!-- <transition-group name="model" > -->
    <div v-show="modelIndex == 0"><model-index ref="index"></model-index></div>
    <div v-show="modelIndex == 1"><model-group ref="group"></model-group></div>
    <div v-show="modelIndex == 2"><model-program ref="program"></model-program></div>
    <div v-show="modelIndex == 3"><model-share ref="share"></model-share></div>
    <!-- </transition-group> -->
    <app-footer v-on:toggle="pageToggle"></app-footer>
    <transition name="fold" >
      <app-toggle v-show="isShow"></app-toggle>
    </transition>
    <div v-show="isShow" @click="isShow = !isShow" lang="ay"data-simplersidebar="mask" style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 2999; background-color: black; opacity: 0.5; display: block;"></div>
  </div>
</template>

<script>
  import AppHeader from './common/header'
  import AppFooter from './common/footer'
  import AppToggle from './common/toggle'
  import ModelIndex from './index'
  import ModelGroup from './group'
  import ModelProgram from './program'
  import ModelShare from './share'
  import GLOBALURL from '../utils/global'
  import $ from 'jquery'
  import { rongyunInit } from '../utils/rongyunChat'
  import { initLoginStatus } from '../utils/utils'

  export default {
    components: {
      AppHeader,
      AppFooter,
      AppToggle,
      ModelIndex,
      ModelGroup,
      ModelProgram,
      ModelShare
    },
    data () {
      return {
        modelIndex:0,
        modelName:"主页",
        isShow:false
      }
    },
    created () {
      this.modelIndex = this.$route.query.modelIndex?this.$route.query.modelIndex:0;
      if(this.modelIndex == 0){
        this.modelName = "主页";
      }else if(this.modelIndex == 1){
        this.modelName = "群组";
      }else if(this.modelIndex == 2){
        this.modelName = "节目";
      }else if(this.modelIndex == 3){
        this.modelName = "分享";
      }
      initLoginStatus(); // 初始化登录信息
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    mounted(){
      var modelIndex = this.modelIndex;
      $("#footerTab .nav-tab-item").removeClass("nav-active");
      $("#footerTab .nav-tab-item:eq("+modelIndex+")").addClass("nav-active");
      if(modelIndex == 0){
        this.$refs.index.getAdsList();
        this.$refs.index.getAllMerchants();
      }else if(modelIndex == 1){
        this.$refs.group.getPersonalGroupList();
      }else if(modelIndex == 2){
        this.$refs.program.getBannerList(),
        this.$refs.program.getHotAlbumList(),
        this.$refs.program.getUGCProgramList(),
        this.$refs.program.initPersonalProgramNum()
      }else if(modelIndex == 3){

      }else{
        this.$refs.index.getAdsList();
        this.$refs.index.getAllMerchants();
      }
    },
    methods:{
      pageToggle: function (modelIndex,modelName) {
        this.modelIndex = modelIndex;
        this.modelName = modelName;
        if(modelIndex == 0){
          this.$refs.index.getAdsList();
          this.$refs.index.getAllMerchants();
        }else if(modelIndex == 1){
          this.rongyunConfigInit(); // 初始化融云配置信息
          this.$refs.group.getPersonalGroupList();
        }else if(modelIndex == 2){
          this.$refs.program.getBannerList(),
          this.$refs.program.getHotAlbumList(),
          this.$refs.program.getUGCProgramList(),
          this.$refs.program.initPersonalProgramNum()
        }else if(modelIndex == 3){
        }
      },
      sideToggle: function () {
        this.isShow = true;
      },
      rongyunConfigInit:function(){
        var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo && GLOBALURL.RONGYUN_CHAT_ACCOUNT_APPKEY == ""){
        userInfo = JSON.parse(userInfo);
        $.post(GLOBALURL.PSERVICE_IMTOKEN_URL,{userPK:userInfo.userpk,channel:"2"},function(data){
            if(data.statusCode == "0"){
              var value = data.value;
              if(value.appkey){
                GLOBALURL.RONGYUN_CHAT_ACCOUNT_APPKEY = value.appkey;
              }
              GLOBALURL.RONGYUN_CHAT_ACCOUNT_TOKEN = value.utoken;
              rongyunInit();
            }else{
              console.log(data.message);
            }
          },"json");
        }else if(GLOBALURL.RONGYUN_CHAT_ACCOUNT_APPKEY!=""){
          rongyunInit();
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

/**
* vue-router transition
*/
.model-enter-active {
animation-name: fold-in;
animation-duration: .6s;
}
.model-leave-active {
animation-name: fold-out;
animation-duration: .6s;
}
@keyframes model-in {
0% {
  transform: translate3d(100%, 0, 0);
}
100% {
  transform: translate3d(0, 0, 0);
}
}
@keyframes model-out {
0% {
  transform: translate3d(0, 0, 0);
}
100% {
  transform: translate3d(100%, 0, 0);
}
}
</style>
