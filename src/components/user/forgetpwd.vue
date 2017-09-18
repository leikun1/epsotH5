<template>
<div>
  <div>
		<header>
        <div class="header">
            <h1>忘记密码</h1>
            <router-link slot="left" to="/user/login" class="return" ><i class="icon-chevron-left"></i></router-link>
        </div>
		</header>
		<div style="height: 2.5rem;"></div>
	</div>

 	<!-- 忘记密码-->
	<div class="register">
		<div class="input-group register-group stepone">
		  <input type="hidden" class="inputval" id="msgToken" value="" />
			<div class="input-row">
				<label><i class="icon-tablet"></i></label>
				<input id="username" class="inputval" type="text" placeholder="请输入注册手机号码" >
			</div>
			<div class="input-row">
				<label><i class="icon-key"></i></label>
				<input id="msgcode" class="code-in inputval" type="text" placeholder="请输入验证码">
				<input type="button" id="sendMsg" class="code-a" style="padding-left:0;" value="获取验证码" @click="sendMsg" />
			</div>
			<button type="button" class="btn cy-btn btn-red" onclick="return false;" id="checkCode" @click="checkCode" >提交</button>
			<div class="clause-box">
        <router-link slot="login" to="/user/login" class="fr clause-t">前往登录</router-link>
			</div>
		</div>

		<div class="input-group register-group steptwo" style="display:none;">
			<div class="input-row">
				<label><i class="icon-lock"></i></label>
				<input class="inputval" id="password" type="password" placeholder="请输入登录密码">
			</div>
			<div class="input-row">
				<label><i class="icon-lock"></i></label>
				<input class="inputval" id="confirmpwd" type="password" placeholder="请输入确认密码">
			</div>
			<button type="button" class="btn cy-btn btn-red" onclick="return false;" id="doChangePwd" @click="doChangePwd">确认修改</button>
			<div class="clause-box">
        <router-link slot="login" to="/user/login" class="fr clause-t">前往登录</router-link>
			</div>
		</div>
	</div>
</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'

  export default{
    name: 'Forgetpwd',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 获取验证码
      sendMsg: function(){
        var startCountDown = null;
        var phoneNum = $.trim($("#username").val());
    		if(phoneNum == ""){
            layer.open({content:'手机号码不能为空',skin:'msg',time: 2});
    		}else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(phoneNum)){
            layer.open({content:'手机号码格式不正确',skin:'msg',time: 2});
    		}else{
      			var sumTime = 60;
      			$("#sendMsg").addClass('btn-gray');
      			$("#sendMsg").attr("disabled",true);
      			//处理获取验证码时发生的动作
      			var handleCount = function(){
      				// 显示倒计时
      				$("#sendMsg").val(sumTime--+"秒后重发");
      				if(sumTime <= 0){
      					// 显示按钮
      					$("#sendMsg").val("获取验证码");
      					//关闭定时器
      				  clearInterval(startCountDown);
      					$("#sendMsg").removeClass('btn-gray');
      					$("#sendMsg").attr("disabled",false);
      				}
    			};
    			handleCount();
    			//每秒刷新下发送验证码框的数字
    			startCountDown = window.setInterval(function(){
    				handleCount();
    			}, 1000);
    			$.post(GLOBALURL.COMMON_SENDVMSG_URL,{"userPhonenumber":phoneNum},function(data){
    					if(data.statusCode == 0){
    						var msgToken = data.value;
    						if(msgToken){
    							$("#msgToken").val(msgToken);
    						}
    						layer.open({content:data.message,skin: 'msg',time: 2});
    					}else{
    						layer.open({content:data.message,skin: 'msg',time: 2});
    					}
    			},"json");
    		}
      },
      // 校验验证码
      checkCode: function () {
          var userName = $("#username").val();
      		var msgCode = $("#msgcode").val();
          var msgToken = $("#msgToken").val();
          if(userName == ""){
      			 layer.open({content:'手机号码不能为空',skin:'msg',time: 2});
      		}else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(userName)){
      			 layer.open({content:'手机号码格式不正确',skin:'msg',time: 2});
      		}else if(msgCode == ""){
             layer.open({content:'验证码不能为空',skin:'msg',time: 2});
      		}else if(msgToken == ""){
             layer.open({content:'请先获取验证码',skin:'msg',time: 2});
      		}else{

            var params = {
              "userPhonenumber":userName,
              "msgToken":msgToken,
              "msgCode":msgCode,
              "platform":"3"
            };
            $.post(GLOBALURL.LOGIN_UCHECK_URL,params,function(data){
              if(data.statusCode == 0){
                $(".stepone").hide();
                $(".steptwo").show();
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
            },"json");
      		}
      },
      // 修改密码
      doChangePwd: function(){
        var router = this.$router;
        var passWord = $("#password").val();
    		var confirmPwd = $("#confirmpwd").val();
        if(passWord == ""){
          layer.open({content:'登录密码不能为空',skin:'msg',time: 2});
    		}else if(!/^[0-9A-Za-z]{6,12}$/i.test(passWord)){
          layer.open({content:'登录密码必须为6~12位数字或字母组成',skin:'msg',time: 2});
    		}else if(confirmPwd == ""){
          layer.open({content:'确认密码不能为空',skin:'msg',time: 2});
    		}else if(confirmPwd != passWord){
          layer.open({content:'确认密码与密码不一致',skin:'msg',time: 2});
    		}else{
          var msgToken = $("#msgToken").val();
          $.post(GLOBALURL.COMMON_QUERYEKEY_URL,{"keyType":"rsa"}, function(data){
            if(data.statusCode == 0){
              var result = data.value;
              var modulus = result.modulus;
              var publicExponent = result.publicExponent;
              var loginPassword = rsaEncrypt(publicExponent,modulus,$.trim(passWord));
              var params = {
                "userToken":msgToken,
                "password":loginPassword,
                "platform":"3"
              };
              $.post(GLOBALURL.LOGIN_FILTERUPUPASS,params,function(data){
                if(data.statusCode == 0){
                  layer.open({content:data.message,skin:'msg',time: 2});
                  router.replace({path:"/user/login"});
                }else{
                  layer.open({content:data.message,skin:'msg',time: 2});
                }
              },"json");
            }else{
              layer.open({content:data.message,skin:'msg',time: 2});
            }
          },"json");
    		}
      }
   }
}
</script>
