<template>
<div>
  <header>
      <div class="header">
          <h1>{{programType}}</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
          <a @click="pageTurn()" href="javascript:void(0);" class="return shareMap" style="float:right;right:0;left:inherit;"><i class="icon-search"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div>
     <scroller lock-y :scrollbar-x='false' ref="scroller">
        <tab :line-width=2 active-color='#06C1AE' v-model="index" :style="{width:tabLength + 'px' }">
          <tab-item @click.native="typeToggle(item)" class="vux-center" :selected="tabName === item" v-for="(item, index) in tabList" @click="tabName = item" :key="index">{{item}}</tab-item>
        </tab>
     </scroller>
     <div class="all_box programList" id="albumList"></div>
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
    name: 'ProgramTypeList',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller
    },
    data(){
      return{
        tabList:['电台','歌单','新歌','明星','翻唱','原唱'],
        tabName:"",
        tabLength:"500",
        programType:"音乐",
        index:0,
        categoryId:""
      }
    },
    created () {
      this.categoryId = this.$route.query.categoryId;
    	if(this.categoryId == "1"){ // 新闻
    		this.programType = "新闻";
    	}else if(this.categoryId == "2"){ // 音乐
    	  this.programType = "音乐";
    	}else if(this.categoryId == "3"){ // 小说
    		this.programType = "小说";
    	}else if(this.categoryId == "12"){ // 相声
    		this.programType = "相声";
    	}
      this.getProgramTypeList(this.categoryId);
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 搜索页面跳转
      pageTurn:function(){
        this.$router.replace({path:"../program/programSearch?categoryId="+this.categoryId});
      },
      // 类型切换
      typeToggle:function(tagName){
         this.initAlbumList(this.categoryId,tagName);
      },
      // 获取节目类型列表
      async getProgramTypeList(categoryId) {
        let data = await getProgramTypeList('1008',categoryId);
        var result = JSON.parse(data.value);
        this.tabList = [];
        if(result && result.length>0){
          this.tabLength = result.length*55;
          for(var i=0;i<result.length;i++){
  					var tabName = result[i].tag_name;
            if(i==0){
              this.initAlbumList(categoryId,result[0].tag_name);
            }
            this.tabList.push(tabName);
  				}
          this.$nextTick(() => {
            this.$refs.scroller.reset();
          })

        }
      },
      // 初始化热点节目列表
      initAlbumList:function(categoryId,tagName){
        var initAlbumList = this.initAlbumList;
        var router =  this.$router;
      	var loading = layer.open({type: 2});
      	var params = {
      		"categoryCode":"1006",
      		"dataCount":"20",
      		"dataPage":"1",
      		"categoryId":categoryId,
      		"tagName":tagName
      	};
       	$.post(GLOBALURL.DO_QUERY_XMLAPROGRAM_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var datainfo = data.value;
      			datainfo = JSON.parse(datainfo);
      			var result = datainfo.albums;
      			var html = "";
      			if(result && result.length > 0){
      				for(var i=0;i<result.length;i++){
      					html +="<div class=\"card_ecchange plus-pass\" data-id="+result[i].id+">";
      					html +="	<i class=\"images_card\"><img src='"+result[i].cover_url_large+"'></i>";
      					html +="	<h1>"+result[i].album_title+"</h1>";
      					html +="	<p class=\"title\">"+(result[i].album_intro?result[i].album_intro:result[i].album_title)+"</p>";
      					html +="	<p><i class=\"icon-play\"></i>"+result[i].play_count+"<i class=\"icon-paper-clip\"></i>"+result[i].include_track_count+"集</p>";
      					html +="</div>";
      				}
      		   }
      		   $("#albumList").html(html);
      		   $("#albumList .card_ecchange").click(function(){
      			   // 1:小说  2:音乐  3:相声 4:直播 5:新闻  6:电台 7:其它    (999  巨能音乐 998巨能 UGC )
      			   var albumId = $(this).attr("data-id");
      			   var programType = "2";
      			   if(categoryId == "1"){ // 新闻
      				   programType= "5";
      			   }else if(categoryId == "2"){ // 音乐
      				   programType = "2";
      			   }else if(categoryId == "3"){ // 小说
      				   programType = "1";
      			   }else if(categoryId == "12"){ // 相声
      				   programType = "3";
      			   }
               router.replace({path:"../program/programList?programType="+programType+"&albumId="+albumId});
      		   });
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initAlbumList(categoryId,tagName));
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
       	});
      }
    }
}
</script>
