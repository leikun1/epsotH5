<template>
<div>
  <header>
      <div class="header">
          <h1>群地图</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div id="container">
		<div id="mapContent"  style="width:100%;height:35rem;"></div>
	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import OFFLINE_PIC from './../../images/map/icon_car_offline.png'
  import ONLINE_PIC from './../../images/map/icon_car_online.png'
  import PERSONAL_PIC from './../../images/map/icon_car_personal.png'
  import { parseString,initLoginStatus } from './../../utils/utils'

  var _prepath = "";
  var map = null;
  var isMoveTo = true; // 是否移动到自己位置处

  export default{
    name: 'GroupMap',
    components: {
    },
    data(){
      return{
      }
    },
    mounted(){
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

        var groupPk = this.$route.query.groupPk;
        this.initUserLocation(groupPk);
    },
    created () {
      _prepath = sessionStorage.getItem("_prepath");
    },
    methods: {
      // 返回上一页
      pageBack:function(){
        if(_prepath){
          this.$router.replace({path:_prepath});
        }else{
          this.$router.replace({path:"/home?modelIndex=1"});
        }
      },
      // 初始化群组成员信息
      initUserLocation:function(groupPk){
        var initUserLocation = this.initUserLocation;
        var addClickHandler_car = this.addClickHandler_car;
      	var userInfo = sessionStorage.getItem("userInfo");
      	var currUserpk = "";
      	if(userInfo) {
      	   userInfo = JSON.parse(userInfo);
      	   currUserpk = userInfo.userpk;
      	}
      	var params = {
      		"groupPk":groupPk
      	};
      	$.post(GLOBALURL.GET_GROUP_USER_STATUS,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
      					var lat = result[i].latitude;
      					var lng = result[i].longtitude;
      					var sendtime = result[i].sendtime;
      					var driverName = result[i].driverName;
      					var isOnline = result[i].isOnline;
      					var userpk = result[i].driverId;
      				  if(lng && lat && Number(lng)!="0" &&  Number(lat)!="0"){
      						var pt = new BMap.Point(lng, lat);
      						var speed = result[i].speed;
                  var imgUrl = "";
      						if(isOnline == 0 || isOnline == 2){
      						   imgUrl = OFFLINE_PIC;
      						   isOnline = "不在线";
      						}else{
      						   imgUrl = ONLINE_PIC;
      						   isOnline = "在线";
      						}
      						if(currUserpk == userpk){
      						   imgUrl = PERSONAL_PIC;
      						   if(isMoveTo){
      							   map.panTo(pt);
      							   isMoveTo = false;
      						   }
      						}
      						var icon = new BMap.Icon(imgUrl, new BMap.Size(20,36),{anchor:new BMap.Size(27, 13)});
      						var marker = new BMap.Marker(pt,{icon:icon}); // 创建标注
      						map.addOverlay(marker);
      						addClickHandler_car(marker,map,pt,userpk,driverName,sendtime,isOnline,speed,lng,lat);
      					}
      				}
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initUserLocation(groupPk));
      		}else{
            layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      },

      // 车添加点击监听
      addClickHandler_car:function(marker,paraMap,point,userpk,username,sendtime,isOnline,speed,lng,lat){
          var openInfo = this.openInfo;
          var gc = new BMap.Geocoder();
      	  gc.getLocation(point, function(rs){
      	    var addComp = rs.addressComponents;
      	    var realAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
      		  var html = "";
      	    html += "<div style='width:12rem;height:auto;'>";
      	    html +=  "<div style='font-size:10pt;width:12rem;margin-left:0px;'>";
      	    html +=  "<span style='margin-right:10px;'><b>"+username+"</b></span>";
      	    html +=  "</div>";
      	    html +=  "<div style='font-size:3pt;border-bottom:1px solid #ff0000;width:12rem;margin-left:0px;'></div>";
      	    html +=  "<table style='font-size:12px;width:14rem;' id='infoWindow'>";
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
      }
    }
}
</script>
