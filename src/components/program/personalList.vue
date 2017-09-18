<template>
<div>
  <header>
      <div class="header">
          <h1>车机定制列表</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div>
     <scroller lock-y :scrollbar-x='false'>
       <tab :line-width=2 active-color='#06C1AE' v-model="index" :style="{width:tabLength + 'px' }">
         <tab-item @click.native="typeToggle(item.tabType)" class="vux-center" :selected="tabName === item.tabName" v-for="(item, index) in tabList" @click="tabName = item.tabName" :key="index">{{item.tabName}}</tab-item>
       </tab>
     </scroller>
     <div class="m-Mien">
      <ul class="programList"></ul>
     </div>
  </div>

	<!-- 节目操作 -->
	<div class="comment-module programAction" hidden="hidden">
		<div class="kuang" style="left:2.5rem;right:2.5rem;">
			<div class="comment-h">
				<i class="icon-remove close actionClose" style="float:right;" @click="actionClose()"></i>
				<p class="programName" style="font-size:0.8rem;" data-pk="" data-type="">--</p>
			</div>
			<div class="comment-con">
				<ul class="datum-list">
					<li class="dropdown" @click="programOrder()" >
						<a href="javascript:void(0);">
							<h1 data-toggle="dropdown" id="programOrder" class="vtitle" style="line-height:2.5rem;height:2.5rem;"><i style="line-height:2.5rem;" class="ba-color ba-color3 icon-share-alt"></i><b id="actionExplain">从车机播放列表删除</b></h1>
						</a>
					</li>
					<li class="dropdown" @click="programPlay()">
						<a href="javascript:void(0);">
							<h1 data-toggle="dropdown"  id="programPlay" class="vtitle" style="line-height:2.5rem;height:2.5rem;"><i style="line-height:2.5rem;" class="ba-color icon-play"></i><b>车机播放</b></h1>
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
  import { initLoginStatus } from '../../utils/utils'
  import { Tab, TabItem, Swiper, SwiperItem,Scroller } from 'vux'
  var currType = "";

  export default{
    name: 'PersonalList',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller
    },
    data(){
      return{
        tabList:[{tabName:'音乐',tabType:'type_01'},{tabName:'小说',tabType:'type_02'},{tabName:'相声',tabType:'type_03'},{tabName:'新闻',tabType:'type_04'},{tabName:'电台',tabType:'type_05'},{tabName:'UGC',tabType:'type_06'},{tabName:'其他',tabType:'type_07'}],
        tabName:"音乐",
        tabLength:"420",
        index:0,
        categoryId:""
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        var userpk = userInfo.userpk;
        this.initProgramList(userpk);
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 类型切换
      typeToggle:function(tabType){
        $(".programList li").hide();
        $(".programList ."+tabType).show();
        currType = tabType;
      },
      // 关闭对话框
      actionClose:function(){
        $(".comment-module").hide();
      },
      // 节目定制
      programOrder:function(){
        var programInfoPK = $(".programName").attr("data-pk");
    		var actionType = $(".programName").attr("data-type");
    		this.programCommission(programInfoPK,actionType); // 节目定制
      },
      // 车机播放
      programPlay:function(){
        var programInfoPK = $(".programName").attr("data-pk");
    		this.doProgramPlay(programInfoPK); // 车机播放
      },
      // 初始化个人节目列表
      initProgramList:function(userpk){
        var initProgramList = this.initProgramLis;
      	var params = {
      		"code":"1002",
      		"currentPage":"1",
      		"userPK":userpk
      	};
      	var loading = layer.open({type: 2});
       	$.post(GLOBALURL.DO_QUERY_PROGRAM_BY_CODE,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			if(result && result.length > 0){
      				var html = "";
      				for(var i=0;i<result.length;i++){
      					var type = result[i].type;
      					if(type == "音乐"){
      						html += "<li class=\"type_01\">";
      					}else if(type == "小说"){
      						html += "<li class=\"type_02\" style=\"display:none\">";
      					}else if(type == "相声"){
      						html += "<li class=\"type_03\" style=\"display:none\">";
      					}else if(type == "新闻"){
      						html += "<li class=\"type_04\" style=\"display:none\">";
      					}else if(type == "电台"){
      						html += "<li class=\"type_05\" style=\"display:none\">";
      					}else if(type == "UGC"){
      						html += "<li class=\"type_06\" style=\"display:none\">";
      					}else{
      						html += "<li class=\"type_07\" style=\"display:none\">";
      					}
      					html += "	<a href=\"javascript:void(0);\" class=\"cl programinfo\" style=\"padding:0.2rem 0.5rem;\" data-type="+result[i].type+" data-pk="+result[i].programInfoPK+" data-url="+result[i].url+">";
      					html += "		<div class=\"title\">";
      					html += "			<h1>"+result[i].title+"</h1>";
      					html += "		</div>";
      					html += "		<p class=\"info\">";
      					html += "			<span><i class=\"icon-folder-open\"></i>"+result[i].type+"</span>";
      					html += "			<span><i class=\"icon-tasks\"></i></span>";
      					html += "		</p>";
      					html += "	</a>";
      					html += "</li>";
      				}
      				$(".programList").html(html);

      				if(currType){
      					$(".programList li").hide();
      					$(".programList ."+currType).show();
      				}

      				$(".programList li .icon-tasks").click(function(){
      					var programName = $(this).parents("a").find("h1").text();
      					var programInfoPK = $(this).parents("a").attr("data-pk");
      					var programType = $(this).parents("a").attr("data-type");
      					var actionType = "cut";
      					var actionExplain = "从车机播放列表删除";
      					if(programType == "小说"){
      						actionType = "cutAll";
      						actionExplain = "取消订阅该小说";
      					}else if(programType == "新闻"){
      						actionType = "cutAll";
      						actionExplain = "取消订阅该新闻";
      					}else{
      						actionType = "cut";
      						actionExplain = "从车机播放列表删除";
      					}
      					$("#actionExplain").text(actionExplain);
      					$(".programName").text(programName);
      					$(".programName").attr("data-pk",programInfoPK);
      					$(".programName").attr("data-type",actionType);
      					$(".programAction").show();
      				});

      		   }
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initProgramList(userpk));
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
       	});
      },

      // 取消节目定制
      programCommission:function(programInfoPK,actionType){
        var initProgramList = this.initProgramList;
        var programCommission = this.programCommission;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
          if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var params = {
      		"driverpk":userpk,
      		"programpks":programInfoPK,
      		"proaction":actionType
      		};
      		$.post(GLOBALURL.PROGRAM_COMMISSION,params,function(data){
      			if(data.statusCode == 0){
              layer.open({content:data.message,skin: 'msg',time: 2});
      				initProgramList(userpk);
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(programCommission(programInfoPK,actionType));
      			}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		});
      	}
      },
      // 车机播放
      doProgramPlay:function(programInfoPK){
        var programPlay = this.programPlay;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var params = {
      			"driverId":userpk,
      			"order":"program",
      			"operation":"play",
      			"content":programInfoPK
      		};
      		$.post(GLOBALURL.GLOBAL_ORDER,params,function(data){
      			if(data.statusCode == 0){
              layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(programPlay(programInfoPK));
      			}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		});
      	}
      }
    }
}
</script>
