<template>
  <div class="all_box">
	    <!-- 功能板块 -->
	    <div class="big_button">
	    	<div style="width:100%;margin-bottom:8px;">
				<div class="big_rigt_p fl" style="width:33.3333%">
					<a href="javascript:void(0);" @click="pageTurn('',false)"><img class="index-icon micon-menu16" src="./../images/icon_share_news.png" style="margin:0.7rem 1.85rem 0.2rem;" /><h3>资讯</h3></a>
					<div class="ind-bar2"></div>
				</div>
				<div class="big_rigt_p fl" style="width:33.3333%">
					<a href="javascript:void(0);" @click="pageTurn('',false)"><i class="index-icon micon-menu17" style="margin:0.6rem 1.85rem 0;"></i><h3>商家</h3></a>
					<div class="ind-bar2"></div>
				</div>
				<div class="big_rigt_p fl" style="width:33.3333%">
					<a href="javascript:void(0);" @click="pageTurn('',false)"><i class="index-icon micon-menu18" style="margin:0.6rem 1.85rem 0;"></i><h3>论坛</h3></a>
					<div class="ind-bar2"></div>
				</div>
				<div class="cl"></div>
			</div>
	    </div>
		<!-- 分享模块 -->
		<div class="datum-box">
			<ul class="datum-list" >
				<li class="dropdown">
					<a href="javascript:void(0);" data-href="./views/share/ownShare.html" data-login="1">
					<h1 data-toggle="dropdown" class="vtitle" @click="pageTurn('share/ownShare',true)"><i class="ba-color ba-color3 icon-user"></i><b>我的分享</b><span class="icon-uniE926"></span></h1>
					</a>
				</li>
				<li class="dropdown">
					<a  data-href="./views/share/nearShare.html" data-login="0">
						<h1 data-toggle="dropdown" class="vtitle" @click="pageTurn('share/nearShare',false)"><i class="ba-color icon-map-marker"></i><b>附近分享</b><span class="icon-uniE926"></span></h1>
					</a>
				</li>
			</ul>
		</div>
		<!--分享模块end-->
	</div>
</template>

<script>
  import { Group,Cell,Swiper,Scroller,Divider } from 'vux'
  import $ from 'jquery'

  export default{
    name: 'Share',
    data(){
      return{
        driverId:"",
      }
    },
    components:{
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper
    },
    created () {
    },
    methods:{
      pageTurn:function(turnPath,needLogin){
        var userInfo = sessionStorage.getItem("userInfo");
        if(needLogin && !userInfo){
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }else if(turnPath){
          this.$router.replace({path:turnPath})
        }else {
          layer.open({content:'程序猿正在玩命开发中...',skin:'msg',time: 2});
        }
      }
    }
  }
</script>
