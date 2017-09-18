<template>
<div>
  <div>
  <header>
        <div class="header">
            <h1>我的分享</h1>
            <router-link slot="left" to="/home?modelIndex=3" class="return" ><i class="icon-chevron-left"></i></router-link>
            <a @click="pageTurn('../share/shareMap')" href="javascript:void(0);" class="return shareMap" style="float:right;right:0;left:inherit;"><i class="icon-map-marker"></i></a>
        </div>
  </header>
  <div style="height: 2.5rem;"></div>
  </div>

  <div id="container">
    <!-- 头部选择项 -->
    <div class="firmL-nav">
      <ul class="firmL-nav-U myassociation-nav">
        <li style="width:100%;" :class="{active:isActive}" >
          <span class="queryType" @click="isActive=!isActive" ><strong data-type="1">发布时间</strong><i class="icon-chevron-down" style="padding:0 0.4rem;"></i></span>
          <div class="firmLBox">
            <div class="firmLText">
              <p class="active" @click="queryData('1','发布时间')">发布时间</p>
              <p @click="queryData('2','浏览次数')">浏览次数</p>
              <p @click="queryData('3','点赞次数')">点赞次数</p>
            </div>
            <div class="firmLBg"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="all_box shareList" style="margin-top:2.5rem;">
    <!--分享列表-->
    <!--分享列表end-->
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import $ from 'jquery'
  import { initLoginStatus } from '../../utils/utils'

  export default{
    name: 'OwnShare',
    components: {
    },
    data(){
      return{
        isActive:false
      }
    },
    created () {
      this.initNearShareList();
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      pageTurn:function(turnPath){
        var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo){
          userInfo = JSON.parse(userInfo);
          var userPk = userInfo.userpk;
          this.$router.replace({path:turnPath,query:{userPk:userPk}});
        }
      },
      queryData:function(queryType,queryName){
        $(".queryType strong").text(queryName);
    		$(".queryType strong").attr("data-type",queryType);
    		this.initNearShareList();
        this.isActive = !this.isActive;
        $(".firmLText p:eq("+(queryType-1)+")").toggleClass('active').siblings().removeClass('active');
      },
      initNearShareList:function(){
        var initNearShareList = this.initNearShareList;
        var router =  this.$router;
        var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo){
        userInfo = JSON.parse(userInfo);
        var userpk = userInfo.userpk;
        var currentPage = 1;
        var orderByView = "";
        var orderByTime = "";
        var orderByLike = "";
        var queryType = $(".queryType strong").attr("data-type");
        if(queryType == "1"){
          orderByTime = "1";
        }else if(queryType == "2"){
          orderByView = "1";
        }else{
          orderByLike = "1";
        }
        var loading = layer.open({type: 2});
        var params = {
          userPK:userpk,
          queryNum:"20",
          beginNum:"",
          queryType:"",
          shareSetPK:"",
          orderByViewTimes:orderByView,
          orderByLikeTimes:orderByLike,
          shareSetTime:orderByTime,
          shareStatus:"1",
          currentPage:currentPage  //当前页数
       };
       $.post(GLOBALURL.SHARE_JOURNEYSHARE_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
              if(result && result.length>0){
              for(var i=0;i<result.length;i++){
                var shareImg = result[i].sharesetspiass[0].shareprograminfo.shareimageurl;
                shareImg = shareImg?shareImg:logoSrc;
                html += "<div class=\"card_ecchange plus-pass\" data-pk="+result[i].sharesetpk+">";
                html += "	<i class=\"images_card\"><img src="+shareImg+"></i>";
                html += "	<span><i class=\"ba-color3 icon-picture\"></i></span>";
                html += "	<h1>"+result[i].sharesettitle+"</h1>";
                html += "	<p>"+result[i].sharesettime+"</p>";
                html += "	<p style=\"color:#10aeff;\">浏览次数:<b style=\"margin-right:0.8rem;\">"+result[i].sharesetviewtimes+"</b>点赞次数:<b>"+result[i].sharesetclickliketimes+"</b></p>";
                html += "</div>";
              }
            }else{
              html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
            }
            $(".shareList").html(html);
            $(".shareList .card_ecchange").click(function(){
              var sharesetPk = $(this).attr("data-pk");
               router.replace({path:"../share/shareDetail",query:{sharesetPk:sharesetPk}});
            });
          }else if(data.statusCode == -999){
            //initLoginStatus(initNearShareList());
          }else{
            layer.open({content:data.message,skin:'msg',time: 2});
          }
           // 等待层
           setTimeout(function(){
             layer.close(loading);
           },200);
         },"json");
       }
    }
  }
}
</script>
