<template>
<div>
  <header>
      <div class="header">
          <h1>电台</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div>
     <scroller lock-y :scrollbar-x='false' ref="scroller">
        <tab :line-width=2 active-color='#06C1AE' v-model="index" :style="{width:tabLength + 'px' }">
          <tab-item @click.native="typeToggle(item.tabType,item.provinceCode)" class="vux-center" :selected="tabName === item.tabName" v-for="(item, index) in tabList"  @click="tabName = item.tabName" :key="index">{{item.tabName}}</tab-item>
        </tab>
     </scroller>
     <div class="all_box groupList" id="albumList"></div>
  </div>

  <!-- 节目操作 -->
  <div class="comment-module programAction" hidden="hidden">
    <div class="kuang" style="left:2.5rem;right:2.5rem;">
      <div class="comment-h">
        <i class="icon-remove close actionClose" style="float:right;" @click="actionClose()"></i>
        <p class="programName" style="font-size:0.8rem;" data-id="" data-url="" data-pic="">--</p>
      </div>
      <div class="comment-con">
        <ul class="datum-list">
          <li class="dropdown" @click="programOrder()" >
            <a href="javascript:void(0);">
            <h1 data-toggle="dropdown" id="programOrder" class="vtitle" style="line-height:2.5rem;height:2.5rem;"><i style="line-height:2.5rem;" class="ba-color ba-color3 icon-share-alt"></i><b>定制到车机播放列表</b></h1>
            </a>
          </li>
          <li class="dropdown" @click="programPlay()">
            <a href="javascript:void(0);">
              <h1 data-toggle="dropdown" id="programPlay" class="vtitle" style="line-height:2.5rem;height:2.5rem;"><i style="line-height:2.5rem;" class="ba-color icon-play"></i><b>车机播放</b></h1>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import { Tab, TabItem, Swiper, SwiperItem,Scroller } from 'vux'
  import { getProgramTypeList } from '../../utils/api'
  import { initLoginStatus } from '../../utils/utils'

  export default{
    name: 'StationTypeList',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller
    },
    data(){
      return{
        tabList:[{'tabName':'中央台','provinceCode':'','tabType':'1'},{'tabName':'网络台','provinceCode':'','tabType':'3'},{'tabName':'北京台'},{'tabName':'天津台'},{'tabName':'河北台'}],
        tabName:"中央台",
        tabLength:"500",
        index:0,
        categoryId:""
      }
    },
    created () {
      this.getProgramTypeList();
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    mounted(){
      this.initAlbumList("1","");
    },
    methods: {
      // 类型切换
      typeToggle:function(tabType,provinceCode){
         this.initAlbumList(tabType,provinceCode);
      },
      // 关闭对话框
      actionClose:function(){
        $(".comment-module").hide();
      },
      // 节目定制
      programOrder:function(){
        var isDriver = sessionStorage.getItem("_isDriver");
        if(isDriver == "false"){
          layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
          return false;
        }
        var programId = $(".programName").attr("data-id");
    		var programUrl = $(".programName").attr("data-url");
    		var programPic = $(".programName").attr("data-pic");
    		var programTitle = $(".programName").text();
    		this.programCommission(programId,programUrl,programPic,programTitle); // 节目定制
      },
      // 车机播放
      programPlay:function(){
        var isDriver = sessionStorage.getItem("_isDriver");
        if(isDriver == "false"){
          layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
          return false;
        }
        var programUrl = $(".programName").attr("data-url");
    		var programPic = $(".programName").attr("data-pic");
    		var programTitle = $(".programName").text();
    		this.doProgramPlay(programUrl,programPic,programTitle); // 车机播放
      },
      // 获取节目类型列表
      async getProgramTypeList() {
        let data = await getProgramTypeList('1009','');
        var result = JSON.parse(data.value);
        if(result && result.length>0){
          this.tabLength = result.length*60;
          this.tabList = [{'tabName':'中央台','provinceCode':'','tabType':'1'},{'tabName':'网络台','provinceCode':'','tabType':'3'}];
          for(var i=0;i<result.length;i++){
            var tabName = result[i].province_name+"台";
            var provinceCode = result[i].province_code;
            var tabInfo = {
              "tabName":tabName,
              "provinceCode":provinceCode,
              "tabType":"2"
            }
            this.tabList.push(tabInfo);
          }
          this.$nextTick(() => {
            this.$refs.scroller.reset();
          })
        }
      },

      // 初始化热点节目列表
      initAlbumList:function(radioType,provinceCode){
      	var loading = layer.open({type: 2});
      	var params = {
      		"categoryCode":"1010",
      		"dataCount":"20",
      		"dataPage":"1",
      		"radioType":radioType,
      		"provinceCode":provinceCode
      	};
       	$.post(GLOBALURL.DO_QUERY_XMLAPROGRAM_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var datainfo = data.value;
      			datainfo = JSON.parse(datainfo);
      			var result = datainfo.radios;
      			var html = "";
      			if(result && result.length > 0){
      				for(var i=0;i<result.length;i++){
      					html +="<div class=\"card_ecchange plus-pass\">";
      					html +="	<i class=\"images_card\"><img src='"+result[i].cover_url_large+"'></i>";
      					html +="	<span><i class=\"icon-tasks\" data-id="+result[i].id+" data-url="+result[i].rate64_aac_url+"></i></span>";
      					html +="	<h1>"+result[i].radio_name+"</h1>";
      					html +="	<p>"+result[i].program_name+"-正在直播</p>";
      					html +="	<p><i class=\"icon-play\"></i>"+result[i].radio_play_count+"</p>";
      					html +="</div>";
      				}
      		   }
      		   $("#albumList").html(html);
      		   $("#albumList .card_ecchange .icon-tasks").click(function(){
      				var programTitle = $(this).parents(".card_ecchange").find("h1").text();
      				var programId = $(this).attr("data-id");
      				var programUrl = $(this).attr("data-url");
      				var programPicurl = $(this).parents(".card_ecchange").find(".images_card img").attr("src");
      				$(".programName").text(programTitle);
      				$(".programName").attr("data-id",programId);
      				$(".programName").attr("data-url",programUrl);
      				$(".programName").attr("data-pic",programPicurl);
      				$(".programAction").show();
      		   });
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
       	});
      },

      // 节目定制
      programCommission:function(programId,programUrl,programPic,programTitle){
        var programCommission = this.programCommission;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
          if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var params = {
      			"userPK":userpk,
      			"title":programTitle,
      			"url":programUrl,
      			"imageURL":programPic,
      			"type":"6", // 电台
      			"duration":"0",
      			"size":"0",
      			"thirdID":programId,
      			"platform":"3"
      		};
      		$.post(GLOBALURL.XMLAPROGRAM_ORDERS,params,function(data){
      			if(data.statusCode == 0){
      				layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(programCommission(programId,programUrl,programPic,programTitle));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		});
      	}else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      },

      // 车机播放
      doProgramPlay:function(programUrl,programPic,programTitle){
        var programPlay = this.programPlay;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
          if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var content = programTitle+","+programUrl+","+programPic;
      		var params = {
      			"driverId":userpk,
      			"order":"program",
      			"operation":"playOther",
      			"content":content
      		};
      		$.post(GLOBALURL.GLOBAL_ORDER,params,function(data){
      			if(data.statusCode == 0){
      				layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(programPlay(programUrl,programPic,programTitle));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		});
      	}else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      }

    }
}
</script>
