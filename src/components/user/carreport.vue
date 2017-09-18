<template>
<div>
  <header>
      <div class="header">
          <h1>油费报告</h1>
          <router-link slot="left" to="/user/carstatus" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box all_boxNodown">
      <div class="balance">
          <ul id="condition">
              <li style="width:99.5%;"><a class="circle" href="javascript:;">
                <h3>
                <countup :end-val="payMoney" :duration="2" :decimals="2" class="dataNum"></countup>
                </h3><p>总花费(元)</p></a></li>
              <li><a href="javascript:;"><h3>0<span>L</span></h3><p>总油耗</p></a></li>
              <li><a href="javascript:;"><h3>0<span>L/100km</span></h3><p>平均油耗</p></a></li>
              <li style="width:99.5%;"><a href="javascript:;"><h3>0<span>km</span></h3><p>总里程</p></a></li>
          </ul>
      </div>
  </div>

</div>
</template>
<style>
  #condition li{
     width:49.7%;
  }
  #condition h3{
     font-size:1.2rem;
  }
  #condition span{
     font-size:0.8rem;
     vertical-align:top;
  }
  #condition a{
     padding:1.6rem;
  }
  #condition .circle{
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    border: 6px solid #06C1AE;
    margin: 1.8rem auto;
    font-size: 1.6rem;
    color: #06C1AE;
  }
  #condition .dataNum{
    font-size: 1.5rem;
  }
  #condition .circle h3{
    padding-top: 0.8rem;
  }
  #condition .circle p{
    font-size: 0.6rem;
  }
</style>
<script>
  import { Countup } from 'vux'
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'

  export default{
    name: 'Carreport',
    components: {
      Countup
    },
    data(){
      return{
        payMoney:0.00
      }
    },
    created () {
    	var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
    		userInfo = JSON.parse(userInfo);
    		var userpk = userInfo.userpk;
        this.initConditionInfo(userpk);
    	}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },

    methods: {
      // 初始化车况信息
      initConditionInfo:function(userpk){
        var initData = this.initData;
        var payMoney = 0;
      	var params = {
      		"userPK":userpk,
      	};
      	$.post(GLOBALURL.DO_QUERY_OBDREALDATA,params,function(data){
      		if(data.statusCode == 0){
            var result = data.value;
            if(result && result.length>0){
              var oilNum = result[0].comsumptionOil?result[0].comsumptionOil:0;
              $("#condition h3:eq(1)").html(oilNum+"<span>ml</span>");
              $("#condition h3:eq(2)").html((result[0].avgOilPerHundredKM?result[0].avgOilPerHundredKM:0)+"<span>L/100km</span>");
              $("#condition h3:eq(3)").html((result[0].totalMile?result[0].totalMile:0)+"<span>km</span>");
              payMoney = Number(6.47*Number(oilNum)*0.01).toFixed(2);
              initData(payMoney);
            }
      		}else if(data.statusCode == -999){
      		}else{
            layer.open({content:data.messgae,skin:'msg',time: 2});
      		}
      	});
      },
      initData:function(payMoney){
        this.payMoney = Number(payMoney);
      }
    }
}
</script>
