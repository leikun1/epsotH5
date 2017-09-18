<template>
<div>
  <header>
      <div class="header">
          <h1>路况</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div id="container" class="">
		<a href="javascript:void(0);" class="compile-btn myaTel-btn mien-tel" id="cameraNum" >
			<i class="icon-picture" style="line-height:2.2rem;"></i>
			<span style="line-height:0.5rem;color:#fff;display:block;margin-top:-0.6rem;">0</span>
			<div id="cameraPics" class="cameraPics" style="line-height:1.5rem;margin-top:0.4rem;">
				<!-- <img layer-pid="1" layer-src="./../../images/group/ts1.jpg" src="./../../images/group/ts1.jpg" alt="照片1">
				<img layer-pid="2" layer-src="./../../images/group/ts2.jpg" src="./../../images/group/ts2.jpg" alt="照片2">
				<img layer-pid="3" layer-src="./../../images/group/ts3.jpg" src="./../../images/group/ts3.jpg" alt="照片3"> -->
        <img class="sharePic" v-for="(item, index) in picList" :src="item.src" @click="showPic(index)" style="width:1.5rem;height:1.5rem;float:initial;">
        <previewer :list="picList" ref="previewer" :options="options"></previewer>
			</div>
    </a>
		<!-- 头部选择项 end-->
		<div id="mapContent" style="width:100%;height:31rem;"></div>
	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { Previewer } from 'vux'
  import $ from 'jquery'
  import OFFLINE_PIC from './../../images/map/icon_car_offline.png'
  import ONLINE_PIC from './../../images/map/icon_car_online.png'
  import PERSONAL_PIC from './../../images/map/icon_car_personal.png'
  import { parseString,initLoginStatus } from './../../utils/utils'
  var map = null;
  var carMarkers = [];
  var isMoveTo = true; // 是否移动到自己位置处
  var shareTimer = null;

  export default{
    name: 'Traffic',
    components: {
      Previewer
    },
    data(){
      return{
        picList:[],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.sharePic')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    mounted(){
        shareTimer = null;
        var mapHeight = $(window).height()- $(".header").height();
        $("#mapContent").height(mapHeight);
        var point = new BMap.Point(114.31667,30.51667); // 默认地址长青灯饰城
        map = new BMap.Map("mapContent");//在百度地图容器中创建一个地图
        map.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中

        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图

        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);

        this.initUserLocation();
    },
    created () {
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 返回上一页
      pageBack:function(){
        window.clearInterval(shareTimer);
        shareTimer = null;
        this.$router.replace({path:"/home?modelIndex=0"});
      },
      showPic(index) {
        this.$refs.previewer.show(index)
      },
      // 获取当前区域所有车主状态
      initUserLocation:function(){
        var initUserLocation = this.initUserLocation;
        var addClickHandler_car = this.addClickHandler_car;
      	var cp = map.getBounds(); // 返回map可视区域，以地理坐标表示
      	var sw = cp.getSouthWest(); // 返回矩形区域的西南角
      	var ne = cp.getNorthEast(); // 返回矩形区域的东北角
          var params = {
          	"southWestLng":sw.lng,
          	"southWestLat":sw.lat,
          	"northEastLng":ne.lng,
          	"northEastLat":ne.lat,
          	"platform":"3"
          };
      	$.post(GLOBALURL.TRAFFIC_ULOCATIONINMAP_URL,params,function(data){
      		if(data.statusCode == 0){
      		   var result = data.value;
      		   if(result && result.length>0){
      			   for(var i=0;i<carMarkers.length;i++){
      				   map.removeOverlay(carMarkers[i]);
      			   }
      			   carMarkers = [];
      			   for(var i=0;i<result.length;i++){
      				   var lng = result[i].lng_bd;
      				   var lat = result[i].lat_bd;
      				   var userpk = result[i].userpk;
      				   var address = result[i].msgcontent;
      				   var time = result[i].addtime;
      				   var platno = result[i].platno?parseString(result[i].platno):"*******";
      				   var carbrands = result[i].carbrands?result[i].carbrands:"";
      				   var username = result[i].username;
      				   var speed = result[i].speed;
      				   var bearing = result[i].bearing;
      				   var imgUrl  = "";
      				   var isOnline = "";
      				   var pt = new BMap.Point(lng, lat);
      				   var userInfo = sessionStorage.getItem("userInfo");
      				   var currUserpk = "";
      				   if(userInfo) {
      					   userInfo = JSON.parse(userInfo);
      					   currUserpk = userInfo.userpk;
      				   }
      				   if(result[i].isOnline == 0 || result[i].isOnline == 2){
      					   imgUrl = OFFLINE_PIC;
      					   isOnline = "不在线";
      				   }else{
      					   imgUrl = ONLINE_PIC;
      					   isOnline = "在线";
      				   }
      				   if(currUserpk == userpk){
      					   imgUrl = PERSONAL_PIC;
      					   if(isMoveTo && lng!="0.0" && lat!="0.0"){
      						   map.panTo(pt);
      						   isMoveTo = false;
      					   }
      				   }
      				   var icon = new BMap.Icon(imgUrl, new BMap.Size(20,36),{anchor:new BMap.Size(27, 13)});
      				   var marker = new BMap.Marker(pt,{icon:icon}); // 创建标注
      				   map.addOverlay(marker);
      				   carMarkers.push(marker);
      				   addClickHandler_car(marker,map,pt,userpk,username,platno,carbrands,time,isOnline,speed,bearing,lng,lat);

      			   }
      		   }else{
      			   for(var i=0;i<carMarkers.length;i++){
      				   map.removeOverlay(carMarkers[i]);
      			   }
      			   carMarkers = [];
      		   }
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initUserLocation());
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      },

      // 请求摄像头
      queryCamera:function (e){
        var queryCamera = this.queryCamera;
        var picList = [];
        var queryShareSet = this.queryShareSet;
      	if(shareTimer){
          layer.open({content:'正在摄像头申请中，请耐心等待!',skin:'msg',time: 2});
      		return false;
      	}
      	var requestId = e.getAttribute("data-pk");
      	var isOnline = e.getAttribute("data-isOnline");
      	var userInfo = sessionStorage.getItem("userInfo");
      	if(userInfo && JSON.parse(userInfo).userpk) {
      		if(isOnline == '不在线'){
            layer.open({content:'该车主不在线，请稍后申请',skin:'msg',time: 2});
      			return false;
      		}
      		var userPk = JSON.parse(userInfo).userpk;
      		var params = {
      			"driverId":userPk,
      			"requestId":requestId,
      		};
      		$.post(GLOBALURL.SHARE_QUERYSHARESET_URL,params,function(data){
      			if(data.statusCode == 0){
      				var result = data.value;
      				if(result && result.length > 0){
      					window.clearInterval(shareTimer);
      					shareTimer = null;
      					var html = "";
      					for(var i=0;i<result.length;i++){
      						var imgUrl = result[i];
      						var picName = "照片"+(i+1);
      						//html += "<img layer-src="+imgUrl+" src="+imgUrl+" alt="+picName+">";
                  picList.push({"src":imgUrl,"title":picName,'w':600,'h':400});
      					}
      					//$("#cameraPics").html(html);
      					$("#cameraNum span").text(result.length);
                layer.open({content:'摄像头分享照片查询成功',skin:'msg',time: 2});
      					//layer.photos({
      					//	photos: '#cameraPics',anim: 1 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
      					//});
      				}else{
      					$.post(GLOBALURL.SHARE_OPENSHARECAMERA_URL,params,function(data){
      						if(data.statusCode == 0){

                    layer.open({content:'摄像头共享申请成功,请等待...',skin:'msg',time: 2});
      							var count = 0;
      							shareTimer = window.setInterval(function(){
      								if(count>15){
      									window.clearInterval(shareTimer);
                        layer.open({content:'摄像头分享失败，请稍后重试!',skin:'msg',time: 2});
      									shareTimer = null;
      								}
      								count ++;
      								queryShareSet(params,shareTimer);
      							},5000);
      						}else if(data.statusCode == -999){
      							//initLoginStatus(queryCamera(e));
      						}else{
                    layer.open({content:data.message,skin: 'msg',time: 2});
      						}
      				    });
      				}
      			}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      	    });
      	}else{
          layer.open({content:'查看摄像头分享请先登录',skin:'msg',time: 2});
      	}
        this.picList = picList;
      },
      // 查看摄像头分享
      queryShareSet:function(params,shareTimer){
        var picList = [];
      	$.post(GLOBALURL.SHARE_QUERYSHARESET_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			if(result && result.length > 0){
      				var html = "";
              for(var i=0;i<result.length;i++){
                var imgUrl = result[i];
                var picName = "照片"+(i+1);
                //html += "<img layer-src="+imgUrl+" src="+imgUrl+" alt="+picName+">";
                picList.push({"src":imgUrl,"title":picName,'w':600,'h':400});
              }
              //$("#cameraPics").html(html);
              $("#cameraNum span").text(result.length);
      				if(result.length>2){
      					window.clearInterval(shareTimer);
                layer.open({content:'摄像头分享照片上传成功',skin:'msg',time: 2});
      					shareTimer = null;
      				}
      				//layer.photos({
      				//	photos:'#cameraPics',anim: 1 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
      				//});
      			}
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	});
        this.picList = picList;
      },

      // 车添加点击监听
      addClickHandler_car:function(marker,paraMap,point,userpk,username,platno,carbrands,time,isOnline,speed,bearing,lng,lat){
        var queryCamera = this.queryCamera;
        var openInfo = this.openInfo;
        var gc = new BMap.Geocoder();
      	gc.getLocation(point, function(rs){
      	    var addComp = rs.addressComponents;
      	    var realAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
      		  var html = "";
      	    html += "<div style='width:12rem;height:auto;'>";
      	    html +=  "<div style='font-size:10pt;width:12rem;margin-left:0px;'>";
      	    html +=  "<span style='margin-right:10px;'><b>"+parseString(platno)+"</b><small style='margin-left:5px;'>"+carbrands+"</small></span>";
      	    html +=  "</div>";
      	    html +=  "<div style='font-size:3pt;border-bottom:1px solid #ff0000;width:12rem;margin-left:0px;'></div>";
      	    html +=  "<table style='font-size:12px;width:14rem;' id='infoWindow'>";
      	    html +=  "	<tbody>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>车&nbsp;&nbsp主&nbsp;&nbsp名：</span>"+username+"</td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>上传时间：</span><span>"+time+"</span></td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>上传地址：</span>"+realAddress+"</td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>当前时速：</span><span>"+Number(speed).toFixed(2)+"km/h</span></td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'><span style='color:#77aabf;font:12px Arial,宋体'>在线状态：</span>"+isOnline+"</td></tr>";
      	    html +=  "		<tr><td style='padding:0px;'>";
      	    html +=  "[<label id='queryCamera' style='color:#0000FF;cursor:pointer' data-pk="+userpk+" data-isOnline="+isOnline+" >请求摄像</label>";
            html +=  "]";
      	    html +=  "      </td></tr>";
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
        var queryCamera = this.queryCamera;
      	var p = e.target;
      	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      	var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象
      	paraMap.openInfoWindow(infoWindow,point); // 开启信息窗口
        $("#queryCamera").click(function(){
          console.log("======2=======");
          queryCamera(this);
        });
      }
  }
}
</script>
