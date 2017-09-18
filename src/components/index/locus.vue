<template>
<div>
  <header>
      <div class="header">
          <h1>行驶轨迹</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height:2.5rem;"></div>

  <!-- 行驶轨迹 -->
  <div id="container">
    <!-- 头部选择项 -->
    <div class="firmL-nav">
      <ul class="firmL-nav-U myassociation-na v">
        <li class="" style="width:26%;">
          <datetime style="border-top:none;padding:0;" @on-change="selectDate" :title="('选择日期')" :min-year=1990 :max-year=2100 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
              <span style="margin:0 8% 0 8%;" id="queryTime">查询时间<i class="icon-chevron-down" style="padding:0 0.4rem;"></i></span>
          </datetime>
          <div class="bar"></div>
        </li>
        <span id="timeInfo" style="display:block;text-align:center;font-size:0.65rem;margin-right:0.2rem;">⇐请选择查询时间</span>
      </ul>

    </div>
    <!-- 头部选择项 end-->
    <div id="mapContent"  style="width:100%;height:35rem;top:2.5rem;"></div>
  </div>
  <!--行驶轨迹end-->

</div>
</template>

<script>
  import { Datetime } from 'vux'
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  import OFFLINE_PIC from './../../images/map/icon_car_offline.png'
  import ONLINE_PIC from './../../images/map/icon_car_online.png'
  import STARTPOS_PIC from './../../images/map/startpos.gif'
  import STOPPOS_PIC from './../../images/map/stoppos.gif'
  import STOP_PIC from './../../images/map/stop.png'

  var locusMap = null;
  var userpk = "";
  var username = "";
  var stopposPoints = [];

  export default{
    name: 'Locus',
    components: {
      Datetime
    },
    data(){
      return{
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userpk = userInfo.userpk;
        username = userInfo.userinfo.userinfoname;
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    mounted(){
        var mapHeight = $(window).height()- $(".header").height();
        $("#mapContent").height(mapHeight);
        var point = new BMap.Point(114.31667,30.51667); // 默认地址长青灯饰城
        locusMap = new BMap.Map("mapContent");//在百度地图容器中创建一个地图
        locusMap.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中

        locusMap.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        locusMap.enableScrollWheelZoom();//启用地图滚轮放大缩小
        locusMap.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        locusMap.enableKeyboard();//启用键盘上下左右键移动地图

        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        locusMap.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        locusMap.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        locusMap.addControl(ctrl_sca);
        this.initLastAddress();

    },
    methods: {
      // 选择时间
      selectDate:function(value){
        if(value){
          $("#timeInfo").text(value+" 00:00:01~"+value+" 23:59:59");
          this.queryHistoryLocus(value);
        }
      },
      // 初始化最后一次停车位置
      initLastAddress:function(){
        var initLastAddress = this.initLastAddress;
        var addClickHandler_car = this.addClickHandler_car;
        var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo) {
      		userInfo = JSON.parse(userInfo);
      		var username = userInfo.userinfo.userinfoname;
      		var userpk = userInfo.userpk
      		var params = {
      			"driverId":userpk,
      			"platform":"3"
      		}
      		$.post(GLOBALURL.FIND_CAR_ADDRESS,params,function(data){
      			if(data.statusCode == 0){
      				var result = data.value;
      				if(result){
      					var lat = Number(result.latitude)==0?"30.58655":result.latitude;
      					var lng = Number(result.longtitude)==0?"114.2338":result.longtitude;
      					var sendtime = result.sendtime;
      					var isOnline = result.isOnline;
      					var speed = result.speed;
      					var point = new BMap.Point(lng, lat);
                var imgUrl = "";
      					locusMap.panTo(point);
    				    if(isOnline == 0 || isOnline == 2){
    					    imgUrl = OFFLINE_PIC;
    					    isOnline = "不在线";
    				    }else{
    					    imgUrl = ONLINE_PIC;
    					    isOnline = "在线";
    				    }
    				    var icon = new BMap.Icon(imgUrl, new BMap.Size(20,36),{anchor:new BMap.Size(27, 13)});
    				    var marker = new BMap.Marker(point,{icon:icon}); // 创建标注
    				    locusMap.addOverlay(marker);
    				    addClickHandler_car(marker,point,sendtime,isOnline,speed,lng,lat);
      				}
      			}else if(data.statusCode == -999){
      				//initLoginStatus(initLastAddress());
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      		},"json");
        }
      },
      // 车添加点击监听
      addClickHandler_car:function(marker,point,sendtime,isOnline,speed,lng,lat){
          var openInfo = this.openInfo;
          var paraMap = locusMap;
          var gc = new BMap.Geocoder();
        	gc.getLocation(point, function(rs){
        	  var addComp = rs.addressComponents;
        	  var realAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        		var html = "";
        	    html += "<div style='width:6rem;height:auto;'>";
        	    html +=  "<div style='font-size:10pt;width:6rem;margin-left:0px;'>";
        	    html +=  "<span style='margin-right:10px;'><b>"+username+"</b></span>";
        	    html +=  "</div>";
        	    html +=  "<div style='font-size:3pt;border-bottom:1px solid #ff0000;width:10rem;margin-left:0px;'></div>";
        	    html +=  "<table style='font-size:12px;width:12rem' id='infoWindow'>";
        	    html +=  "	<tbody>";
        	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>上传时间：</span><span>"+sendtime+"</span></td></tr>";
        	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>上传地址：</span>"+realAddress+"</td></tr>";
        	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>当前时速：</span><span>"+Number(speed).toFixed(2)+"km/h</span></td></tr>";
        	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>在线状态：</span>"+isOnline+"</td></tr>";
        	    html +=  "  </tbody>";
        	    html +=  "</table>";
        	    html +=  "</div>";
        		marker.addEventListener("click",function(e){
        			openInfo(html,paraMap,e);
        		});
        });
      },
      // 打开信息窗口
      openInfo:function(content,paraMap,e){
          var p = e.target;
        	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        	var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象
        	paraMap.openInfoWindow(infoWindow,point); // 开启信息窗口
      },
      // 历史轨迹查询
      queryHistoryLocus:function(chooseDate){
        var queryHistoryLocus = this.queryHistoryLocus;
        var initLastAddress = this.initLastAddress;
        var addClickHandler_pos = this.addClickHandler_pos;
        var loading = layer.open({type: 2});
      	var startTime = chooseDate + " 00:00:01";
      	var endTime = chooseDate + " 23:59:59";
      	$.post(GLOBALURL.TRAFFIC_LOCUSHISTORY_URL,{"userpk":userpk,"startTime":startTime,"endTime":endTime},function(data){
          		if(data.statusCode == 0){
       			    locusMap.clearOverlays();
          		   var hisPoints = [];
          		   stopposPoints = [];
          		   var result = data.historyList;
          		   if(result && result.length>0){
          			   var currDistance = 0;
      	    		   for(var i=0;i<result.length;i++){
      	    			  var lng = Number(result[i].lng);
      	    			  var lat = Number(result[i].lat);
      	    			  if(result[i].distance){
      					      currDistance = currDistance + Number(result[i].distance); // 里程累加
      	    			  }
      	    			  var point = new BMap.Point(lng, lat);
      	    			  hisPoints.push(point);
      					    //设置图片及格式
        					  var icon;
        					  if(i==0){
        						  icon=new BMap.Icon(STARTPOS_PIC, new BMap.Size(41,26),{anchor : new BMap.Size(27, 13)});
            					  //创建图标
            					  var marker = new BMap.Marker(point,{icon:icon});
            					  locusMap.addOverlay(marker);
            					  var posType= "1";
            					  addClickHandler_pos(marker,locusMap,result[i].addtime,"",result[i].lat,result[i].lng,posType,currDistance);
        				      }else if(i==result.length-1){
        						  icon=new BMap.Icon(STOPPOS_PIC, new BMap.Size(41,27),{anchor : new BMap.Size(27, 13)});
            					  var marker = new BMap.Marker(point,{icon:icon});
            					  locusMap.addOverlay(marker);
            					  var posType= "2";
            					  addClickHandler_pos(marker,locusMap,result[i].addtime,"",result[i].lat,result[i].lng,posType,currDistance);
        					  }

      				      if(i!=0 && i!=result.length-1 && Number(result[i].interval) > 1000*60*5 && Number(result[i].interval) < 1000*60*60*24){
      				    	  if(Number(result[i].interval) > 1000*60*15){ // 大于15分钟的
      		    			      stopposPoints.push(point); // 停车点集合
      				    	  }
      						    icon = new BMap.Icon(STOP_PIC, new BMap.Size(24,24));
          					  var marker = new BMap.Marker(hisPoints[hisPoints.length-2],{icon:icon});
          					  locusMap.addOverlay(marker);
          			     	  // 给覆盖物加标签
          			     	  var label = new BMap.Label("停车："+result[i].intervalText,{offset:new BMap.Size(20,-20)});
          			     	  label.setStyle({
          			     			position:"relative",
          			     			color : "red",
          			     			backgroundColor :"white",
          			     			border :"0",
          			     			fontWeight :"bold"
          			     	  });
          			     	  marker.setLabel(label);
          			          var posType= "3";
          			     	  addClickHandler_pos(marker,locusMap,result[i-1].addtime,result[i].intervalText,result[i-1].lat,result[i-1].lng,posType,currDistance);
      					     }
      	    		   }
      	    		   // 绘制轨迹线
      	    		   if (hisPoints.length > 1) {
      	    				var polyline = new BMap.Polyline(hisPoints, {
      	    					strokeColor : "#ff0000",
      	    					strokeOpacity : 0.7,
      	    					strokeWeight : 4
      	    				});
      	    				locusMap.addOverlay(polyline);
      	    		   }
      	    		   locusMap.panTo(hisPoints[0]);
          		   }else{
          		     // 移动到最新位置
                   layer.open({content:'该时间段内暂无行驶轨迹',skin:'msg',time: 2});
          			   initLastAddress();
          		   }
          		}else if(data.statusCode == -999){
          			//initLoginStatus(queryHistoryLocus(chooseDate));
      			}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
      			}
         		// 等待层
     		    setTimeout(function(){
     				    layer.close(loading);
     		    },200);
          },"json");
      },
      // 停车点添加点击监听
      addClickHandler_pos:function(marker,paraMap,addtime,intervalText,lat,lng,posType,currDistance){
        var openInfo = this.openInfo;
        var posText = "";
      	if(posType == '1'){
      		posText = "起始";
      	}else if(posType == '2'){
      		posText = "终止";
      	}else if(posType == '3'){
      		posText = "停车";
      	}else if(posType == '4'){
      		posText = "上传";
      	}
      	var point = new BMap.Point(lng, lat);
          var gc = new BMap.Geocoder();
          gc.getLocation(point, function(rs){
      	    var addComp = rs.addressComponents;
      	    var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
      	  	var html = "";
      	    html += "<div style='width:6rem;height:auto;'>";
      	    html +=  "<div style='font-size:10pt;width:6rem;margin-left:0px;'>";
      	    html +=  "<span style='margin-right:10px;'><b>"+username+"</b></span>";
      	    html +=  "</div>";
      	    html +=  "<div style='font-size:3pt;border-bottom:1px solid #ff0000;width:10rem;margin-left:0px;'></div>";
      	    html +=  "<table style='font-size:12px;width:12rem;' id='infoWindow'>";
      	    html +=  "	<tbody>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>"+posText+"时间：</span><span>"+addtime+"</span></td></tr>";
      	    if(posType == '3'){
      		  html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>"+posText+"时长：</span>"+intervalText+"</td></tr>";
      	    }
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>"+posText+"地点：</span>"+address+"</td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>"+posText+"纬度：</span><span>"+Number(lat).toFixed(5)+"</span></td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>"+posText+"经度：</span>"+Number(lng).toFixed(5)+"</td></tr>";
      	    if(posType != '4'){
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>当天里程：</span><span>"+(Number(currDistance)/1000).toFixed(2)+"km</span></td></tr>";
      	    }else{
      		  html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>当前时速：</span>"+speed+"km/h</td></tr>";
      	    }
      	    html +=  "  </tbody>";
      	    html +=  "</table>";
      	    html +=  "</div>";
        		marker.addEventListener("click",function(e){
        			openInfo(html,paraMap,e);
        		});
          });
      }
  }
}
</script>
