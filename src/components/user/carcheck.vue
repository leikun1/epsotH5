<template>
<div>
  <header>
      <div class="header">
          <h1>全车体检</h1>
          <router-link slot="left" to="/user/carstatus" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box all_boxNodown">
    <div class="picscan">
        <div class="line"></div>
        <div style="margin-top:3rem;">
          <span class="showinfo left_top"><i class="ba-color5 icon-ok-sign" data-id="">动力系统</i></span><span class="showinfo right_top"><i class="ba-color5 icon-ok-sign" data-id="">底盘系统</i></span>
          <img src="./../../images/user/car_model_03.png" alt="">
          <span class="showinfo left_bottom"><i class="ba-color5 icon-ok-sign" data-id="">车身系统</i></span><span class="showinfo right_bottom"><i class="ba-color5 icon-ok-sign" data-id="">电器设备</i></span>
          <span class="showinfo left_bottom_last"><i class="ba-color5 icon-ok-sign" data-id="">电器设备</i></span>
        </div>
    </div>
    <a href="javascript:;" class="btn btn-max" style="width:60%;margin:2.5rem 20%;background-color:#06C1AE;" @click="carSystem()">
      <spinner id="loading" type="ripple" slot="ripple" style="stroke:#fff;fill:#fff;"></spinner><span id="describe">正在扫描...</span>
    </a>
  </div>

</div>
</template>
<style>
.showinfo{
  width: 4.3rem;
}
.showinfo i{
  display: none;
  font-weight:600;
}
.showinfo i{
  display: none;
}
.left_top{
  float:left;margin:5rem 0 0 0.3rem;
}
.right_top{
  float:right;margin:5rem 0.3rem 0 0;
}
.left_bottom{
  float:left;margin:-9rem 0 0 0.3rem;
}
.right_bottom{
  float:right;margin:-9rem 0.3rem 0 0;
}
.left_bottom_last{
  float:left;margin:-5rem 0 0 0.3rem;
}
</style>
<script>
  import { Spinner } from 'vux'
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  let carSystem = [];
  let FLAG = 0;
  export default{
    name: 'Carcheck',
    components: {
      Spinner
    },
    data(){
      return{
      }
    },
    created () {
    	var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
    		userInfo = JSON.parse(userInfo);
    		var userpk = userInfo.userpk;
        this.initOBDTroubleInfo(userpk);
    	}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },

    methods: {
      initCarData:function(){
        setTimeout(function(){
          $(".left_top i").fadeIn();
        },1000);
        setTimeout(function(){
          $(".right_top i").fadeIn();
        },2000);
        setTimeout(function(){
          $(".left_bottom i").fadeIn();
        },3000);
        setTimeout(function(){
          $(".right_bottom i").fadeIn();
        },4000);
        setTimeout(function(){
          $(".left_bottom_last i").fadeIn();
        },5000);
        setTimeout(function(){
          $(".line").fadeOut();
          $("#loading").fadeOut();
          if(FLAG==0){
            $("#describe").text("恭喜您,暂未发现故障！");
          }else{
            $("#describe").text("查看详情");
          }
        },5000);
      },
      // 查看车系统
      carSystem:function(){
        var describe = $("#describe").text();
        if(describe == '查看详情'){
          this.$router.replace({path:"../user/carSystem"});
        }
      },
      // 初始化车况故障信息
      initOBDTroubleInfo:function(userpk){
        var initOBDNewTrouble = this.initOBDNewTrouble;
      	var params = {
          "level":"0",
          "status":"1"
      	};
      	$.post(GLOBALURL.DO_QUERY_OBDTROUBLELIST,params,function(data){
      		if(data.statusCode == 0){
            var result = data.value;
            if(result && result.length>0){
              carSystem = [];
              for(var i=0;i<result.length;i++){
                var trobleName = result[i].obdtroublecodetypename;
                var troubleId =  result[i].obdtroublecodetypepk;
                $(".showinfo:eq("+(result.length-1-i)+") i").text(trobleName);
                $(".showinfo:eq("+(result.length-1-i)+") i").attr("data-id",troubleId);
                carSystem.push(result[i].obdtroublecodetypepk);
              }
              initOBDNewTrouble(userpk);
            }
      		}else if(data.statusCode == -999){
      		}else{
            layer.open({content:data.messgae,skin:'msg',time: 2});
      		}
      	});
      },
      initOBDNewTrouble:function(userpk){
        let initCarData = this.initCarData();
        var params = {
          "userPK":userpk,
        };
        $.post(GLOBALURL.DO_QUERY_OBDNEWTROUBLE,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            FLAG = 0;
            if(result && result.length>0){
              for(var i=0;i<result.length;i++){
                var trobleType = result[i].obdtroublecodetypeancpk;
                for(var j=0;j<carSystem.length;j++){
                  if(trobleType == carSystem[j]){
                    $(".showinfo  i[data-id='"+trobleType+"']").attr("class","ba-color1 icon-exclamation-sign");
                    FLAG ++;
                  }
                }
              }
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
