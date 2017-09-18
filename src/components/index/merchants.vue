<template>
<div >
  <header>
      <div class="header">
          <h1>{{merchantsType}}</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>
  <div id="container">
    <div id="sort">
      <table width="100%" border="0" cellspacing="0">
        <tbody><tr style="background-color:#fff;">
          <td class="sort_left" style="width:35%;border-right:1px solid #f1f1f1" @click="dialogShow()">
            <div class="sort_cate">
              <div class="sort_b"><a href="javascript:void(0);" onclick="return false;"><div class="sort_b_inner"><i class="cate_default"></i><span>武汉市</span><span style="line-height:40px;" class="icon-chevron-down"></span><div class="clear"></div></div></a></div>
            </div>
          </td>
          <td>
            <div class="sort_sort">
              <div style="width:100%;"><a href="javascript:void(0);" onclick="return false;"><div class="sort_b_inner"><i class="s sort_re"></i><span>地区</span><div class="clear"></div></div></a></div>
            </div>
          </td>
          <td class="sort_right">
            <div class="sort_tag">
              <div style="width:100%;"><a href="javascript:void(0);" onclick="return false;"><div class="sort_b_inner"><i class="cate_tag"></i><span id="areaName">硚口区</span><div class="clear"></div></div></a></div>
            </div>
          </td>
        </tr>
      </tbody></table>
    </div>
    <div id="content">
      <div id="list">
        <ul id="merchantsList" style="border-top:1px solid #f1f1f1;">
          <li v-for="merchant in merchantsList">
          	<div class="wrap">
          		<a class="alist">
          			<div class="list_litpic fl"><img :src="merchant.picUrl"></div>
          			<div class="list_info">
          				<h4>{{merchant.name}}</h4>
          				<h5>{{merchant.address}}</h5>
          				<h5>{{merchant.tel}}</h5>
          				<div class="list_info_i">
          					<dl class="list_info_views"><dt><i class="ba-color6 icon-shopping-cart"></i></dt><dd>0</dd></dl>
          					<dl class="list_info_comment"><dt><i class="ba-color6 icon-comments-alt"></i></dt><dd>0</dd></dl>
          					<dl class="list_info_like"><dt><i class="ba-color6 icon-map-marker"></i></dt><dd>1.998km</dd></dl>
          				</div>
          			</div></a>
          	</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="push_msk"></div>
  </div>
  <div id="sort_content" style="width:100%;display:none;">
    <div class="asort">
      <div class="hd">
        <div class="wrap">
          <div class="fl"><span>选择区域</span><div class="clear"></div></div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="ct" style="height: 580px;" id="areaList">
        <div class="wrap">
          <ul class="choose_cate" s>
            <li v-for="(area, index) in areaList" :data-type="area.areaNo" @click="selectArea(area.areaNo,area.areaName,index)" style="font-weight:700;"><i style="background:none;width:0;margin-right:0;" class="s"></i><span>{{area.areaName}}</span><i class="e"></i></li>
            <!-- <li data-type="420102" style="font-weight:700;"><i style="background:none;width:0;margin-right:0;" class="s"></i><span>江岸区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420103"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>江汉区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420104"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>硚口区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420105"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>汉阳区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420106"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>武昌区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420107"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>青山区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420111"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>洪山区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420112"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>东西湖区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420113"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>汉南区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420114"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>蔡甸区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420115"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>江夏区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420116"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>黄陂区</span><i class="e"></i></li>
            <li style="font-weight:700;" data-type="420117"><i style="margin-right:0;background:none;width:0;" class="s"></i><span>新洲区</span><i class="e"></i></li> -->
          </ul>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
@import './../../styles/style.css';
</style>
<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { initLoginStatus } from '../../utils/utils'

  export default{
    name: 'Merchants',
    data(){
      return{
        merchantsList:[],
        merchantsType:"洗车",
        areaList:[{"areaName":'江岸区',"areaNo":'420102'},{"areaName":'江汉区',"areaNo":'420103'},{"areaName":'硚口区',"areaNo":'420104'},{"areaName":'汉阳区',"areaNo":'420105'},
        {"areaName":'武昌区',"areaNo":'420106'},{"areaName":'青山区',"areaNo":'420107'},{"areaName":'洪山区',"areaNo":'420111'},{"areaName":'东西湖区',"areaNo":'420112'},
        {"areaName":'汉南区',"areaNo":'420113'},{"areaName":'蔡甸区',"areaNo":'420114'},{"areaName":'江夏区',"areaNo":'420115'},{"areaName":'黄陂区',"areaNo":'420116'},{"areaName":'新洲区',"areaNo":'420117'}]
      }
    },
    created () {
      this.merchantsType = this.$route.query.merchantsType;
      this.getMerchantsList(this.merchantsType,'420104');
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
    dialogShow:function(){
        $("#container").hide();
        $("#sort_content").show();
        $('#sort_content').addClass('show');
        $('.asort').addClass('show');
    },
    selectArea:function(areaNo,areaName,areaIndex){
        $("#container").show();
        $("#sort_content").hide();
        $('#areaList li').removeClass("a_selected");
        $("#areaList li:eq("+areaIndex+")").addClass("a_selected");
        $('#sort_content').removeClass('show');
        setTimeout(function() {
          $("#sort_content .asort").removeClass('show');
        }, 300);
        $("#areaName").text(areaName);
        this.getMerchantsList(this.merchantsType,areaNo);
    },
    // 调用查询接口
    async getMerchantsList(keywords,areaNo){
        var getMerchantsList = this.getMerchantsList;
        this.merchantsList = [];
        var loading = layer.open({type: 2});
        var merchantsList = this.merchantsList;
        var params = {
      		"keywords":keywords,
      		"pagesize":"10",
      		"pagenum":"1",
      		"areanum":areaNo
      	};
      	$.post(GLOBALURL.MAP_MERCHANTSLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      		  var result = data.value[0];
      		  if(result){
      				var dataList = result.list;
      				if(dataList && dataList.length>0){
      					for(var i=0;i< dataList.length;i++){
      						var address = dataList[i].address;
      						var mechantName = dataList[i].name;
      						var picUrl = dataList[i].templateData.pic_info;
      						picUrl = picUrl?picUrl:logoSrc;
                  dataList[i].picUrl = picUrl;
                  merchantsList.push(dataList[i]);
      					}
      				}
      			}
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initMerchants(keywords,areanum));
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          layer.close(loading);
      	},"json")
      }
    }
}
</script>
