<template>
<div>
  <header>
      <div class="header">
          <h1>{{headerTitle}}</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!--节目介绍-->
 	<div class="mien-d">
 		<div class="userPu-i" style="background-color:gray;">
 		    <div class="user-i-i">
 				<img class="programPic" src="./../../images/program/program_101.png" style="width:5rem;height:5rem;">
 		    </div>
 		    <div class="mien-n" style="color:#fff;">
         <h3><i class="icon-music" style="padding:0 5px;"></i><span class="programType" >经典好歌</span></h3>
 			   <p><i class="icon-user" style="padding:0 5px;"></i><span class="programAuthor">巨能音乐库</span></p>
 			   <p><i class="icon-info-sign" style="padding:0 5px;"></i><span class="programLabel">一个人一座城</span></p>
 		    </div>
 		</div>

 		<div class="mien-s">
 			<i class="icon-asterisk"></i>
 			<span>详情介绍:</span>
 		</div>
 		<div class="mien-con">
 			<p class="programIntroduce">所有的结局都已写好
 			所有的泪水也都已启程
 			却忽然忘了是怎么样的一个开始
 			在那个古老的不再回来的夏日
 			无论我如何去追索
 			年轻的你只如云影掠过
 			而你微笑的面容极浅极淡
 			逐渐隐没在日落后的群岚里
 			遂翻开那发黄的扉页
 			命运将它装订的极为拙劣
 			含着泪 我一读再读
 			却不得不承认
 			青春
 			是一本太仓促的书</p>
 		</div>
     </div>
     <!--节目介绍end-->
 	<div class="m-Mien">
 		<div class="dynamic-list-head" style="border-top:1px solid #f1f1f1;">
 				<i class="dynamic-i-l icon-share"></i>
 				<b>全部歌曲<small>(共<span class="programNum">0</span>首)</small></b>
 				<a href="javascript:void(0);"><i class="dynamic-i-r icon-reorder fr" style="display:none;"></i></a>
 		</div>
 		<ul class="programList">
 		</ul>
 	</div>

 	<!-- 节目操作 -->
 	<div class="comment-module programAction" hidden="hidden">
 		<div class="kuang" style="left:2.5rem;right:2.5rem;">
 			<div class="comment-h">
 				<i class="icon-remove close actionClose" style="float:right;" @click="actionClose"></i>
 				<p class="programName" style="font-size:0.8rem;" data-pk="" data-id="" data-url="" data-pic="" data-size="" data-time="" data-index="" data-announcer="" data-ablums="" data-total="" data-order="" >--</p>
 			</div>
 			<div class="comment-con">
 				<ul class="datum-list">
 					<li class="dropdown" @click="programOrder()">
 						<a href="javascript:void(0);">
 							<h1 data-toggle="dropdown" id="programOrder" class="vtitle" style="line-height:2.5rem;height:2.5rem;"><i style="line-height:2.5rem;" class="ba-color ba-color3 icon-share-alt"></i><b>{{orderText}}</b></h1>
 						</a>
 					</li>
 					<li class="dropdown" @click="programPlay()">
 						<a href="javascript:void(0);">
 							<h1 data-toggle="dropdown" id="programPlay" class="vtitle" style="line-height:2.5rem;height:2.5rem;" ><i style="line-height:2.5rem;" class="ba-color icon-play"></i><b>车机播放</b></h1>
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
  import { dateFormat,formatSeconds,initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var programType = "";
  var albumId = "";
  var _prepath = "";

  export default{
    name: 'ProgramList',
    components: {
    },
    data(){
      return{
        isDialogShow:true,
        orderText:"定制到车机播放列表",
        headerTitle:"经典好歌"
      }
    },
    created () {
      //  1:小说  2:音乐  3:相声 4:直播 5:新闻  6:电台 7:其它    (999  巨能音乐 998巨能 UGC )
      programType = this.$route.query.programType?this.$route.query.programType:"999";
      var headerTitle = "经典好歌";
      if(programType == "999"){ // 巨能音乐
        this.initProgramList(); // 初始化节目列表
        headerTitle = "经典好歌";
      }else if(programType == "998"){ // 巨能UGC
        var ugcAlbumPk = this.$route.query.ugcAlbumPk;
        this.initUGCList(ugcAlbumPk); // 初始化UGC节目列表
        headerTitle = "巨能UGC";
      }else if(programType == "1" || programType == "5"){ // 连载节目
        albumId = this.$route.query.albumId;
        this.initXMLAProgramList(albumId,programType,"asc"); // 初始化喜马拉雅节目列表
        headerTitle = "连载节目";
        this.orderText = "从此处开始定制";
      }else if(programType == "7"){ // 首页焦点图
        var bannerId = this.$route.query.bannerId;
        this.initBannerProgramList(bannerId); // 初始化喜马拉雅节目列表
        headerTitle = "精彩推荐";
      }else if(programType == "2" || programType == "3" || programType == "4"){ // 精彩节目
        albumId = this.$route.query.albumId;
        this.initXMLAProgramList(albumId,programType,"asc"); // 初始化喜马拉雅节目列表
        headerTitle = "精彩节目";
      }
      this.headerTitle = headerTitle;
      _prepath = sessionStorage.getItem("_prepath");
    },
    methods: {
      // 返回上一页
      pageBack:function(){
        if(_prepath && _prepath.indexOf("home")==-1){
          this.$router.replace({path:_prepath});
        }else{
          this.$router.replace({path:"/home?modelIndex=2"});
        }
      },
      // 关闭对话框
      actionClose:function(){
        $(".comment-module").hide();
      },
      // 车机节目定制
      programOrder:function(){
          var isDriver = sessionStorage.getItem("_isDriver");
          if(isDriver == "false"){
            layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
            return false;
          }
          if(programType == "999" || programType == "998"){
      			var programInfoPK = $(".programName").attr("data-pk");
      			this.programCommission(programInfoPK); // 巨能节目定制
      		}else if(programType == "2" || programType == "3" || programType == "4" || programType == "7"){
      			var programId = $(".programName").attr("data-id");
      			var programUrl = $(".programName").attr("data-url");
      			var programPic = $(".programName").attr("data-pic");
      			var programDuration = $(".programName").attr("data-time");
      			var programSize = $(".programName").attr("data-size");
      			var programTitle = $(".programName").text();
      			programType = programType=="4"?"7":programType;
      			this.xmlaProgramCommission(programId,programUrl,programPic,programTitle,programSize,programDuration,programType); // 喜马拉雅节目定制
      		}else{
      			var programUrl = $(".programName").attr("data-url");
      			var orderNum = $(".programName").attr("data-index");
      			var announcerId = $(".programName").attr("data-announcer");
      			var albumsName = $(".programName").attr("data-ablums");
      			var programNum = $(".programName").attr("data-total");
      			var orderType = $(".programName").attr("data-order");
      			this.serialProgramCommission(albumId,orderNum,programType,announcerId,albumsName,programUrl,programNum,orderType);
      		}
      },
      // 车机节目播放
      programPlay:function(){
          var isDriver = sessionStorage.getItem("_isDriver");
          if(isDriver == "false"){
            layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
            return false;
          }
          if(programType == "999" || programType == "998"){
      			var programInfoPK = $(".programName").attr("data-pk");
      			this.doProgramPlay(programInfoPK); // 车机播放
      		}else{
      			var programUrl = $(".programName").attr("data-url");
      			var programPic = $(".programName").attr("data-pic");
      			var programTitle = $(".programName").text();
      			this.xmlaProgramPlay(programUrl,programPic,programTitle);
      		}
      },
      // 初始化巨能节目列表
      initProgramList:function(){
          var loading = layer.open({type: 2});
        	var params = {
        		"code":"1004",
        		"currentPage":"1"
        	};
         	$.post(GLOBALURL.DO_QUERY_PROGRAM_BY_CODE,params,function(data){
        		if(data.statusCode == 0){
        			var result = data.value;
        			if(result && result.length > 0){
        				var html = "";
        				$(".programNum").text(result.length);
        				for(var i=0;i<result.length;i++){
        					html += "<li>";
        					html += "	<a href=\"javascript:void(0);\" class=\"cl programinfo\" data-pk="+result[i].programInfoPK+" data-url="+result[i].url+">";
        					html += "		<div class=\"title\">";
        					html += "			<h1>"+result[i].title+"</h1>";
        					html += "		</div>";
        					html += "		<p class=\"info\">";
        					html += "			<span><i class=\"icon-user\"></i>巨能音乐库</span>";
        					html += "			<span style=\"padding-left:10px;\"><i class=\"icon-folder-open\"></i>"+result[i].type+"</span>";
        					html += "			<span><i class=\"icon-tasks\"></i></span>";
        					html += "		</p>";
        					html += "	</a>";
        					html += "</li>";
        				}
        				$(".programList").html(html);
        				$(".programList li .icon-tasks").click(function(){
        					var programName = $(this).parents("a").find("h1").text();
        					var programInfoPK = $(this).parents("a").attr("data-pk");
        					$(".programName").text(programName);
        					$(".programName").attr("data-pk",programInfoPK);
        					$(".programAction").show();
        				});
        		   }
        		}else{
        			layer.open({content:data.message,skin: 'msg',time: 2});
        		}
            // 等待层
            setTimeout(function(){
              layer.close(loading);
            },200);
         	});
      },

      // 初始化UGC节目列表
      initUGCList: function(ugcAlbumPk){
      	var loading = layer.open({type: 2});
      	var params = {
      		userPK:"",
      		ugcAlbumPK:ugcAlbumPk,
      		ugcPK:"",
      		programInfoPK:"",
      		typePK:"",
      		currentPage:"1"
      	};
       	$.post(GLOBALURL.DO_QUERY_MAIN_ALBUM,params,function(data){
      		if(data.statusCode == 0){
            var ugcalbumname = data.value.ugcalbumlist[0].ugcalbumname;
      			$(".programPic").attr("src",data.value.ugcalbumlist[0].ugcalbumimgaeurl);
      			$(".programType").text(ugcalbumname.length>13?(ugcalbumname.substring(0,13)+"..."):ugcalbumname);
      			$(".programAuthor").text("巨能原创团队");
      			$(".programLabel").text(data.value.ugcalbumlist[0].ugcalbumlabel);
      			$(".programIntroduce").text(data.value.ugcalbumlist[0].ugcalbumbriefintroduce);

      			var result = data.value.ugcalbumlist[0].ugcalbumugcass;
      			if(result && result.length > 0){
      				var html = "";
      				var defImage = "./images/epsot_logo.jpg";
      				var albumType = data.value.ugcalbumlist[0].ugctype.ugctypename;
      				$(".programNum").text(result.length);
      				for(var i=0;i<result.length;i++){
      					html += "<li>";
      					html += "	<a href=\"javascript:void(0);\" class=\"cl programinfo\" data-pk="+result[i].ugc.programinfo.programinfopk+" data-url="+result[i].ugc.ugcurl+">";
      					html += "		<div class=\"title\">";
      					html += "			<h1>"+result[i].ugc.ugcname+"</h1>";
      					html += "		</div>";
      					html += "		<p class=\"info\">";
      					html += "			<span><i class=\"icon-user\"></i>巨能原创团队</span>";
      					html += "			<span style=\"padding-left:10px;\"><i class=\"icon-folder-open\"></i>"+albumType+"</span>";
      					html += "			<span><i class=\"icon-tasks\"></i></span>";
      					html += "		</p>";
      					html += "	</a>";
      					html += "</li>";
      				}
      				$(".programList").html(html);
      				$(".programList li .icon-tasks").click(function(){
      					var programName = $(this).parents("a").find("h1").text();
      					var programInfoPK = $(this).parents("a").attr("data-pk");
      					$(".programName").text(programName);
      					$(".programName").attr("data-pk",programInfoPK);
      					$(".programAction").show();
      				});
      		   }
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
       	});
      },

      // 初始化喜马拉雅节目列表
      initXMLAProgramList:function(albumId,programType,orderType){
        var initXMLAProgramList = this.initXMLAProgramList;
      	var loading = layer.open({type: 2});
      	var params = {
      		"categoryCode":"1007",
      		"dataCount":"20",
      		"dataPage":"1",
      		"albumId":albumId,
      		"sort":orderType
      	};
       	$.post(GLOBALURL.DO_QUERY_XMLAPROGRAM_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var datainfo = data.value;
      			datainfo = JSON.parse(datainfo);
            console.log("==programPic=="+datainfo.cover_url_large);
      			$(".programPic").attr("src",datainfo.cover_url_large);
      			$(".programLabel").text(datainfo.album_title);
      			$(".programIntroduce").text(datainfo.album_intro);
      			$(".programNum").text(datainfo.total_count);
      			var result = datainfo.tracks;
      			if(result && result.length > 0){
      				var html = "";
      				var albumType = result[0].track_tags;
      				var albumAuthor = result[0].announcer.nickname;
      				$(".programType").text(albumType.length>13?(albumType.substring(0,13)+"..."):albumType);
      				$(".programAuthor").text(albumAuthor);
      				var totalNum = datainfo.total_count;
      				var albumTitle = datainfo.album_title;
      				var currentIndex = (Number(datainfo.current_page) - 1) * 10;
      				for(var i=0;i<result.length;i++){
      					var thisIndex = currentIndex + i + 1;
      					html += "<li>";
      					html += "	<a href=\"javascript:void(0);\" class=\"cl programinfo\"  data-index='"+thisIndex+"' data-announcer='"+result[i].announcer.id+"' data-size='"+result[i].play_size_64_m4a+"' data-time='"+result[i].duration+"' data-pic='"+result[i].cover_url_large+"' data-id='"+result[i].id+"' data-url='"+result[i].play_url_64_m4a+"'>";
      					html += "		<div class=\"title\">";
      					html += "			<h1>"+result[i].track_title+"</h1>";
      					html += "			<span>"+dateFormat(result[i].created_at)+"</span>";
      					html += "		</div>";
      					html += "		<p class=\"info\">";
      					html += "			<span><i class=\"icon-user\"></i>"+result[i].announcer.nickname+"</span>";
      					html += "			<span style=\"padding-left:10px;\"><i class=\"icon-time\"></i>"+formatSeconds(result[i].duration)+"</span>";
      					html += "			<span><i class=\"icon-tasks\"></i></span>";
      					html += "		</p>";
      					html += "	</a>";
      					html += "</li>";
      				}
      				$(".programList").html(html);
      				$(".icon-reorder").show();
      				$(".programList li a").click(function(){
      					if(programType== "1" || programType =="5"){
      						var programTitle = $(this).find("h1").text();
      						var programOrder = (orderType == "asc")?"1":"0";
                  var programPicurl = $(this).attr("data-pic");
      						$(".programName").text(programTitle);
      						$(".programName").attr("data-index",$(this).attr("data-index"));
      						$(".programName").attr("data-url",$(this).attr("data-url"));
      						$(".programName").attr("data-announcer", $(this).attr("data-announcer"));
      						$(".programName").attr("data-ablums",albumTitle);
      						$(".programName").attr("data-total",totalNum);
      						$(".programName").attr("data-order",programOrder);
                  $(".programName").attr("data-pic",programPicurl);
      					}else{
      						var programTitle = $(this).find("h1").text();
      						var programId = $(this).attr("data-id");
      						var programUrl = $(this).attr("data-url");
      						var programPicurl = $(this).attr("data-pic");
      						var programDuration = $(this).attr("data-time");
      						var programSize = $(this).attr("data-size");
      						$(".programName").text(programTitle);
      						$(".programName").attr("data-id",programId);
      						$(".programName").attr("data-url",programUrl);
      						$(".programName").attr("data-pic",programPicurl);
      						$(".programName").attr("data-time",programDuration);
      						$(".programName").attr("data-size",programSize);
      					}
      					$(".programAction").show();
      				});
      				$(".icon-reorder").on("touchstart", function(e) {
      					orderType = (orderType == "asc")?"desc":"asc";
      					initXMLAProgramList(albumId,programType,orderType);
      				});
      		   }
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
       	});
      },

      // 首页焦点图详情
      initBannerProgramList:function(bannerId){
      	var loading = layer.open({type: 2});
      	var params = {
      		"categoryCode":"1002",
      		"bannerId":bannerId
      	};
       	$.post(GLOBALURL.DO_QUERY_XMLAPROGRAM_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var datainfo = data.value;
      			datainfo = JSON.parse(datainfo);
      			$(".programType").text("精彩推荐");
      			$(".programPic").attr("src",datainfo.cover_url_large);
      			$(".programLabel").text(datainfo.column_intro.substring(0,10)+"...");
      			$(".programIntroduce").text(datainfo.column_intro);
      			$(".programAuthor").text(datainfo.column_editor.nickname);
      			var result = datainfo.column_items;
      			if(result && result.length > 0){
      				var html = "";
      				$(".programNum").text(result.length);
      				for(var i=0;i<result.length;i++){
      					html += "<li>";
      					html += "	<a href=\"javascript:void(0);\" class=\"cl programinfo\">";
      					html += "		<div class=\"title\">";
      					html += "			<h1>"+result[i].track_title+"</h1>";
      					html += "			<span>"+dateFormat(result[i].created_at)+"</span>";
      					html += "		</div>";
      					html += "		<p class=\"info\">";
      					html += "			<span><i class=\"icon-user\"></i>"+datainfo.column_editor.nickname+"</span>";
      					html += "			<span style=\"padding-left:10px;\"><i class=\"icon-time\"></i>"+formatSeconds(result[i].duration)+"</span>";
      					html += "			<span><i class=\"icon-tasks\" data-title='"+result[i].track_title+"' data-id='"+result[i].id+"' data-url='"+result[i].play_url_64+"' data-pic='"+result[i].cover_url_large+"' data-time='"+result[i].duration+"' data-size=\"0\"></i></span>";
      					html += "		</p>";
      					html += "	</a>";
      					html += "</li>";
      				}
      				$(".programList").html(html);
      				$(".programList li .icon-tasks").click(function(){
      					var programTitle = $(this).attr("data-title");
      					var programId = $(this).attr("data-id");
      					var programUrl = $(this).attr("data-url");
      					var programPicurl = $(this).attr("data-pic");
      					var programDuration = $(this).attr("data-time");
      					var programSize = $(this).attr("data-size");
      					$(".programName").text(programTitle);
      					$(".programName").attr("data-id",programId);
      					$(".programName").attr("data-url",programUrl);
      					$(".programName").attr("data-pic",programPicurl);
      					$(".programName").attr("data-time",programDuration);
      					$(".programName").attr("data-size",programSize);
      					$(".programAction").show();
      				});
      		   }
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
      programCommission:function(programInfoPK){
        var programCommission = this.programCommission;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var loading = layer.open({type: 2});
      		var params = {
      			"driverpk":userpk,
      			"programpks":programInfoPK,
      			"proaction":"add"
      		};
      		$.post(GLOBALURL.PROGRAM_COMMISSION,params,function(data){
      			if(data.statusCode == 0){
      				layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(programCommission(programInfoPK));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
            // 等待层
            setTimeout(function(){
              layer.close(loading);
            },200);
      		});
      	}else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      },

      // 喜马拉雅节目定制
      xmlaProgramCommission:function(programId,programUrl,programPic,programTitle,programSize,programDuration,programType){
        var xmlaProgramCommission = this.xmlaProgramCommission;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var loading = layer.open({type: 2});
      		var params = {
      			"userPK":userpk,
      			"title":programTitle,
      			"url":programUrl,
      			"imageURL":programPic,
      			"type":programType,
      			"duration":programDuration,
      			"size":programSize,
      			"thirdID":programId,
      			"platform":"3"
      		};
      		$.post(GLOBALURL.XMLAPROGRAM_ORDERS,params,function(data){
      			if(data.statusCode == 0){
      				layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(xmlaProgramCommission(programId,programUrl,programPic,programTitle,programSize,programDuration,programType));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
            // 等待层
            setTimeout(function(){
              layer.close(loading);
            },200);
      		});
      	}else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      },

      // 连载节目定制
      serialProgramCommission:function(albumsId,orderNum,albumsType,announcerId,albumsName,programUrl,programNum,orderType){
        var serialProgramCommission = this.serialProgramCommission;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var userpk = "";
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		userpk = userInfo.userpk;
      		var loading = layer.open({type: 2});
      		var params = {
      			"driverId":userpk,
      			"albumsId":albumsId, // 专辑id
      			"orderNum":orderNum, // 定制起始位置
      			"albumsType":albumsType, // 专辑类型   // 1 小说，5 新闻
      			"announcerId":announcerId, // 作者id
      			"albumsName":albumsName, // 专辑名称
      			"programUrl":programUrl, // 章节url
      			"programNum":programNum, // 章节数目
      			"orderType":orderType, // 节目排序
      			"platform":"3"
      		};
      		$.post(GLOBALURL.ORDER_SERIAL_PRO,params,function(data){
      			if(data.statusCode == 0){
      				layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".comment-module").hide();
      			}else if(data.statusCode == -999){
      				//initLoginStatus(serialProgramCommission(albumsId,orderNum,albumsType,announcerId,albumsName,programUrl,programNum,orderType));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
            // 等待层
            setTimeout(function(){
              layer.close(loading);
            },200);
      		});
      	}else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      },

      // 车机播放
      doProgramPlay:function(programInfoPK){
        var doProgramPlay = this.doProgramPlay;
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
      				//initLoginStatus(doProgramPlay(programInfoPK));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		});
      	}else{
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }
      },

      // 喜马拉雅节目车机播放
      xmlaProgramPlay:function(programUrl,programPic,programTitle){
        var xmlaProgramPlay = this.xmlaProgramPlay;
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
      				//initLoginStatus(xmlaProgramPlay(programUrl,programPic,programTitle));
              layer.open({content:'登录超时，请您重新登录...',skin:'msg',time: 2});
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
