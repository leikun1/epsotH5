<template>
<div>
  <header>
      <div class="header">
          <h1>我的信息</h1>
          <router-link slot="left" to="/user/usercenter" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 个人信息 -->
	<div class="firmDetails" id="userinfo">
		<div class="firmD-head">
			<img class="userPic" :src="picurl">
			<div class="fD-text">
				<h1 class="userName">{{username}}</h1>
			</div>
		</div>
		<div class="firmD-tab">
			<!-- tab nav -->
			<ul id="tab_btn" class="tab-list">
          <li class="pick" @click="tabToggle(0)">基本信息</li>
          <li @click="tabToggle(1)"><span class="bar"></span>驾驶证信息</li>
          <li @click="tabToggle(2)"><span class="bar"></span>行驶证信息</li>
      </ul>
      <!-- tab nav end-->
      <ul>
        <li class="tab_content basicinfo show">
      		<input id="userinfopk" type="hidden" class="inputinfo"/>
					<input id="userpk" type="hidden" class="inputinfo"/>
					<input id="infoStatus" type="hidden" class="inputinfo"/>
          <div class="firmD-menu">
						<ul class="vconlist">
							<li class="firmD-img"><img src="./../../images/info.png"></li>
							<li>
								<label>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
								<input class="vcon-content inputinfo" id="userinfonickname" disabled="disabled"/>
							</li>
							<li class="layui-form-item">
								<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
								<select class="vcon-content inputinfo" id="userinfogender" disabled="disabled" style="padding-bottom:0.1rem;">
									<option value="男">男</option>
									<option value="女">女</option>
								</select>
							</li>
							<li>
								<label>绑定帐号：</label>
								<input type="input" class="vcon-content" id="phoneNumber" disabled="disabled"/>
							</li>
							<li>
								<label>绑定邮箱：</label>
								<input type="input" class="vcon-content inputinfo" id="userinfoemail" disabled="disabled"/>
							</li>
							<li>
								<label>证件号码：</label>
								<input type="input" class="vcon-content inputinfo" id="userinfocard" disabled="disabled"/>
							</li>
							<li>
								<label>联系地址：</label>
								<input type="input" class="vcon-content inputinfo" id="userinfoaddress" disabled="disabled"/>
							</li>
							<li>
								<label>维修地址：</label>
								<input type="input" class="vcon-content inputinfo" id="userinforepairaddress" disabled="disabled"/>
							</li>
							<li>
								<label>公司地址：</label>
								<input type="input" class="vcon-content inputinfo" id="userinfocompanyaddress" disabled="disabled"/>
							</li>
							<div class="cl"></div>
						</ul>
						<button class="btn btn-max infobtn changeInfo" @click="changeInfo(0)">修改信息</button>
						<button class="btn btn-max infobtn submitInfo" style="background-color:#ffb649;display:none;" @click="basicinfoSubmit()">提交信息</button>
					</div>
        </li>
        <li class="tab_content jszinfo">
        	<input id="driverslisencepk" type="hidden" class="inputinfo"/>
					<input id="userpk" type="hidden" class="inputinfo"/>
					<input id="infoStatus" type="hidden" class="inputinfo"/>
          <div class="firmD-menu">
						<ul class="vconlist">
							<li>
								<label>证件号码：</label>
								<input type="input" class="vcon-content inputinfo" id="driverslisencenumber" disabled="disabled"/>
							</li>
							<li>
								<label>持证人国籍：</label>
								<input type="input" class="vcon-content inputinfo" id="driverslisencecountry" disabled="disabled"/>
							</li>
							<li>
								<label>领证日期：</label>
								<!-- <input class="vcon-content inputinfo" id="driverslisencefirstgettime" disabled="disabled"/> -->
                <datetime style="border-top:none;padding:0;" class="vcon-content inputinfo" id="driverslisencefirstgettime" disabled="disabled" :title="('选择日期')" :min-year=1990 :max-year=2100 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
                </datetime>
							</li>
							<li>
								<label>准驾类型：</label>
								<select class="vcon-content inputinfo" id="driverslisenceclass" disabled="disabled" style="padding-bottom:0.1rem;">
	                    <option value="A1">A1</option>
	                    <option value="A2">A2</option>
	                    <option value="A3">A3</option>
	                    <option value="B1">B1</option>
	                    <option value="B2">B2</option>
	                    <option value="C1">C1</option>
	                    <option value="C2">C2</option>
	                    <option value="C3">C3</option>
	                    <option value="C4">C4</option>
	                    <option value="D">D</option>
	                    <option value="E">E</option>
	                    <option value="F">F</option>
	                    <option value="M">M</option>
	                    <option value="N">N</option>
	                    <option value="P">P</option>
                      <option value="其他">其他</option>
								</select>
							</li>
							<li>
								<label>有效起始日期：</label>
                <datetime style="border-top:none;padding:0;" class="vcon-content inputinfo" id="driverslisencebegintime" disabled="disabled" :title="('选择日期')" :min-year=1990 :max-year=2100 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
                </datetime>
              </li>
							<li>
								<label>有效结束日期：</label>
								<!-- <input class="vcon-content inputinfo" id="driverslisenceendtime" disabled="disabled"/> -->
                <datetime style="border-top:none;padding:0;" class="vcon-content inputinfo" id="driverslisenceendtime" disabled="disabled" :title="('选择日期')" :min-year=1990 :max-year=2100 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
                </datetime>
							</li>
							<li>
								<label>颁发机关：</label>
								<input type="input" class="vcon-content inputinfo" id="driverslisencedepartment" disabled="disabled"/>
							</li>
							<div class="cl"></div>
						</ul>
						<button class="btn btn-max infobtn changeInfo" @click="changeInfo(1)">修改信息</button>
						<button class="btn btn-max infobtn submitInfo" style="background-color:#ffb649;display:none;" @click="jszinfoSubmit()">提交信息</button>
					</div>
        </li>
        <li class="tab_content xszinfo">
        		<input id="drivinglisencepk" type="hidden" class="inputinfo"/>
    	      <input id="userpk" type="hidden" class="inputinfo"/>
  	        <input id="infoStatus" type="hidden" class="inputinfo"/>
          	<div class="firmD-menu">
						<ul class="vconlist">
							<li>
								<label>车牌号码：</label>
								<input type="input" class="vcon-content inputinfo" id="drivinglisenceplateno" disabled="disabled"/>
							</li>
							<li>
								<label>车辆识别号：</label>
								<input type="input" class="vcon-content inputinfo" id="drivinglisencevin" disabled="disabled"/>
							</li>
							<li>
								<label>发动机编号：</label>
								<input type="input" class="vcon-content inputinfo" id="drivinglisenceengineno" disabled="disabled"/>
							</li>
							<li>
								<label>车辆类型：</label>
								<input type="input" class="vcon-content inputinfo" id="drivinglisencevehicletype" disabled="disabled"/>
							</li>
							<li>
								<label>品牌型号：</label>
								<input type="input" class="vcon-content inputinfo" id="drivinglisencemodel" disabled="disabled"/>
							</li>
							<li>
								<label>车辆使用性质：</label>
								<select class="vcon-content inputinfo" id="drivinglisenceusecharacter" disabled="disabled" style="padding-bottom:0.1rem;">
									<option value="运营">运营</option>
									<option value="非运营">非运营</option>
								</select>
							</li>
							<li>
								<label>注册日期：</label>
								<!-- <input class="vcon-content inputinfo" id="drivinglisenceregdate" disabled="disabled"/> -->
                <datetime style="border-top:none;padding:0;" class="vcon-content inputinfo" id="drivinglisenceregdate" disabled="disabled" :title="('选择日期')" :min-year=1990 :max-year=2100 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
                </datetime>
							</li>
							<li>
								<label>发证日期：</label>
								<!-- <input class="vcon-content inputinfo" id="drivinglisenceissuedate" disabled="disabled"/> -->
                <datetime style="border-top:none;padding:0;" class="vcon-content inputinfo" id="drivinglisenceissuedate" disabled="disabled" :title="('选择日期')" :min-year=1990 :max-year=2100 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
                </datetime>
							</li>
							<li>
								<label>颁发机关：</label>
								<input type="input" class="vcon-content inputinfo" id="drivinglisencedepartment" disabled="disabled"/>
							</li>
							<div class="cl"></div>
						</ul>
						<button class="btn btn-max infobtn changeInfo" @click="changeInfo(2)">修改信息</button>
						<button class="btn btn-max infobtn submitInfo" style="background-color:#ffb649;display:none;" @click="xszinfoSubmit()">提交信息</button>
					</div>
        </li>
      </ul>
		</div>
	</div>
</div>
</template>
<style>
.inputinfo{
  border: solid 1px #ddd;
  -webkit-user-select: auto;
}
.inputinfo:before{
  border: 0;
}
</style>
<script>
  import { Datetime } from 'vux'
  import GLOBALURL from './../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { validIDCard,validDate,validPlateNo,validVin,initLoginStatus} from './../../utils/utils'

  export default{
    name: 'Userinfo',
    components: {
      Datetime
    },
    data(){
      return{
        picurl:logoSrc,
        username:"--"
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      var userpk = "";
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userpk = userInfo.userpk;
        this.picurl = userInfo.userinfo.userinfoprofileimageurl?userInfo.userinfo.userinfoprofileimageurl:logoSrc;
        this.username = userInfo.userinfo.userinfoname;
        this.initUserinfo(userpk); // 初始化个人详情信息
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(dataIndex){
        $("#tab_btn li").removeClass("pick");
        $("#tab_btn li:eq("+dataIndex+")").addClass("pick");
        $(".tab_content:eq("+dataIndex+")").addClass("show").siblings().removeClass("show");
        $(".tab_content").find(".inputinfo").attr("disabled",true);
        $(".submitInfo").hide();
      },

      changeInfo:function(dataIndex){
        $(".submitInfo:eq("+dataIndex+")").show();
        $(".tab_content:eq("+dataIndex+")").find(".inputinfo").attr("disabled",false);
      },

      basicinfoSubmit:function(){
        var nickname = $("#userinfonickname").val();
        var gender = $("#userinfogender").val();
        var email = $("#userinfoemail").val();
        var card = $("#userinfocard").val();
        var address = $("#userinfoaddress").val();
        var repairaddress = $("#userinforepairaddress").val();
        var companyaddress = $("#userinfocompanyaddress").val();
        if(nickname == ""){
          layer.open({content:'昵称不能为空',skin:'msg',time: 2});
        }else if(nickname.length>6 || nickname.length<2){
          layer.open({content:'昵称由2-6位字符组成',skin:'msg',time: 2});
        }else if(gender==""){
          layer.open({content:'性别不能为空',skin:'msg',time: 2});
        }else if(email==""){
          layer.open({content:'绑定邮箱不能为空',skin:'msg',time: 2});
        }else if(!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(email)){
          layer.open({content:'绑定邮箱格式不正确',skin:'msg',time: 2});
        }else if(card==""){
          layer.open({content:'身份证号码不能为空',skin:'msg',time: 2});
        }else if(!validIDCard(card,"","","")){
          layer.open({content:'身份证格式不正确',skin:'msg',time: 2});
        }else if(address==""){
          layer.open({content:'联系地址不能为空',skin:'msg',time: 2});
        }else if(repairaddress==""){
          layer.open({content:'维修地址不能为空',skin:'msg',time: 2});
        }else if(companyaddress==""){
          layer.open({content:'公司地址不能为空',skin:'msg',time: 2});
        }else{
          this.updateUserinfo("basicinfo",userpk);
        }
      },
      jszinfoSubmit(){
        var number = $("#driverslisencenumber").val();
        var country = $("#driverslisencecountry").val();
        var firstgettime = $("#driverslisencefirstgettime").val();
        var classtype = $("#driverslisenceclass").val();
        var begintime = $("#driverslisencebegintime").val();
        var endtime = $("#driverslisenceendtime").val();
        var department = $("#driverslisencedepartment").val();
        if(number==""){
          layer.open({content:'证件号码不能为空',skin:'msg',time: 2});
        }else if(!validIDCard(number,"","","")){
          layer.open({content:'证件号码格式不正确',skin:'msg',time: 2});
        }else if(country==""){
          layer.open({content:'国籍不能为空',skin:'msg',time: 2});
        }else if(!/^[\u4e00-\u9fa5]+$/i.test(country)){
          layer.open({content:'国籍必须为中文',skin:'msg',time: 2});
        }else if(firstgettime==""){
          layer.open({content:'领证日期不能为空',skin:'msg',time: 2});
        }else if(!validDate(firstgettime,"","","")){
          layer.open({content:'领证日期格式不正确',skin:'msg',time: 2});
        }else if(classtype==""){
          layer.open({content:'准驾类型不能为空',skin:'msg',time: 2});
        }else if(begintime==""){
          layer.open({content:'有效起始日期不能为空',skin:'msg',time: 2});
        }else if(!validDate(begintime,"","","")){
          layer.open({content:'有效起始日期格式不正确',skin:'msg',time: 2});
        }else if(endtime==""){
          layer.open({content:'有效结束日期不能为空',skin:'msg',time: 2});
        }else if(!validDate(endtime,"","","")){
          layer.open({content:'有效结束日期格式不正确',skin:'msg',time: 2});
        }else if(department==""){
          layer.open({content:'颁发机关不能为空',skin:'msg',time: 2});
        }else{
          this.updateUserinfo("jszinfo",userpk);
        }
      },
      xszinfoSubmit:function(){
        var plateno = $("#drivinglisenceplateno").val();
        var vin = $("#drivinglisencevin").val();
        var engineno = $("#drivinglisenceengineno").val();
        var vehicletype = $("#drivinglisencevehicletype").val();
        var model = $("#drivinglisencemodel").val();
        var usecharacter = $("#drivinglisenceusecharacter").val();
        var regdate = $("#drivinglisenceregdate").val();
        var issuedate = $("#drivinglisenceissuedate").val();
        var department = $("#drivinglisencedepartment").val();
        if(plateno==""){
          layer.open({content:'车牌号码不能为空',skin:'msg',time: 2});
        }else if(!validPlateNo(plateno,"","","")){
          layer.open({content:'车牌号码格式不正确',skin:'msg',time: 2});
        }else if(vin==""){
          layer.open({content:'车辆识别号不能为空',skin:'msg',time: 2});
        }else if(!validVin(vin,"","","")){
          layer.open({content:'车辆识别号格式不正确',skin:'msg',time: 2});
        }else if(engineno==""){
          layer.open({content:'发动机编号不能为空',skin:'msg',time: 2});
        }else if(!/^\d+$/i.test(engineno)){
          layer.open({content:'发动机编号必须由数字组成',skin:'msg',time: 2});
        }else if(vehicletype==""){
          layer.open({content:'车辆类型不能为空',skin:'msg',time: 2});
        }else if(model==""){
          layer.open({content:'品牌型号不能为空',skin:'msg',time: 2});
        }else if(usecharacter==""){
          layer.open({content:'车辆使用性质不能为空',skin:'msg',time: 2});
        }else if(regdate==""){
          layer.open({content:'注册日期不能为空',skin:'msg',time: 2});
        }else if(!validDate(regdate,"","","")){
          layer.open({content:'注册日期格式不正确',skin:'msg',time: 2});
        }else if(issuedate==""){
          layer.open({content:'发证日期不能为空',skin:'msg',time: 2});
        }else if(!validDate(issuedate,"","","")){
          layer.open({content:'发证日期格式不正确',skin:'msg',time: 2});
        }else if(department==""){
          layer.open({content:'颁发机关不能为空',skin:'msg',time: 2});
        }else{
          this.updateUserinfo("xszinfo",userpk);
        }
      },

      // 初始化个人详情信息
      initUserinfo:function(userpk){
        var initUserinfo = this.initUserinfo;
      	var params ={
      		"userpk":userpk
      	};
      	$.post(GLOBALURL.GET_DRIVER_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result){
      				var userStauts = data.accountInfo.accountProperty;
      				var infoStatus = userStauts.split(",");
      				var userinfoStatus = infoStatus[0];
      				var driverinfoStatus = infoStatus[1];
      				var drivinginfoStatus = infoStatus[2];
      				var info = result.driver.users;
      				// 填入身份信息
    			  	$(".basicinfo #userpk").val(userpk);
              $(".basicinfo #infoStatus").val(userStauts);
    		    	$(".basicinfo #userinfopk").val(info.userinfo.userinfopk);
    		    	$(".basicinfo #phoneNumber").val(info.userphonenumber);
    		    	$(".basicinfo #userinfonickname").val(info.userinfo.userinfonickname);
    		    	$(".basicinfo #userinfocard").val(info.userinfo.userinfocard);
    		    	$(".basicinfo #userinfogender").val(info.userinfo.userinfogender);
    		    	$(".basicinfo #userinfoemail").val(info.userinfo.userinfoemail);
    		    	$(".basicinfo #userinfoaddress").val(info.userinfo.userinfoaddress);
    		    	$(".basicinfo #userinforepairaddress").val(info.userinfo.userinforepairaddress);
    		    	$(".basicinfo #userinfocompanyaddress").val(info.userinfo.userinfocompanyaddress);
    		    	$(".basicinfo #userregtime").val(info.userregtime);

    		    	var jsz = result.driver.driverslisence;
              if(jsz){
                  // 填入驾驶证信息
                  $(".jszinfo #userpk").val(userpk);
                  $(".jszinfo #infoStatus").val(userStauts);
        		    	$(".jszinfo #driverslisencepk").val(jsz.driverslisencepk);
        			  	$(".jszinfo #driverslisencenumber").val(jsz.driverslisencenumber);
        		    	$(".jszinfo #driverslisencecountry").val(jsz.driverslisencecountry);
        		    	$(".jszinfo #driverslisencefirstgettime").val(jsz.driverslisencefirstgettime);
        		    	$(".jszinfo #driverslisenceclass").val(jsz.driverslisenceclass);
        		    	$(".jszinfo #driverslisencebegintime").val(jsz.driverslisencebegintime);
        		    	$(".jszinfo #driverslisenceendtime").val(jsz.driverslisenceendtime);
        		    	$(".jszinfo #driverslisencedepartment").val(jsz.driverslisencedepartment);
              }

             if(result.car){
        				  var xsz = result.car.drivinglisence;
                  // 填入行驶证信息
                  $(".xszinfo #userpk").val(userpk);
                  $(".xszinfo #infoStatus").val(userStauts);
        		    	$(".xszinfo #drivinglisencepk").val(xsz.drivinglisencepk);
        				  $(".xszinfo #drivinglisenceplateno").val(xsz.drivinglisenceplateno);
        		    	$(".xszinfo #drivinglisencevehicletype").val(xsz.drivinglisencevehicletype);
        		    	$(".xszinfo #drivinglisenceusecharacter").val(xsz.drivinglisenceusecharacter);
        		    	$(".xszinfo #drivinglisencemodel").val(xsz.drivinglisencemodel);
        		    	$(".xszinfo #drivinglisencevin").val(xsz.drivinglisencevin);
        		    	$(".xszinfo #drivinglisenceengineno").val(xsz.drivinglisenceengineno);
        		    	$(".xszinfo #drivinglisenceregdate").val(xsz.drivinglisenceregdate);
        		    	$(".xszinfo #drivinglisenceissuedate").val(xsz.drivinglisenceissuedate);
        		    	$(".xszinfo #drivinglisencedepartment").val(xsz.drivinglisencedepartment);
      			   }
      		    }
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initUserinfo(userpk));
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      },
      // 更新用户信息
      updateUserinfo:function(formId,userpk){
        var updateUserinfo = this.updateUserinfo;
        var initUserinfo = this.initUserinfo;
      	var updateUrl = {
      		"basicinfo":GLOBALURL.UDATA_UPDATEUSERINFO_URL,
      		"jszinfo":GLOBALURL.UDATA_UPDATEDRIVERLISENCE_URL,
      		"xszinfo":GLOBALURL.UDATA_UPDATEDRIVINGLISENCE_URL
      	};
      	var params =$("."+formId+" .inputinfo").map(function(){
              return ($(this).attr("id")+'='+$(this).val());}).get().join("&") ;
      	$.post(updateUrl[formId],params,
      		  function(data){
      			if(data.statusCode == 0){
      				layer.open({content:data.message,skin: 'msg',time: 2});
      				$(".tab_content").find(".inputinfo").attr("disabled",true);
      				$(".submitInfo").hide();
      				initUserinfo(userpk);
      			}else if(data.statusCode == -999){
      				//initLoginStatus(updateUserinfo(formId,userpk));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      	},"json");
      }
    }
}
</script>
