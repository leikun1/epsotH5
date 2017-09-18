<template>
<div>
  <tab :line-width="2"  v-model="tabindex">
    <tab-item :selected="tag === item" v-for="item in tagList" @click="tag = item">{{item}}</tab-item>
  </tab>

  <transition-group name="fold" tag="div">
  <div v-show="tabindex === 0" v-bind:key="tabindex">
    <swiper :list="bannerList" auto style="width:100%;margin:0 auto;height:7.8rem;" dots-class="custom-bottom" dots-position="center"></swiper>
    <div class="big_button" style="border-bottom:1px solid #f1f1f1;">
      <div style="width:100%;margin-bottom:8px;">
        <div class="big_rigt_p fl" style="width:33.3333%">
          <router-link to="/program/programList?programType=999"><i class="index-icon micon-menu19" style="margin:0.6rem 1.85rem 0;"></i><h3>经典好歌</h3></router-link>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl" style="width:33.3333%">
          <router-link to="/program/stationList"><i class="index-icon micon-menu20" style="margin:0.6rem 1.85rem 0;"></i><h3>电台排行</h3></router-link>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl" style="width:33.3333%">
          <router-link id="hotNews" to="/program/programList?programType=5&albumId=6138717"><i class="index-icon micon-menu21" style="margin:0.6rem 1.85rem 0;"></i><h3>热点新闻</h3></router-link>
          <div class="ind-bar2"></div>
        </div>
        <div class="cl"></div>
      </div>
    </div>
    <div class="dynamic-list-head">
      <b><em class="lineStyle"></em>推荐节目</b>
      <a href="javascript:void(0);"><i class="dynamic-i-r icon-uniE906 fr"></i></a>
    </div>
    <ul class="product-list hotProgramList" style="padding-bottom:3.2rem;">
      <li v-for="album in albumList" class="product-item" :data-id="album.id" @click="pageTurn('/program/programList?programType=4&albumId='+album.id,false)">
        <a href="javascript:void(0);">
      		<div :alt="album.album_title" class="product-item-pic">
      			<img :src="album.cover_url_large" style="width:8.5rem;height:8rem">
      		</div>
      		<p class="product-item-title">{{album.album_title}}</p></a>
      </li>
    </ul>
  </div>
  <div v-show="tabindex === 1" v-bind:key="tabindex">
    <!-- 功能板块 -->
    <div class="big_button">
      <div style="width:100%;" id="shortCut">
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('/program/stationTypeList',false)"><i class="index-icon micon-menu22"></i><h3>电台</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('/program/programTypeList?categoryId=2',false)" data-href="./views/program/programAllList.html?categoryId=2" ><i class="index-icon micon-menu23"></i><h3>音乐</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('/program/programTypeList?categoryId=1',false)"><i class="index-icon micon-menu24"></i><h3>新闻</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('/program/programTypeList?categoryId=12',false)"><i class="index-icon micon-menu25"></i><h3>相声</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('/program/programTypeList?categoryId=3',false)"><i class="index-icon micon-menu26"></i><h3>小说</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('',false)"><i class="index-icon micon-menu27"></i><h3>路况</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('',false)"><i class="index-icon micon-menu28"></i><h3>巨能资讯</h3></a>
          <div class="ind-bar2"></div>
        </div>
        <div class="big_rigt_p fl">
          <a href="javascript:void(0);" @click="pageTurn('',false)"><i class="index-icon micon-menu29"></i><h3>原创节目</h3></a>
          <div class="ind-bar2"></div>
        </div>
          <div class="ind-bar2"></div>
        </div>
        <div class="cl"></div>
    </div>
    <!-- 功能板块 end-->
    <div class="m-Mien">
      <b><em></em>听原创</b>
      <ul id="mainAlbumList" style="margin-bottom:2.8rem;">
        <li v-for="ugc in ugcList" :data-pk="ugc.ugcalbumpk" @click="pageTurn('/program/programList?programType=998&ugcAlbumPk='+ugc.ugcalbumpk,false)">
          <a href="javascript:;" class="cl">
            <img :src="ugc.ugcalbumimgaeurl">
            <div class="mienIntro">
              <h1>{{ugc.ugcalbumname}}</h1>
              <p style="margin-top:15px;">
                播放<span>{{ugc.ugcalbumviewtimes}}</span>次<span style="float:right;">{{ugc.ugcalbumcreatetime}}</span>
              </p>
            </div>
          </a></li>
      </ul>
    </div>
  </div>
  <div v-show="tabindex === 2" v-bind:key="tabindex">
    <div class="datum-box">
			<ul class="datum-list" id="personalList">
				<li class="dropdown">
					<a href="javascript:void(0);" data-href="./views/program/personalList.html?queryType=0">
						<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color3 icon-time"></i><b>播放历史记录<b style="color:red;">(0)</b></b></h1>
					</a>
				</li>
				<li class="dropdown">
					<a href="javascript:void(0);" data-href="./views/program/personalAllList.html?queryType=1">
						<h1 data-toggle="dropdown" class="vtitle" @click="pageTurn('/program/personalList',true,true)"><i class="ba-color icon-list-ul"></i><b>车机播放列表<b style="color:red;" id="personalProgramNum">({{personalProgramNum}})</b></b></h1>
					</a>
				</li>
				<li class="dropdown">
					<a href="javascript:void(0);" data-href="./views/program/personalList.html?queryType=1">
						<h1 data-toggle="dropdown" class="vtitle" @click="pageTurn('/program/localList',true,true)"><i class="ba-color ba-color3 icon-folder-open-alt"></i><b>车机端本地歌曲<b style="color:red;" id="localProgramNum">({{localProgramNum}})</b></b></h1>
					</a>
				</li>
			</ul>
		</div>
  </div>
  </transition-group>
</div>
</template>

<script>
  import { Tab,TabItem,Group, Cell,Swiper,Scroller,Divider } from 'vux'
  import { getBannerList,getHotAlbumList,getUGCProgramList,getLocalProgramList,getOrderProgramList } from '../utils/api'
  import logoSrc from './../images/epsot_logo.jpg'
  import GLOBALURL from '../utils/global'
  import $ from 'jquery'

  const tabList = () => ['推荐', '主播电台', '歌单']

  export default{
    name: 'Program',
    data(){
      return{
        tag: '推荐',
        tagList: tabList(),
        tabindex:0,
        bannerList:[],
        albumList:[],
        ugcList:[],
        personalProgramNum:0,
        localProgramNum:0
      }
    },
    components:{
      Tab,
      TabItem,
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper
    },
    created () {
      //this.getBannerList(),
      //this.getHotAlbumList(),
      //this.getUGCProgramList(),
      //this.initPersonalProgramNum()
    },
    methods:{
      pageTurn:function(turnPath,isNeedLogin,needDriver){
         var userInfo = sessionStorage.getItem("userInfo");
         var isDriver = sessionStorage.getItem("_isDriver");
         if(isNeedLogin && !userInfo){
            layer.open({content:'请您先登录...',skin:'msg',time: 2});
         }else if(needDriver && isDriver=="false"){
            layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
         }else if(turnPath){
            this.$router.replace({path:turnPath});
         }else{
            layer.open({content:'程序猿正在玩命开发中...',skin:'msg',time: 2});
         }
      },
      async getBannerList() {
        let data = await getBannerList();
        var result = JSON.parse(data.value).columns;
        if(result && result.length>0){
          this.bannerList = [];
          for(var i=0;i<result.length;i++){
				  	var brief  = result[i].column_title;
            var albumId =  result[i].id;
            var imagesUrl = result[i].cover_url_large?result[i].cover_url_large:logoSrc;
            this.bannerList.push({
              url: '/program/programList?programType=7&bannerId='+albumId,
              img: imagesUrl,
              id:albumId
            });
          }
        }
      },
      async getHotAlbumList() {
        let data = await getHotAlbumList(1,4);
        var result = JSON.parse(data.value).albums;
        if(result && result.length>0){
           this.albumList = result;
        }
      },
      async getUGCProgramList() {
        let data = await getUGCProgramList(1);
        var result = data.value.ugcalbumlist;
        if(result && result.length>0){
          this.ugcList = [];
          for(var i=0;i<result.length;i++){
            result[i].ugcalbumimgaeurl =  result[i].ugcalbumimgaeurl?result[i].ugcalbumimgaeurl:logoSrc;
            this.ugcList.push(result[i]);
          }
        }
      },

      initPersonalProgramNum:function(){
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		this.initLocalList(userpk);
      		this.initPersonalList(userpk);
      	}else{

        }
      },
      // 初始化车机本地列表
      async initLocalList(userpk){
        let data = await getLocalProgramList(userpk);
        var result = data.value;
        if(result && result.length>0){
          this.localProgramNum = result.length;
        }
      },
      // 初始化车机本地列表
      async initPersonalList(userpk){
        let data = await getOrderProgramList(userpk);
        var result = data.value;
        if(result && result.length>0){
          this.personalProgramNum = result.length;
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
