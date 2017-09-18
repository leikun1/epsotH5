<template>
<div>
  <header>
      <div class="header">
          <h1>我的违章</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="userMyactivity-tab">
		    <!-- tab nav -->
		    <ul id="tab_btn" class="tab-list userMy-nav-list">
            <li class="pick" data-type="" @click="tabToggle(0)">全部</li>
            <li data-type="0" @click="tabToggle(1)"><span class="bar"></span>未处理</li>
            <li data-type="1" @click="tabToggle(2)"><span class="bar"></span>已处理</li>
        </ul>
        <!-- tab nav end-->
        <ul class="userMy-content">
            <li class="tab_content show">
            	<ul class="userMy-list userMy-paid userMy-not" id="violatonList">
            	</ul>
            </li>
        </ul>
  </div>

</div>
</template>

<script>
  import GLOBALURL from './../../utils/global'
  import NOPIC from './../../images/nopic.jpg'
  import $ from 'jquery'
  import { initLoginStatus } from '../../utils/utils'

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
        var userpk = userInfo.userpk;
        this.initViolatonList(userpk); // 初始化个人订单列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(dataIndex){
        $("#tab_btn li").removeClass("pick");
        $("#tab_btn li:eq("+dataIndex+")").addClass("pick");
        if(dataIndex == 0){
          $("#violatonList li").show();
        }else{
          $("#violatonList li").hide();
          $("#violatonList li[data-type="+(Number(dataIndex)-1)+"]").show();
        }
      },
      // 初始化个人违章信息列表
      initViolatonList:function(userpk){
        var initViolatonList = this.initViolatonList;
      	var dealStatus = $("#tab_btn li.pick").attr("data-type");
      	var params = {
      		"userpk":userpk,
      		"startTime":"",
      		"endTime":"",
      		"dealStatus":dealStatus,
      	};
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.GET_PERSONAL_VIO_INFO,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		    if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
      					var typeClass = "green";
      					var typeValue = "0";
                var typeName = "0";
      					if(result[i].violationmark == "未处理"){
      						typeClass = "red";
      						typeName = "0";
      					}else if(result[i].violationmark == "已处理"){
      						typeClass = "green";
      						typeName = "1";
      					}
      					html += "<li class=\"MyacLi\" data-type="+typeName+">";
      					html += "<div class=\"Myacticity\">";
      					html += "	<span class=\"listpic\" data-pic="+(result[i].violationextends?result[i].violationextends:"")+">";
      					html += "		<i class=\"icon-picture\"></i>";
      					html += "	</span>";
      					html += "<div class=\"userMy-firm listinfo\">";
      					html += "   <p><span class=\"leftinfo\">违章罚款：<small>"+result[i].violationmoney+"</small></span><span>违章扣分：<small>"+result[i].violationscore+"</small></span></p>";
      					html += "	<p><span class=\"leftinfo\">处理状态：<small class="+typeClass+">"+result[i].violationmark+"</small></span><span>交款状态：<small class="+typeClass+">"+result[i].violationjkbj+"</small></span></p>";
      					html += "	<p><span class=\"leftinfo\">违章车牌：<small>"+result[i].violationcarlinsence+"</small></span><span>违章时间：<small>"+result[i].violationoccurtime+"</small></span></p>";
      					html += "	<p>交管部门：<small>"+result[i].violationcjjg+"</small></p>";
      					html += "	<p>违章地点：<small>"+result[i].violationaddress+"</small></p>";
      					html += "	<p>违章详情：<small>"+result[i].violationcontent+"</small></p>";
      					html += "</div>";
      					html += "</div>";
      					html += "</li>";
      				}
      			}else{
      				html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
      			}
      		    $("#violatonList").html(html);
      			  $("#violatonList .listpic").click(function(){
        				var picUrl = $(this).attr("data-pic");
        				picUrl = picUrl?picUrl:NOPIC;
                layer.open({
                  style: 'border:none;',
                  content:"<img src='"+picUrl+"' />'"
                })
      			});
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initViolatonList(userpk));
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		};
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	},"json");
      }
    }
}
</script>
