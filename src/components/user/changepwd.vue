<template>
<div>
  <header>
      <div class="header">
          <h1>修改密码</h1>
          <router-link slot="left" to="/user/usercenter" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 忘记密码-->
  <div class="register">
    <div class="input-group register-group">
      <div class="input-row">
        <label><i class="icon-lock"></i></label>
        <input class="inputval" id="oldpassword" type="password" placeholder="请输入原始密码">
      </div>
      <div class="input-row">
        <label><i class="icon-lock"></i></label>
        <input class="inputval" id="password" type="password" placeholder="请输入新密码">
      </div>
      <div class="input-row">
        <label><i class="icon-lock"></i></label>
        <input class="inputval" id="confirmpwd" type="password" placeholder="请输入确认密码">
      </div>
      <button type="button" class="btn cy-btn btn-red" onclick="return false;" id="doChangePwd" @click="checkPwd()">确认修改</button>
    </div>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  var phoneNum = "";

  export default{
    name: 'Changepwd',
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
    		phoneNum = userInfo.userphonenumber;
    	}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 修改密码
      checkPwd:function(){
        var oldPassword = $("#oldpassword").val();
        var passWord = $("#password").val();
        var confirmPwd = $("#confirmpwd").val();
        if(oldPassword == ""){
          layer.open({content:'原始密码不能为空',skin:'msg',time: 2});
        }else if(!/^[0-9A-Za-z]{6,12}$/i.test(oldPassword)){
          layer.open({content:'密码由6~12位数字或字母组成',skin:'msg',time: 2});
        }else if(passWord == ""){
          layer.open({content:'新密码不能为空',skin:'msg',time: 2});
        }else if(!/^[0-9A-Za-z]{6,12}$/i.test(passWord)){
          layer.open({content:'密码由6~12位数字或字母组成',skin:'msg',time: 2});
        }else if(confirmPwd == ""){
          layer.open({content:'确认密码不能为空',skin:'msg',time: 2});
        }else if(confirmPwd != passWord){
          layer.open({content:'确认密码与密码不一致',skin:'msg',time: 2});
        }else{
          this.doChangePwd(oldPassword,passWord,phoneNum);
        }
      },
      // 修改密码
      doChangePwd:function(oldPassword,passWord,phoneNum){
        var doChangePwd = this.doChangePwd;
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.COMMON_QUERYEKEY_URL,{"keyType":"rsa"}, function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var modulus = result.modulus;
      			var publicExponent = result.publicExponent;
      			var loginOldPassword = rsaEncrypt(publicExponent,modulus,$.trim(oldPassword));
      			var loginPassword = rsaEncrypt(publicExponent,modulus,$.trim(passWord));
      			var params = {
      				"userPhonenumber":phoneNum,
      				"oldPassWord":loginOldPassword,
      				"password":loginPassword,
      				"platform":"3"
      			};
      			$.post(GLOBALURL.CHANGE_PASSWORD,params,function(data){
      				if(data.statusCode == 0){
                layer.open({content:data.message,skin:'msg',time: 2});
                $(".register input").val("");
      				}else if(data.statusCode == -999){
      					//initLoginStatus(doChangePwd(oldPassword,passWord,phoneNum));
      				}else{
                layer.open({content:data.message,skin:'msg',time: 2});
      				}
      			},"json");
      		}else{
      			layer.open({content:data.message,skin:'msg',time: 2});
      		}
          setTimeout(function(){
            layer.close(loading);
          },200);
      	},"json");
      }
    }
}
</script>
