<template>
<div>
  <header>
      <div class="header">
          <h1>我的车况</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 个人信息 -->
	<div class="firmDetails" id="userinfo">
		<div class="firmD-head">
			<img class="userPic" :src="picurl">
			<div class="fD-text">
				<p class="carBrand" style="font-size:0.9rem;font-weight:600;">{{carBrand}}</p>
        <span class="totalMile">总行程--km</span>
			</div>
		</div>
    <div class="datum-box">
  		<ul class="datum-list">
  			<li class="dropdown" style="border-top:12px solid #f0eeee;">
  				<a href="javascript:void(0);" @click="pageTurn('../user/carcheck',true)">
  				<h1 data-toggle="dropdown" class="vtitle"><i class="index-icon micon-car-check"></i><b>全车体检</b><span class="icon-angle-right"></span></h1>
  				</a>
  			</li>
  			<li class="dropdown">
  				<a href="javascript:void(0);" @click="pageTurn('../user/cardetail',true)">
  					<h1 data-toggle="dropdown" class="vtitle"><i class="index-icon micon-car-detail"></i><b>车辆详情</b><span class="icon-angle-right"></span></h1>
  				</a>
  			</li>
  			<li class="dropdown" style="border-top:12px solid #f0eeee;">
  				<a href="javascript:void(0);" @click="pageTurn('../user/carrecord',true)">
  				<h1 data-toggle="dropdown" class="vtitle"><i class="index-icon micon-car-record"></i><b>行车记录</b><span class="icon-angle-right"></span></h1>
  				</a>
  			</li>
  			<li class="dropdown">
  				<a href="javascript:void(0);" @click="pageTurn('../user/carreport',true)">
  					<h1 data-toggle="dropdown" class="vtitle"><i class="index-icon micon-car-report"></i><b>油费报告</b><span class="icon-angle-right"></span></h1>
  				</a>
  			</li>
  		</ul>
  	</div>
	</div>
</div>
</template>
<style>

</style>
<script>
  import GLOBALURL from './../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  import CARLOGO from './../../images/user/carlogo.png'
  export default{
    name: 'Carstatus',
    components: {
    },
    data(){
      return{
        picurl:CARLOGO,
        carBrand:""
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      var userpk = "";
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userpk = userInfo.userpk;
        this.carBrand = userInfo.userinfo.userinfoname;
        this.initOBDInfo(userpk);
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      pageTurn:function(turnPath,needLogin){
         this.$router.replace({path:turnPath});
      },
      // 初始化车况信息
      initOBDInfo:function(userpk){
        var params = {
          "userPK":userpk,
        };
        $.post(GLOBALURL.DO_QUERY_OBDREALDATA,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            if(result && result.length>0){
              $(".totalMile").html("总里程"+(result[0].totalMile?result[0].totalMile:"--")+"km");
            }
          }else if(data.statusCode == -999){
          }else{
            layer.open({content:data.messgae,skin:'msg',time: 2});
          }
        });
      }
    }
}
</script>
