<template>
<div>
  <header>
      <div class="header">
          <h1>我的订单</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

	<div class="userMyactivity-tab">
	 <!-- tab nav -->
    <ul id="tab_btn" class="tab-list userMy-nav-list">
        <li class="pick" data-status="0" @click="tabToggle(0)"><span class="bar"></span>未支付</li>
        <li data-status="1" @click="tabToggle(1)">已支付</li>
        <li data-status="2" @click="tabToggle(2)"><span class="bar" ></span>已完成</li>
    </ul>
    <div class="all_box groupList" id="orderList"></div>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'

  export default{
    name: 'Orders',
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
        this.initOrderList(userpk); // 初始化个人订单列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(dataIndex){
        $("#tab_btn li").removeClass("pick");
        $("#tab_btn li:eq("+dataIndex+")").addClass("pick");
        $("#orderList .card_ecchange").hide();
        $("#orderList .card_ecchange[data-status="+dataIndex+"]").show();
      },
      // 初始化个人订单列表
      initOrderList:function(userpk){
        var initOrderList = this.initOrderList;
      	var dealStatus = $("#tab_btn li.pick").attr("data-type");
      	var params = {
      		"userPK":userpk,
      		"beginTime":"",
      		"endTime":"",
      		"status":dealStatus,
      		"queryNum":"20",
      		"currentPage":"1"
      	};
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.DO_QUERY_COUPON_ORDER_LIST,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		    if(result && result.length>0){
      				var defalutPic =  "../../images/nopic.jpg";
      				var orderStatus = {
      					"0":"未付款",
      		    		"1":"已付款",
      		    		"2":"部分退款",
      		    		"3":"全部退款",
      		    		"4":"已评论",
      		    		"5":"关闭"
      				};
      				for(var i=0;i<result.length;i++){
      					var picUrl = result[i].mycarstoreinfomainimage?result[i].mycarstoreinfomainimage:defalutPic;
      					var description = result[i].carmcouponordercouponass[0].carmcouponname + "&nbsp;&nbsp;X" + result[i].carmcouponordercouponass.length;
      					description += "&nbsp;&nbsp;&nbsp;优惠价&nbsp;&nbsp;"+ result[i].carmcouponordertotalprice;
      					var status = result[i].carmcouponorderstatus;
      					var statusColor = "color:gray";
      					var dataSatuts = "0";
      					if(status == "0"){
      						statusColor = "color:red";
      						dataSatuts = "0";
      					}else if(status == "1"){
      						statusColor = "color:green";
      						dataSatuts = "1";
      					}else{
      						statusColor = "color:gray";
      						dataSatuts = "2";
      					}
      					html += "<div class=\"card_ecchange plus-pass\" data-status="+dataSatuts+" style=\"display:none\">";
      					html += "	<i class=\"images_card\"><img src="+picUrl+"></i>";
      					html += "	<span style="+statusColor+">"+orderStatus[status]+"</span>";
      					html += "	<h1>"+result[i].merchantsname+"</h1>";
      					html += "	<p>"+description+"</p>";
      					html += "	<p>"+result[i].carmcouponordertime+"</p>";
      					html += "</div>";
      				}
      			}else{
      				html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
      			}
      			$("#orderList").html(html);
      			var currStatus = $("#tab_btn li").attr("data-status");
      			$("#orderList .card_ecchange[data-status="+currStatus+"]").show();
      			$("#orderList .listpic").click(function(){

      			});
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initOrderList(userpk));
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
