<template>
  <div class="all_box">
  	  <!-- 功能板块 -->
  	  <div class="big_button" id="shortCut">
  	    	<div style="width:100%;">
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/locus',true,true,'')"><i class="index-icon micon-menu01"></i><h3>轨迹</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/findcar',true,true,'')"><i class="index-icon micon-menu02"></i><h3>找车</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/pickup',true,true,'')"><i class="index-icon micon-menu03"></i><h3>接人</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('user/carstatus',true,true,'')"><i class="index-icon micon-menu30"></i><h3>车况</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/traffic',false,false,'')"><i class="index-icon micon-menu05"></i><h3>路况</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/merchants?merchantsType=加油',false,false,'')"><i class="index-icon micon-menu06"></i><h3>加油</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/merchants?merchantsType=洗车',false,false,'')"><i class="index-icon micon-menu07"></i><h3>洗车</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/merchants?merchantsType=修车',false,false,'')"><i class="index-icon micon-menu08"></i><h3>修车/保养</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('',false,false,'epsotshop')"><i class="index-icon micon-menu09"></i><h3>商城</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/professor',false,false,'')"><i class="index-icon micon-menu10"></i><h3>专家</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('',false,false,'onekeyCall')"><i class="index-icon micon-menu11"></i><h3>一键呼叫</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="big_rigt_p fl">
  					<a href="javascript:void(0);" @click="pageTurn('index/rescue',false,false,'')"><i class="index-icon micon-menu12"></i><h3>紧急救援</h3></a>
  					<div class="ind-bar2"></div>
  				</div>
  				<div class="cl"></div>
  	    </div>
     </div>
     <!-- 功能板块  end-->

     <!-- 轮播图 -->
     <swiper :list="adsList" auto style="width:100%;margin:0 auto;height:7.8rem;"  dots-class="custom-bottom" dots-position="center"></swiper>
     <!-- 轮播图 end-->

     <!-- 推荐商家 -->
     <div class="m-Mien" style="margin-bottom:2.5rem;">
       <b><em></em>推荐商家</b>
       <scroller lock-x scrollbar-y style="height:11rem;"  :bounce=false :scrollbarY="false" ref="scroller">
       <ul id="customerList">
         	<li v-for="customer in customerList" @click="customerDetail(customer.merchantspk)">
            <a :data-pk="customer.merchantspk" class="cl marchantsDetail">
              <img :src="customer.mycarstoreinfomainimage">
         			<div class="mienIntro">
         				<h1>{{customer.merchantsinfofullname}}</h1>
         				<div>
         					<span class="rate-status">
                  <span class="common-rating" style="vertical-align:middle;">
                  <span class="rate-stars" :style="customer.scoreWidth"></span></span></span>
                  <span class="revgrade">{{customer.commentnum}}人评价</span>
         					<p style="float:right;">{{customer.ordernum}}人已购买</p>
         				</div>
         				<p>{{customer.merchantsaddress}}</p>
         			</div>
         	</a></li>
       </ul>
       </scroller>
     </div>
     <!-- 推荐商家 end-->
  </div>

</template>

<script>
  import { Group,Cell,Swiper,Scroller,Divider } from 'vux'
  import { getAdsList,getAllMerchants } from '../utils/api'
  import $ from 'jquery'

  export default{
    name: 'Index',
    data(){
      return{
        adsList:[],
        customerList:[],
        pageIndex:1
      }
    },
    components:{
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper
    },
    created () {
      //this.getAdsList();
      //this.getAllMerchants();
    },
    methods:{
      async getAdsList() {
        let data = await getAdsList();
        var result = data.value;
        if(result && result.length>0){
          this.adsList = [];
          for(var i=0;i<result.length;i++){
            var imagesUrl = result[i].adssourceurl;
				  	var adslink  = result[i].adslink;
            var adsbrief =  result[i].adsbrief;
            this.adsList.push({
              url: 'javascript:void(0);',
              img: imagesUrl,
              brief:adsbrief
            });
          }
        }
      },
      async getAllMerchants() {
        let data = await getAllMerchants(this.pageIndex);
        var result = data.value;
        if(result && result.length>0){
          this.customerList = [];
          for(var i=0;i<result.length;i++){
            var score = result[i].score;
            var scoreWidth = 0;
            if(Number(score)){
              scoreWidth = (Number(score)/5)*100;
            }
            result[i].scoreWidth = "width:"+scoreWidth+"%";
            this.customerList.push(result[i]);
          }
        }
      },
      pageTurn:function(turnPath,needLogin,needDriver,turnType){
          var userInfo = sessionStorage.getItem("userInfo");
          var isDriver = sessionStorage.getItem("_isDriver");
      		if(needLogin && !userInfo){
            layer.open({content:'请您先登录...',skin:'msg',time: 2});
      		}else if(turnType == "onekeyCall"){ // 一键呼叫
      			layer.open({content:'抱歉,该功能暂不开放...',skin:'msg',time: 2});
      		}else if(turnType == "epsotshop"){ // 商城
            layer.open({content:'程序猿正在玩命开发中...',skin:'msg',time: 2});
      		}else if(isDriver=="false" && needDriver){
            layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
      		}else{
            this.$router.replace({path:turnPath});
          }
      },
      customerDetail:function(merchantspk){
        var turnPath = "index/companion";
        this.$router.replace({path:turnPath,query:{merchantspk:merchantspk}})
      }
    }
  }
</script>
