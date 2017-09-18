<template>
<div>
  <header>
      <div class="header">
          <h1>行车记录</h1>
          <router-link slot="left" to="/user/carstatus" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div id="container" class="">
		<!-- 头部选择项 -->
		<div class="firmL-nav">
			<ul class="firmL-nav-U myassociation-nav">
				<li  style="width:100%;" :class="{active:isActive}">
					<span class="queryType" @click="isActive=!isActive"><strong data-type="0">日里程</strong><i class="icon-chevron-down" style="padding:0 0.4rem;"></i></span>
					<div class="firmLBox">
						<div class="firmLText">
                    <p class="active" data-type="0" @click="queryData('0','日里程')">日里程</p>
                    <p data-type="1" @click="queryData('1','周里程')">周里程</p>
          					<p data-type="2" @click="queryData('2','月里程')">月里程</p>
							      <p data-type="3" @click="queryData('3','年里程')">年里程</p>
						</div>
						<div class="firmLBg"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<div class="userMyactivity-tab" style="margin-top:1.6rem;">
     <ul class="userMy-content">
         <li class="tab_content show">
         	<ul class="userMy-list userMy-paid userMy-not" id="carsMileage">
         	</ul>
         </li>
     </ul>
	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var userpk = ""

  export default{
    name: 'Carrecord',
    components: {
    },
    data(){
      return{
        isActive:false
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userpk = userInfo.userpk;
        this.initCarsMileage(); // 初始化个人里程信息
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      queryData:function(queryType,queryName){
        $(".queryType strong").text(queryName);
        $(".queryType strong").attr("data-type",queryType);
        this.initCarsMileage();
        this.isActive = !this.isActive;
        $(".firmLText p:eq("+(queryType)+")").toggleClass('active').siblings().removeClass('active');
      },

      // 初始化个人里程信息
      initCarsMileage:function(){
        var initCarsMileage = this.initCarsMileage;
      	var queryType = $(".queryType strong").attr("data-type");
      	var params ={
      		"queryType":queryType?queryType:"0",
      		"userPk":userpk,
      		"beginTime":"",
      		"endTime":"",
      		"queryNum":30,
      		"beginNum":0
      	};
      	$.post(GLOBALURL.TRAFFIC_CARMILEAGE_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		    if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
      					html += "<li class=\"MyacLi\">";
      					html += "<div class=\"Myacticity\">";
      					html += "<div class=\"userMy-firm listinfo\">";
      					html += "   <p><span class=\"leftinfo\">行驶时间：<small>"+result[i].times+"</small></span><span>行驶耗油：<small>--(升)</small></span></p>";
      					html += "	<p><span class=\"leftinfo\">行驶里程：<small>"+result[i].carsMileageNum+"(公里)</small></span><span>平均耗油：<small>--(L/100KM)</small></span></p>";
      					html += "	<p><span class=\"leftinfo\">行驶时间：<small>"+(Number(result[i].drivingTime)/60000).toFixed(0)+"(分钟)	</small></span><span>平均车速：<small>"+Number(result[i].averageSpeed).toFixed(2)+"(KM/H)</small></span></p>";
      					html += "</div>";
      					html += "</div>";
      					html += "</li>";
      				}
      		    }else{
      				html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
      			}
      		    $("#carsMileage").html(html);
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initCarsMileage());
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      }
    }
}
</script>
