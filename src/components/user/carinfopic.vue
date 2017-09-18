<template>
<div>
  <header>
      <div class="header">
          <h1>车辆防盗</h1>
          <router-link slot="left" to="/user/usercenter" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box carinfoPic"></div>
</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import { initLoginStatus } from '../../utils/utils'

  export default{
    name: 'Carinfopic',
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
        this.initCarinfopic(userpk);
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 初始化防盗信息照片
    	initCarinfopic:function(userpk){
          var initCarinfopic = this.initCarinfopic;
    		  var loading = layer.open({type: 2});
    	    var params = {
        		driverId:userpk,
        		requestId:userpk,
        		latitude:"",
        		longtitude:"",
        		startTime:"",
        		endTime:"",
        		shareSetStatus:"2",
        		platform:"3"
    		 };
    		 $.post(GLOBALURL.SHARE_PICSHARESET_URL,params,function(data){
    			if(data.statusCode == 0){
    				var result = data.value;
    				var html = "";
    			    if(result && result.length>0){
    					var defImage = "./../../images/epsot_logo.jpg";
    					for(var i=0;i<result.length;i++){
    						var shareImg = result[i].shareprogram[0].imageUrl;
    						shareImg = shareImg?shareImg:defImage;
    						var cameraId = "cameraPics"+i;
    						html += "<div class=\"card_ecchange plus-pass\" data-pk="+result[i].sharesetpk+">";
    						html += "	<i class=\"images_card\"><img src="+shareImg+"></i>";
    						html += "	<div id="+cameraId+" class=\"cameraPics\">";
    						for(var j=0;j<result[i].shareprogram.length;j++){
    							html += "<img layer-pid='"+result[i].shareprogram[j].id+"' layer-src='"+result[i].shareprogram[j].imageUrl+"' src='"+result[i].shareprogram[j].imageUrl+"' alt='"+result[i].shareprogram[j].name+"'>";
    						}
    						html += "	</div>";
    						html += "	<h1>"+result[i].title+"</h1>";
    						html += "	<p>"+result[i].time+"</p>";
    						html += "	<p>"+result[i].shareprogram[0].address+"</p>";
    						html += "</div>";
    					}
    				}else{
    					html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
    				}
    				$(".carinfoPic").html(html);

    				for(var k=0;k<result.length>0;k++){
    					var cameraId = "#cameraPics"+k;
    					layer.photos({
    						photos: cameraId,anim: 2 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    					});
    				}
    			}else if(data.statusCode == -999){
    				 //initLoginStatus(initCarinfopic(userpk));
    			}else{
    				layer.open({content:data.message,skin: 'msg',time: 2});
    			}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
    		},"json");
    	}
    }
}
</script>
