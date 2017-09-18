<template>
<div>
  <header>
      <div class="header">
          <h1>接人</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 接人 -->
	<div class="datum-box">
		<div class="input-group register-group">
			<div class="input-row reset-p">
				<label><i class="ba-color5 icon-phone-sign" style="font-size:1.4rem;"></i></label>
				<input id="userPhone" type="text" placeholder="请输入被接人电话号码" style="width:70%;">
				<a id="sendMsg" class="btn cy-btn btn-red" style="float:right;width:2.3rem;text-align:center;margin:0.3rem;padding:0.04rem;" @click="sendMsg">发送</a>
			</div>
        </div>
		<p style="padding:0.6rem 0 0 0.4rem;">将会发送以下内容至被接送人手机：</p>
		<p style="padding:0.6rem 0 0 0.4rem;">车主<span id="userName">{{username}}</span><span>将会开车接您，点击以下短信链接发送您当前位置：</span></p>
		<p style="padding:0.2rem 0 0 0.4rem;">
			<span id="pickUrl">{{pickupurl}}</span> 【巨能科技】
		</p>
	</div>
	<!--接人-->

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'

  export default{
    name: 'Pickup',
    components: {
    },
    data(){
      return{
        username:"",
        userpk:"",
        pickupurl:""
      }
    },
    created () {
      	var userInfo = sessionStorage.getItem("userInfo");
        if (userInfo) {
        	userInfo = JSON.parse(userInfo);
          this.username = userInfo.userinfo.userinfoname;
          this.userpk = userInfo.userpk;
          this.pickupurl = "http://www.epsot.cn/epsotServerV2.0/navigationFilterModel/toGetLocation?driverId="+this.userpk;
        }
        sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 发送短信
      sendMsg: function(){
        var userphone = $("#userPhone").val();
  	    if(userphone == ""){
          layer.open({content:'手机号码不能为空',skin:'msg',time: 2});
  			}else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(userphone)){
          layer.open({content:'手机号码格式不正确',skin:'msg',time: 2});
  			}else{
  				 var msgCnotent = "车主"+this.username+"将会开车接您，点击以下短信链接发送您当前位置：http://www.epsot.cn/epsotServerV2.0/navigationFilterModel/toGetLocation?driverId="+this.userpk+"【巨能科技】";
  				 if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  					 msgCnotent = "sms:"+userphone+"&body="+msgCnotent;
  				 }else if (/(Android)/i.test(navigator.userAgent)) {
  				  	 msgCnotent = "sms:"+userphone+"?body="+msgCnotent;
  				 }else{
  				   	 msgCnotent = "sms:"+userphone+"?body="+msgCnotent;
  				 }
  				 window.location.href= msgCnotent;
  			}
      }
    }
}
</script>
