<template>
<div>
  <header>
      <div class="header">
          <h1>车机控制</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box">
		<!-- 控制模块 -->
		<div class="datum-box">
			<ul class="datum-list">
				<!--<li class="dropdown">
					<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color3 icon-tablet"></i><b>同步车机界面切换</b><i class="micon-on" id="synBtn"></i></h1>
				</li> -->
				<li class="dropdown">
					<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color3 icon-volume-up"></i><b>车机音量</b></h1>
					<p>
						<span @click="synControll('volume','down')" class="controllBtn" data-action="down" data-order="volume"><i class="ba-color8 icon-volume-down" style="font-size:1.0rem;padding:0 0.2rem 0 0;"></i>音乐减</span>
						<span @click="synControll('volume','up')" class="controllBtn" data-action="up" data-order="volume"><i class="ba-color8 icon-volume-up" style="font-size:0.9rem;padding:0 0.2rem 0 0;"></i>音乐增</span>
					</p>
				</li>
				<li class="dropdown">
					<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color3 icon-music"></i><b>车机音乐</b></h1>
					<p>
						<span @click="synControll('program','skip2previous')" class="controllBtn" data-action="skip2previous" data-order="program"><i class="ba-color8 icon-step-backward" style="padding:0 0.2rem 0 0;"></i>上一曲</span>
						<span @click="synControll('program','skip2next')" class="controllBtn" data-action="skip2next" data-order="program"><i class="ba-color8  icon-step-forward" style="padding:0 0.2rem 0 0;"></i>下一曲</span>
					</p>
					<p>
						<span @click="synControll('program','playback')" class="controllBtn" data-action="playback" data-order="program"><i class="ba-color8 icon-play" style="font-size:0.7rem;padding:0 0.2rem 0 0;"></i>播&nbsp;&nbsp;&nbsp;&nbsp;放</span>
						<span @click="synControll('program','pause')" class="controllBtn" data-action="pause" data-order="program"><i class="ba-color8 icon-stop" style="font-size:0.7rem;padding:0 0.2rem 0 0;" ></i>停&nbsp;&nbsp;&nbsp;&nbsp;止</span>
					</p>
				</li>
			</ul>
		</div>
		<!--控制模块end-->
	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var userpk = "";

  export default{
    name: 'Violations',
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
        userpk = userInfo.userpk;
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 车机播放
      synControll:function(order,operation){
        var synControll = this.synControll;
      	var loading = layer.open({type: 2});
      	var params = {
      		"driverId":userpk,
      		"order":order,
      		"operation":operation,
      		"content":""
      	};
      	$.post(GLOBALURL.GLOBAL_ORDER,params,function(data){
      		if(data.statusCode == 0){
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}else if(data.statusCode == -999){
      			//initLoginStatus(synControll(userpk,order,operation));
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	});
      }
    }
}
</script>
