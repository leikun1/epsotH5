<template>
<div>
  <header>
      <div class="header">
          <h1>车辆详情</h1>
          <router-link slot="left" to="/user/carstatus" class="return" ><i class="icon-chevron-left"></i></router-link>
          <a @click="tabToggle()" href="javascript:void(0);" class="return shareMap" style="float:right;right:0;left:inherit;"><i class="icon-align-right"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box all_boxNodown cardetail">
      <div class="balance">
          <ul id="condition">
              <li><a href="javascript:;"><h3>0<span>℃</span></h3><p>水温</p></a></li>
              <li><a href="javascript:;"><h3>0<span>v</span></h3><p>电瓶电压</p></a></li>
              <li><a href="javascript:;"><h3>0<span>rpm</span></h3><p>发动机转速</p></a></li>
              <li><a href="javascript:;"><h3>0<span>L/km</span></h3><p>平均耗油</p></a></li>
              <li><a href="javascript:;"><h3>0<span>%</span></h3><p>油量</p></a></li>
              <li><a href="javascript:;"><h3>0<span>km</span></h3><p>累计里程</p></a></li>
          </ul>
      </div>
  </div>

  <div class="firmD-menu cardetail" style="display:none;">
		<ul class="vconlist" id="moreData">
			<li class="firmD-img"><img src="./../../images/user/car_model_01.jpg"></li>
			<li>
				<label>瞬时油量</label>
				<div class="vcon-content"><span>0</span>%</div>
			</li>
			<li>
				<label>油量</label>
				<div class="vcon-content"><span>0</span>%</div>
			</li>
			<li>
				<label>发动机进气温度</label>
				<div class="vcon-content"><span>0</span>℃</div>
			</li>
			<li>
				<label>空调车内温度</label>
				<div class="vcon-content"><span>0</span>℃</div>
			</li>
			<li>
				<label>左前轮轮速</label>
				<div class="vcon-content"><span>0</span>km</div>
			</li>
			<li>
				<label>右前轮轮速</label>
				<div class="vcon-content"><span>0</span>km</div>
			</li>
			<li>
				<label>左后轮轮速</label>
				<div class="vcon-content"><span>0</span>km</div>
			</li>
      <li>
        <label>右后轮轮速</label>
        <div class="vcon-content"><span>0</span>km</div>
      </li>
      <li>
				<label>机油寿命</label>
				<div class="vcon-content"><span>0</span>%</div>
			</li>
      <li>
				<label>机油压力</label>
				<div class="vcon-content"><span>0</span>kpa</div>
			</li>
      <li>
        <label>进气歧管绝对压力</label>
        <div class="vcon-content"><span>0</span>kpa</div>
      </li>
      <li>
        <label>喷油脉宽</label>
        <div class="vcon-content"><span>0</span>ms</div>
      </li>
      <li>
        <label>门踏板相对位置</label>
        <div class="vcon-content"><span>0</span>%</div>
      </li>
      <li>
        <label>油门踏板</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>方向盘转角角度</label>
        <div class="vcon-content"><span>0</span>°</div>
      </li>
      <li>
        <label>方向盘转向角状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>

      <li>
        <label>远光灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>近光灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>宽灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>雾灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左转灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右转灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>危险灯状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左前门开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右前门开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左后门开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右后门开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>后备箱开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>全车锁状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左前门锁状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右前门锁状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左后门锁状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右后门锁状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>后备箱锁状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左前窗开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右前窗开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>左后窗开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>右后窗开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>天窗开启状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>安全气囊状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>手刹状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>脚刹状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>驾驶员安全带状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>副驾安全带状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>钥匙状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>遥控信号</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>雨刮状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>空调状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>档位状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>故障ECM状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>故障ABS状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>故障SRS状态</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>故障机油报警信号</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>故障胎压报警信号</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
      <li>
        <label>故障保养报警信号</label>
        <div class="vcon-content"><span>0</span></div>
      </li>
			<div class="cl"></div>
		</ul>
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
  #moreData{
    font-size: 0.7rem;
  }
  #moreData label{
    text-align:left;
    left:0.4rem;
  }
</style>
<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'

  export default{
    name: 'Cardetail',
    components: {
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
        this.initConditionInfo(userpk);
    	}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },

    methods: {
      // 显示切换
      tabToggle:function(){
         $(".cardetail:eq(0)").toggle();
         $(".cardetail:eq(1)").toggle();
      },
      // 初始化车况信息
      initConditionInfo:function(userpk){
        var formatData = this.formatData;
      	var params = {
      		"userPK":userpk,
      	};
        var loading = layer.open({type: 2});
      	$.post(GLOBALURL.DO_QUERY_OBDDETAILDATA,params,function(data){
      		if(data.statusCode == 0){
            var result = data.value;
            if(result && result.length>0){
              $("#condition h3:eq(0)").html(formatData(result[0].obdwatertemperature,0)+"<span>℃</span>");
              $("#condition h3:eq(1)").html(formatData(result[0].obdbatteryvolt,0)+"<span>V</span>");
              $("#condition h3:eq(2)").html(formatData(result[0].obdrev,0)+"<span>rpm</span>");
              $("#condition h3:eq(3)").html(formatData(result[0].obdavgoilperhundredkm,0)+"<span>L/km</span>");
              $("#condition h3:eq(4)").html(formatData(result[0].obdoilpercent,0)+"<span>%</span>");
              $("#condition h3:eq(5)").html(formatData(result[0].obdtotalmile,0)+"<span>km</span>");
              var oBDSubData = result[0].oBDSubData;
              if(oBDSubData){
                $("#moreData .vcon-content:eq(0) span").html(formatData(oBDSubData.tempoilpercent,0));
                $("#moreData .vcon-content:eq(1) span").html(formatData(oBDSubData.oilpercent,0));
                $("#moreData .vcon-content:eq(2) span").html(formatData(oBDSubData.engineairtemperate,0));
                $("#moreData .vcon-content:eq(3) span").html(formatData(oBDSubData.incartemperate,0));
                $("#moreData .vcon-content:eq(4) span").html(formatData(oBDSubData.lfrontwheelspeed,0));
                $("#moreData .vcon-content:eq(5) span").html(formatData(oBDSubData.rfrontwheelspeed,0));
                $("#moreData .vcon-content:eq(6) span").html(formatData(oBDSubData.lbehindwheelspeed,0));
                $("#moreData .vcon-content:eq(7) span").html(formatData(oBDSubData.rbehindwheelspeed,0));
                $("#moreData .vcon-content:eq(8) span").html(formatData(oBDSubData.engineoillife,0));
                $("#moreData .vcon-content:eq(9) span").html(formatData(oBDSubData.enginepressure,0));
                $("#moreData .vcon-content:eq(10) span").html(formatData(oBDSubData.manifoldabspressure,0));
                $("#moreData .vcon-content:eq(11) span").html(formatData(oBDSubData.injectionpulse,0));
                $("#moreData .vcon-content:eq(12) span").html(formatData(oBDSubData.oilpedalabsPos,0));
                $("#moreData .vcon-content:eq(13) span").html(formatData(oBDSubData.oilpedalstatus,8));
                $("#moreData .vcon-content:eq(14) span").html(formatData(oBDSubData.steeringangle,0));
                $("#moreData .vcon-content:eq(15) span").html(formatData(oBDSubData.steeringstatus,9));
              }
              var oBDStatusData = result[0].oBDStatusData;
              if(oBDStatusData){
                $("#moreData .vcon-content:eq(16) span").html(formatData(oBDStatusData.highBeamStatus,1));
                $("#moreData .vcon-content:eq(17) span").html(formatData(oBDStatusData.dipBeamStatus,1));
                $("#moreData .vcon-content:eq(18) span").html(formatData(oBDStatusData.widthLampStatus,1));
                $("#moreData .vcon-content:eq(19) span").html(formatData(oBDStatusData.fogLampStatus,1));
                $("#moreData .vcon-content:eq(20) span").html(formatData(oBDStatusData.signalLeftStatus,1));
                $("#moreData .vcon-content:eq(21) span").html(formatData(oBDStatusData.signalRightStatus,1));
                $("#moreData .vcon-content:eq(22) span").html(formatData(oBDStatusData.signalDangerStatus,1));
                $("#moreData .vcon-content:eq(23) span").html(formatData(oBDStatusData.lFDoorOpenStatus,1));
                $("#moreData .vcon-content:eq(24) span").html(formatData(oBDStatusData.rFDoorOpenStatus,1));
                $("#moreData .vcon-content:eq(25) span").html(formatData(oBDStatusData.lBDoorOpenStatus,1));
                $("#moreData .vcon-content:eq(26) span").html(formatData(oBDStatusData.rBDoorOpenStatus,1));
                $("#moreData .vcon-content:eq(27) span").html(formatData(oBDStatusData.trunkOpenStatus,1));
                $("#moreData .vcon-content:eq(28) span").html(formatData(oBDStatusData.wholeCarLockStatus,2));
                $("#moreData .vcon-content:eq(29) span").html(formatData(oBDStatusData.lFDoorLockStatus,2));
                $("#moreData .vcon-content:eq(30) span").html(formatData(oBDStatusData.rFDoorLockStatus,2));
                $("#moreData .vcon-content:eq(31) span").html(formatData(oBDStatusData.lBDoorLockStatus,2));
                $("#moreData .vcon-content:eq(32) span").html(formatData(oBDStatusData.rBDoorLockStatus,2));
                $("#moreData .vcon-content:eq(33) span").html(formatData(oBDStatusData.trunkLockStatus,2));
                $("#moreData .vcon-content:eq(34) span").html(formatData(oBDStatusData.lFWinOpenStatus,1));
                $("#moreData .vcon-content:eq(35) span").html(formatData(oBDStatusData.rFWinOpenStatus,1));
                $("#moreData .vcon-content:eq(36) span").html(formatData(oBDStatusData.lBWinOpenStatus,1));
                $("#moreData .vcon-content:eq(37) span").html(formatData(oBDStatusData.rBWinOpenStatus,1));
                $("#moreData .vcon-content:eq(38) span").html(formatData(oBDStatusData.skyWinOpenStatus,1));
                $("#moreData .vcon-content:eq(39) span").html(formatData(oBDStatusData.safetyAirBagStatus,3));
                $("#moreData .vcon-content:eq(40) span").html(formatData(oBDStatusData.handBrakeStatus,4));
                $("#moreData .vcon-content:eq(41) span").html(formatData(oBDStatusData.footBrakeStatus,4));
                $("#moreData .vcon-content:eq(42) span").html(formatData(oBDStatusData.driverBeltStatus,5));
                $("#moreData .vcon-content:eq(43) span").html(formatData(oBDStatusData.drivingBeltStatus,5));
                $("#moreData .vcon-content:eq(44) span").html(formatData(oBDStatusData.keyStatus,6));
                $("#moreData .vcon-content:eq(45) span").html(formatData(oBDStatusData.remoteCtrlStatus,10));
                $("#moreData .vcon-content:eq(46) span").html(formatData(oBDStatusData.wiperStatus,1));
                $("#moreData .vcon-content:eq(47) span").html(formatData(oBDStatusData.airConditionerStatus,1));
                $("#moreData .vcon-content:eq(48) span").html(formatData(oBDStatusData.stallStatus,11));
                $("#moreData .vcon-content:eq(49) span").html(formatData(oBDStatusData.eCMStatus,7));
                $("#moreData .vcon-content:eq(50) span").html(formatData(oBDStatusData.aBSStatus,7));
                $("#moreData .vcon-content:eq(51) span").html(formatData(oBDStatusData.sRSStatus,7));
                $("#moreData .vcon-content:eq(52) span").html(formatData(oBDStatusData.engineOilStatus,7));
                $("#moreData .vcon-content:eq(53) span").html(formatData(oBDStatusData.tirePressureStatus,7));
                $("#moreData .vcon-content:eq(54) span").html(formatData(oBDStatusData.maintainStatus,7));
              }

            }
      		}else if(data.statusCode == -999){
      		}else{
            layer.open({content:data.messgae,skin:'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	});
      },
      // 格式数据
      formatData:function(dataValue,dataType){
        var steerData = {"1":"左","2":"右","3":"中"};
        var controlData = {"0":"未按","1":"开锁","2":"关锁","3":"尾箱锁","4":"长按开锁","5":"长按关锁"};
        var stallData = {"1":"P档","2":"R档","3":"N档","4":"D档"};
        var result = "--";
        //if(result){
          if(dataType == 0){
            result = dataValue?dataValue:"0";
          }else if(dataType == 1){
            result = (dataValue==1)?"打开":"关闭";
          }else if(dataType == 2){
            result = (dataValue==1)?"锁":"未锁";
          }else if(dataType == 3){
            result = (dataValue==1)?"引爆":"正常";
          }else if(dataType == 4){
            result = (dataValue==1)?"制动":"未制动";
          }else if(dataType == 5){
            result = (dataValue==1)?"扣":"未扣";
          }else if(dataType == 6){
            result = (dataValue==1)?"插入":"未插入";
          }else if(dataType == 7){
            result = (dataValue==1)?"故障":"正常";
          }else if(dataType == 8){
            result = (dataValue==1)?"踩下":"未踩";
          }else if(dataType == 9){
            result = steerData[dataValue]?steerData[dataValue]:"--";
          }else if(dataType == 10){
            result = controlData[dataValue]?controlData[dataValue]:"--";
          }else if(dataType == 11){
            result = stallData[dataValue]?stallData[dataValue]:"--";
          }
        //}
        return result;
      }
    }
}
</script>
