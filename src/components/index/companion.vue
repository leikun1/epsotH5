<template>
<div>
  <header>
      <div class="header">
          <h1>商家详情</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!--商家详情-->
  <div class="all_box all_boxNodown">
    <div class="A-cimg activity-pic">
      <img class="merchantsImgurl" src="./../../images/index/merchants_01.jpg" style="height:10rem;">
      <h1 class="merchantsName">--</h1>
      <h3 style="padding-left:0.4rem;"><i class="ba-color3 icon-map-marker"></i><span style="margin-left:0.4rem;" class="merchantsAddress">--</span></h3>
    </div>
     <ul class="activity-info">
      <li><i class="icon-comments-alt"></i><span>评价：</span><b class="totalNum">--</b>人评价</li>
      <li><i class="icon-phone"></i><span>电话：</span><b class="merchantsPhone">--</b></li>
      <li><i class="icon-map-marker"></i><span>地址：</span><b class="merchantsAddress">--</b></li>
     </ul>
     <div class="activity-details">
      <p class="merchantsBrief">--</p>
      <img class="merchantsImgurl" src="./../../images/index/merchants_01.jpg" style="height:10rem;">
      <a href="javascript:void(0);" class="compile-btn compile-btn-apply">
        <i class="icon-credit-card"></i>
        <span>优惠券</span>
      </a>
     </div>
  </div>
    <!--商家详情end-->

    <!--用户评论-->
  <div class="assDt-foot">
    <p class="assDt-foot-head">评论(<span class="totalNum">0</span>)</p>
    <ul id="commentList">

    </ul>
  </div>
  <!--用户评论end-->

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { initLoginStatus } from '../../utils/utils'
  import logoSrc from './../../images/epsot_logo.jpg'
  import $ from 'jquery'

  export default{
    name: 'Companion',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
        var merchantspk = this.$route.query.merchantspk;
        this.initMerchantInfo(merchantspk);
        this.initCommentList(merchantspk,1);
        sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      initMerchantInfo:function(merchantspk){
        var initMerchantInfo = this.initMerchantInfo;
        var params = {
        	 merchantspk:merchantspk,
    	  };
        var loading = layer.open({type: 2});
    	  $.post(GLOBALURL.MERCHANTS_MERCHANTSDETAIL_URL,params,function(data){
      			if(data.statusCode == 0){
      			   var result = data.value;
      			   if(result){
      				 var merchantsName = result.myCarMerchantsInfo.merchantsinfofullname;
      				 var merchantsImgurl= result.myCarMerchantsInfo.mycarstoreinfomainimage;
      				 var merchantsAddress = result.myCarMerchantsInfo.merchantsaddress;
      				 var merchantsBrief = result.myCarMerchantsInfo.merchantsbrief;
      				 var merchantsPhone = result.myCarMerchantsInfo.merchantsinfophonenumber;
      				 var longitude =  result.myCarMerchantsInfo.mycarstoreinfobdlongtitude;
      				 var latitude = result.myCarMerchantsInfo.mycarstoreinfobdlatitude;
      				 $(".merchantsName").text(merchantsName);
      				 $(".merchantsImgurl").attr("src",merchantsImgurl);
      				 $(".merchantsAddress").text(merchantsAddress);
      				 $(".merchantsBrief").text(merchantsBrief);
      				 $(".merchantsPhone").text(merchantsPhone);
      			   }
      			}else if(data.statusCode == -999){
      				//initLoginStatus(initMerchantInfo(merchantspk));
      			}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      			// 等待层
      			setTimeout(function(){
      				layer.close(loading);
      			},200);
      	},"json");
      },
      initCommentList:function(merchantspk,currentPage){
        var initCommentList = this.initCommentList;
        var params = {
      		merchantsPK:merchantspk,
      		couponOrderPK:"",
      		userPK:"",
      		commentType:"",
      		commentBeginTime:"",
      		commentEndTime:"",
      		replyBeginTime:"",
      		replyEndTime:"",
      		currentPage:currentPage,
      		queryNum:"8"
      	};
      	$.post(GLOBALURL.MERCHANTS_COUPONORDERCOMMENTLIST_URL,params,function(data){
      			if(data.statusCode == 0){
      			   var pagevo =  data.pagevo;
      			   var totalNum = pagevo.totalNum?pagevo.totalNum:0;
      			   var totalPage = pagevo.totalPage?pagevo.totalPage:0;
      			   var result = data.value;
      			   $(".totalNum").text(totalNum);
      			   if(result && result.length > 0){
      				    var html = "";
      				   	for(var i=0;i<result.length;i++){
      				   	var score = result[i].carmcouponordercommentscore;
      				   	var starsWidth = (Number(score)/5)*100;
                  var imgurl = (!result[i].userinfoprofileimageurl|| result[i].userinfoprofileimageurl =='未知')?logoSrc:result[i].userinfoprofileimageurl;

      						html += "<li>";
      						html += "	<a href=\"javascript:void(0);\" class=\"commentUser\">";
      						html += "		<div class=\"user-img\"><img src='"+imgurl+"'></div>";
      						html += "		<span>"+result[i].userinfonickname;
      						html += "			<span class=\"rate-status\">";
      				   	html += "				<span class=\"common-rating\" style=\"vertical-align:middle;\"><span class=\"rate-stars\" style=\"width:"+starsWidth+"%\"></span></span>";
      				   	html += "			</span>";
      						html += "		</span>";
      						html += "		<span class=\"issue-time fr\">"+result[i].carmcouponordercommenttime+"</span>";
      						html += "		<span class=\"cl\"></span>";
      						html += "	</a>";
      						html += "	<div class=\"commentText\">";
      						html += "		<p class=\"aUserText\">"+result[i].carmcouponordercommentcontent+"</p>";
      						html += "	</div>";
      						html += "</li>";
      				   	}
      				   	$("#commentList").html(html);
      			    }else{
      				    $("#commentList").html("暂无评论");
      			    }
      			}else if(data.statusCode == -999){
      				//initLoginStatus(initCommentList(merchantspk,currentPage));
      			}else{
      				layer.open({content:data.message,skin: 'msg',time: 2});
      			}
      	},"json");
      }
    }
}
</script>
