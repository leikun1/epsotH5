<template>
<div>
  <header>
      <div class="header">
          <h1>分享地图</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div id="container">
		<!-- 头部选择项 -->
		<div class="firmL-nav">
			<ul class="firmL-nav-U myassociation-nav">
				<li class="" style="width:33.3%;">
					<span class="queryType" @click="tabType(0)"><strong data-type="">分享类型</strong><i class="icon-chevron-down" style="padding:0 0.4rem;"></i></span>
					<div class="firmLBox">
						<div class="firmLText">
              <p @click="queryData('','不限',0)" class="active" data-type="" data-key="分享类型">不限</p>
          		<p @click="queryData(1,'视频',0)" data-type="1" data-key="视频">视频</p>
							<p @click="queryData(2,'图片',0)" data-type="2" data-key="图片">图片</p>
						</div>
						<div class="firmLBg" @click="tabHide(0)"></div>
					</div>
					<div class="bar"></div>
				</li>
				<li class="" style="width:33.3%;">
					<span class="queryStatus" @click="tabType(1)"><strong data-type="">分享状态</strong><i class="icon-chevron-down" style="padding:0 0.4rem;"></i></span>
					<div class="firmLBox">
						<div class="firmLText">
              <p @click="queryData('','不限',1)" accesskey=""class="active" data-type="" data-key="分享状态">不限</p>
          		<p @click="queryData(0,'未发布',1)" data-type="0" data-key="未发布">未发布</p>
							<p @click="queryData(1,'已发布',1)" data-type="1" data-key="已发布">已发布</p>
						</div>
						<div class="firmLBg" @click="tabHide(1)"></div>
					</div>
					<div class="bar"></div>
				</li>
				<li class="" style="width:33.3%;">
					<span class="queryLable" @click="tabType(2)"><strong data-type="">分享标签</strong><i class="icon-chevron-down" style="padding:0 0.4rem;"></i></span>
					<div class="firmLBox">
						<div class="firmLText">
              <p @click="queryData('','不限',2)" class="active" data-type="" data-key="分享标签">不限</p>
          		<p @click="queryData(1,'违章',2)" data-type="1" data-key="违章">违章</p>
							<p @click="queryData(2,'事故',2)" data-type="2" data-key="事故">事故</p>
							<p @click="queryData(3,'堵车',2)" data-type="3" data-key="堵车">堵车</p>
							<p @click="queryData(4,'碰瓷',2)" data-type="4" data-key="碰瓷">碰瓷</p>
							<p @click="queryData(5,'风景',2)" data-type="5" data-key="风景">风景</p>
							<p @click="queryData(6,'趣事',2)" data-type="6" data-key="趣事">趣事</p>
							<p @click="queryData(7,'其他',2)" data-type="7" data-key="其他">其他</p>
						</div>
						<div class="firmLBg" @click="tabHide(2)"></div>
					</div>
				</li>
			</ul>
		</div>
		<!-- 头部选择项 end-->
		<div id="mapContent" style="width:100%;height:100%;top:2.5rem;"></div>
	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import MAKER_SHARE from './../../images/map/maker_share.png'
  import { initLoginStatus } from '../../utils/utils'

  var locusMap = null;
  var userPk = "";
  var sharesetPk = "";
  var _prepath = "";

  export default{
    name: 'Findcar',
    components: {
    },
    data(){
      return{
      }
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

        // 参数信息
        sharesetPk = this.$route.query.sharesetPk;
      	userPk = this.$route.query.userPk;
      	if(sharesetPk){
          console.log("---");
      		$(".firmL-nav").hide();
      		$("#mapContent").css("top","0");
      	}
        this.initShareLocation();
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
          this.$router.replace({path:"/home?modelIndex=3"});
        }
      },

      tabType:function(tabIndex){
        $(".firmL-nav-U li:eq("+tabIndex+")").toggleClass('active').siblings().removeClass('active');
      },

      tabHide:function(tabIndex){
        $(".firmL-nav-U li:eq("+tabIndex+")").toggleClass('active');
      },

      queryData:function(queryType,queryName,tabIndex){
        $(".firmL-nav-U li:eq("+tabIndex+") strong").text(queryName);
        $(".firmL-nav-U li:eq("+tabIndex+") strong").attr("data-type",queryType);
        if(tabIndex == 1){
          queryType = queryType?(queryType+1):0;
          $(".firmL-nav-U li:eq("+tabIndex+") .firmLText p:eq("+(queryType)+")").toggleClass('active').siblings().removeClass('active');
        }else{
          queryType = queryType?queryType:0;
          $(".firmL-nav-U li:eq("+tabIndex+") .firmLText p:eq("+(queryType)+")").toggleClass('active').siblings().removeClass('active');
        }
        $(".firmL-nav-U li:eq("+tabIndex+")").toggleClass('active');
        this.initShareLocation();
      },
      // 初始化分享位置
      initShareLocation:function(){
        var initShareLocation = this.initShareLocation;
        var addClickHandler_share = this.addClickHandler_share;
      	var queryType = $(".queryType strong").attr("data-type");
      	var queryLable = $(".queryLable strong").attr("data-type");
      	var queryStatus = $(".queryStatus strong").attr("data-type");
        var params = {
      			userPK:userPk,
      			shareSetPK:sharesetPk,
      			queryNum:"20",
      			beginNum:"",
      			queryType:queryType,
      			queryLable:queryLable,
      			shareStatus:queryStatus,
      			currentPage:"1"  //当前页数
      	};
      	$.post(GLOBALURL.SHARE_JOURNEYSHARE_URL,params,function(data){
      		if(data.statusCode == 0){
      			locusMap.clearOverlays();
      			var result = data.value;
      		    if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
      					var lng = Number(result[i].sharesetspiass[0].shareprograminfo.sharelongtitude)+0.0065;
      				    var lat = Number(result[i].sharesetspiass[0].shareprograminfo.sharelaititude)+0.006;
      				    var imgUrl = result[i].sharesetspiass[0].shareprograminfo.shareimageurl;
      				    var views = result[i].sharesetviewtimes;
      				    var content = result[i].sharesetcontent;
      				    var title = result[i].sharesettitle;
      				    var time = result[i].sharesettime;
      				    var sharesetpk = result[i].sharesetpk;
      				    var name = result[i].users.userinfo.userinfoname;
      				    var userpk = result[i].users.userpk;
      				    var sharesetUrl = "#/share/shareDetail?sharesetPk="+sharesetpk;
      				    var pt = new BMap.Point(lng, lat);
                  if(i == 0){
                    locusMap.panTo(pt);
                  }
      				    var icon = new BMap.Icon(MAKER_SHARE, new BMap.Size(26,25),{anchor:new BMap.Size(20, 13)});
      				    var marker = new BMap.Marker(pt,{icon:icon}); // 创建标注
      				    locusMap.addOverlay(marker);
      				    addClickHandler_share(marker,locusMap,title,time,pt,imgUrl,name,sharesetUrl);
      				}
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initShareLocation());
      		}else{
      			layer.open({content:data.message,skin:'msg',time: 2});
      		}
      	},"json");
      },

      // 分享添加监听
      addClickHandler_share:function(marker,paraMap,title,time,point,imgUrl,name,sharesetUrl){
          var openInfo = this.openInfo;
          var gc = new BMap.Geocoder();
          gc.getLocation(point, function(rs){
      	  var addComp = rs.addressComponents;
      	  var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
      		var html = "";
      		html += "<div style='width:4.5rem;height:auto;'>";
      		html += "<div style='overflow:hidden;height:auto;line-height:24px;white-space:nowrap;width:11rem;'>";
      		html += "	<div style='height:26px;'>";
      		html += "		<a href='javascript:void(0)' style='font-size:14px;color:#4d4d4d;font-weight:bold;text-decoration:none;'>"+title+"</a>";
      		html += "		<a href='"+sharesetUrl+"' style='font-size:12px;color:#3d6dcc;margin-left:5px;text-decoration:none;' onmouseover='this.style.textDecoration=&quot;underline&quot;' onmouseout='this.style.textDecoration=&quot;none&quot;'>详情»</a>";
      		html += "	</div>";
      		html += "</div>";
      		html += "<div style='width:11rem;height:auto;'>";
      		html += "	<div style='font-size:12px;padding:5px 0px;overflow:hidden;'>";
      		html += "		<div class='panoInfoBox' style='width:11rem;height:7.5rem;'>";
      		html += "			<img class='pano_thumnail_img' style='width:11rem;height:7.5rem;border:0;' src='"+imgUrl+"'>";
      		html += "			<div class='panoInfoBoxTitleBg'></div>";
      		html += "			<a href='"+sharesetUrl+"' class='panoInfoBoxTitleContent'>查看详情&gt;&gt;</a>";
      		html += "		</div>";
      		html += "		<p style='padding:0px;margin:0px;line-height:18px;font-size:12px;color:rgb(77, 77, 77);'>地址："+address+"</p>";
      		html += "		<p style='padding:0px;margin:0px;line-height:18px;font-size:12px;color:rgb(77, 77, 77);'>时间："+time+"</p>";
      		html += "		<p style='padding:0px;margin:0px;line-height:18px;font-size:12px;color:rgb(77, 77, 77);'>分享人："+name+"</p>";
      		html += "	</div>";
      		html += "</div>";
      		html += "</div>";
      		marker.addEventListener("click",function(e){
      			openInfo(html,paraMap,e);
      		});
          });
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
      }
  }
}
</script>
