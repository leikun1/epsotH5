<template>
<div>
  <header>
      <div class="header">
          <h1>用户中心</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box all_boxNodown">
    <div class="circle2-head">
      <div class="Frjbg"><img src="./../../images/index/bg_pictrue.jpg"></div>
      <div class="user-img" id="userPic">
        <img :src="userPic" />
      </div>

      <div class="user-head-d">
        <span style="font-size:0.5rem;color:#fff;margin-left:5.2rem;">下次年检时间：<b style="color:red;" id="nextCheckTime">--</b></span>
        <!--<span style="font-size:0.5rem;color:#fff;margin-left:1.5rem;">距离时间：<b style="color:red;">大约1个月</b></span>-->
      </div>
    </div>
        <div class="balance">
            <ul>
                <li><a href="javascript:;" @click="pageTurn('../user/userinfo')" data-href="./../../views/user/userinfo.html"><i class="ba-color icon-cogs"></i><p>我的信息</p></a></li>
                <li><a href="javascript:;" @click="pageTurn('../user/carsMileage')" ata-href="./../../views/user/carsMileage.html"><i class="ba-color ba-color2 icon-dashboard"></i><p>我的里程</p></a></li>
                <li><a href="javascript:;" @click="pageTurn('')" data-href=""><i class="ba-color ba-color3 icon-book"></i><p>通讯录</p></a></li>
                <li><a href="javascript:;" @click="pageTurn('')" data-href=""><i class="ba-color ba-color4 icon-wrench"></i><p>部件更换</p></a></li>
                <li><a href="javascript:;" @click="pageTurn('../user/carinfopic')" data-href="./../../views/user/carinfopic.html"><i class="ba-color ba-color5 icon-lock"></i><p>车辆防盗</p></a></li>
                <li><a href="javascript:;" @click="pageTurn('../user/changepwd')" data-href="./../../views/user/changepwd.html"><i class="ba-color ba-color6 icon-key"></i><p>修改密码</p></a></li>
        <li><a href="javascript:;"  @click="pageTurn('')" data-href=""><i class="ba-color ba-color6 icon-credit-card"></i><p>加油卡</p></a></li>
        <li><a href="javascript:;"  @click="pageTurn('')" data-href=""><i class="ba-color ba-color6 icon-road"></i><p>违章代缴</p></a></li>
            </ul>
        </div>
    </div>

</div>
</template>

<script>
  import logoSrc from './../../images/epsot_logo.jpg'
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var userInfo = null;
  var userpk = "";

  export default{
    name: 'Usercenter',
    components: {
    },
    data(){
      return{
        userPic:logoSrc
      }
    },
    created () {
    	userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
    		userInfo = JSON.parse(userInfo);
    		userpk = userInfo.userpk;
        	this.userPic = userInfo.userinfo.userinfoprofileimageurl?userInfo.userinfo.userinfoprofileimageurl:logoSrc;
        	//layer.tips('点击更换头像', '#userPic',{tips: [2, '#06C1AE'],time: 60000});
        	this.initcarcheckInfo(userpk);
    	}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      pageTurn:function(turnPath){
          if(turnPath){
            this.$router.replace({path:turnPath})
          }else{
            layer.open({content:'抱歉,该功能暂不开放...',skin:'msg',time: 2});
          }
      },
      // 初始化年检信息
      initcarcheckInfo:function(userpk){
        var initcarcheckInfo = this.initcarcheckInfo;
      	var params = {
      		"userPk":userpk,
      	};
      	$.post(GLOBALURL.GET_CAR_CHECK_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var nextCheckTime = data.value;
      			$("#nextCheckTime").text(nextCheckTime);
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initcarcheckInfo(userpk));
      		}else{
      			$("#nextCheckTime").text("未查询到您的年检信息");
      		}
      	});
      },

      // 初始化微信jssdk
      initJSSDK:function (){
      	var params = {
      		"userPk":userpk,
      		"pageUrl":document.URL
      	};
      	$.post(GLOBALURL.QUERY_WXCONFIG_URL,params,function(data){
      		if(data.statusCode == "0"){
      			var result  = data.value;
      			wx.config({
      			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      			    appId: result.appId, // 必填，公众号的唯一标识
      			    timestamp: result.timestamp , // 必填，生成签名的时间戳
      			    nonceStr: result.nonceStr, // 必填，生成签名的随机串
      			    signature: result.signature,// 必填，签名，见附录1
      			    jsApiList: [
      					'chooseImage',
      					'previewImage',
      					'uploadImage'
      			    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      			});
      			wx.ready(function () {
      			    $("#userPic").click(function(){
      			    	wx.chooseImage({
      			    	    count: 1, // 默认9
      			    	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      			    	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      			    	    success: function (res) {
      			    	        var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      			    	        uploadImg(localIds);
      			    	        console.log("=======chooseImage:======="+localIds);
      			    	    }
      			    	});

      			    });
      			});
      		}else{
      			console.log(data.message);
      		}
      	},"json");
      },

      uploadImg:function (localId){
      	wx.uploadImage({
      	    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      	    isShowProgressTips: 1, // 默认为1，显示进度提示
      	    success: function (res) {
      	        var serverId = res.serverId; // 返回图片的服务器端ID
      	        console.log("=======uploadImg:======="+serverId);
              	$.post(GLOBALURL.GET_WXIMAGEFILE_URL,{"mediaId":serverId,"userPk":userpk},function(data){
          			if(data.statusCode == 0){
          				console.log("=======GET_WXIMAGEFILE_URL:======="+data.value);
          				var imgUrl = data.value;
                  layer.open({content:"图片上传成功",skin: 'msg',time: 2});
          				var defImage = "./images/epsot_logo.jpg";
          				$('#userPic img').attr('src', imgUrl?imgUrl:defImage);
          				if(imgUrl){
          					userInfo.userinfo.userinfoprofileimageurl = imgUrl;
          					sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
          				}
          			}else{
          				layer.open({content:data.message,skin: 'msg',time: 2});
          			}
          		},"json");
      	    }
      	});
      }
    }
}
</script>
