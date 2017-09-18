<template>
<div>
  <header>
      <div class="header">
          <h1>系统故障</h1>
          <a href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

	<div class="firmDetails">
    <div class="datum-box">
  		<ul class="datum-list">
  		</ul>
  	</div>
    <div class="datum-box" style="display:none;">
        <div class="firmD-img" style="padding:1.6rem 0;background-color:#f6f6f6;"><img src="./../../images/user/car_model_02.jpg"></div>
        <div class="itemlist">
          <div class="itemDetail">
            <span>详情</span>
            <div class="item">
              <p class="trobleId">• 行驶到专业的维修机构检修。</p>
              <p class="trobleBrif">• 拨打专业维修机构电话，把当前的情况详细说明，听从专业人士的指引。</p>
            </div>
          </div>
      </div>
    </div>
	</div>
</div>
</template>
<style>
.itemDetail span{
  float:left;
  border-radius: 50%;
  background: #ccc;
  color:#fff;
  margin: 1.2rem 1rem;
  width:2.1rem;
  height:2.1rem;
  text-align:center;
  line-height: 2rem;
}
.itemDetail .item{
  padding: 1rem 0 1rem 4rem;
  border-bottom: 1px solid #d9d9d9;
}
</style>
<script>
  import GLOBALURL from './../../utils/global'
  import $ from 'jquery'
  import CARLOGO from './../../images/user/carlogo.png'
  let typeList = {};
  let troubleList = [];
  let trobleSystems = [];
  let prepages = ["first"];
  export default{
    name: 'Carsystem',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      var userpk = "";
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userpk = userInfo.userpk;
        this.initOBDTroubleInfo(userpk);
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 初始化车况故障信息
      initOBDTroubleInfo:function(userpk){
        var initOBDNewTrouble = this.initOBDNewTrouble;
      	var params = {
           "status":"1"
      	};
      	$.post(GLOBALURL.DO_QUERY_OBDTROUBLELIST,params,function(data){
      		if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length>0){
              trobleSystems = [];
              for(var i=0;i<result.length;i++){
                var systemData = {};
                systemData.itemid = result[i].obdtroublecodetypepk;
                systemData.itemname = result[i].obdtroublecodetypename;
                systemData.itempid = result[i].obdtroublecodetypeppk?result[i].obdtroublecodetypeppk:"0";
                systemData.itemnum = 0;
                systemData.itemlevel = result[i].obdtroublecodetypelevel;
                systemData.isleaf = result[i].obdtroublecodetypeisleaf;
                trobleSystems.push(systemData);
              }
              initOBDNewTrouble(userpk);
            }
      		}else if(data.statusCode == -999){
      		}else{
            layer.open({content:data.messgae,skin:'msg',time: 2});
      		}
      	});
      },

      // 初始化个人故障
      initOBDNewTrouble:function(userpk){
        var initTypeList = this.initTypeList;
        var initPageHtml = this.initPageHtml;
        var params = {
          "userPK":userpk,
        };
        $.post(GLOBALURL.DO_QUERY_OBDNEWTROUBLE,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            if(result){
              var html = "";
              troubleList = [];
              for(var i=0;i<result.length;i++){
                var troubleInfo = {};
                var pid = result[i].obdtroublecodetypepk;
                var ppid = result[i].obdtroublecodetypeppk?result[i].obdtroublecodetypeppk:"0";
                troubleInfo.breif = result[i].obdtroublecodebreif;
                troubleInfo.code = result[i].obdtroublecodevalue;
                troubleInfo.pid = pid;
                troubleInfo.ppid = ppid;
                troubleList.push(troubleInfo);
                initTypeList(pid);
              }
              // 初始化树形数组
              typeList = {};
              for(var j=trobleSystems.length-1;j>-1;j--){
                  if(typeList[trobleSystems[j].itempid]){
                      typeList[trobleSystems[j].itempid].push(trobleSystems[j]);
                  }else{
                      typeList[trobleSystems[j].itempid]=[];
                      typeList[trobleSystems[j].itempid].push(trobleSystems[j]);
                  }
              }
              initPageHtml(0);
            }
          }else if(data.statusCode == -999){

          }else{
            layer.open({content:data.messgae,skin:'msg',time: 2});
          }
        });
      },
      initTypeList:function(pid){
        for(let i=0;i<trobleSystems.length;i++){
          if(pid == trobleSystems[i].itemid ){
            trobleSystems[i].itemnum += 1;
            if(trobleSystems[i].itemlevel!="0"){
              this.initTypeList(trobleSystems[i].itempid);
            }
          }
        }
      },
      initPageHtml:function(id){
        var router = this.$router;
        var initPageHtml = this.initPageHtml;
        var html = "<ul class=\"datum-list\">";
        for(let i=0;i<typeList[id].length;i++){
          var itemnum = typeList[id][i].itemnum;
          if(itemnum > 0){
            itemnum = "<small class=\"vux-badge vux-badge-single\" style=\"float:left;margin:1.1rem 0.4rem 0 0;\">"+itemnum+"</small>"
          }else{
            itemnum = "";
          }
          html +="<li class=\"dropdown\">";
          html +="  <a href=\"javascript:void(0);\" data-id="+typeList[id][i].itemid+" data-level="+typeList[id][i].itemlevel+" data-isleaf="+typeList[id][i].isleaf+">";
          html +="    <h1 data-toggle=\"dropdown\" class=\"vtitle\"><b>"+typeList[id][i].itemname+"</b><span class=\"icon-angle-right\">"+itemnum+"</span></h1>";
          html +="  </a>";
          html +="</li>";
        }
        html +="</ul>";
        $(".datum-box:eq(0)").html(html);
        $(".datum-box:eq(0) a").click(function(){
            var pageid = $(this).attr("data-id");
            var level = $(this).attr("data-level");
            var isleaf = $(this).attr("data-isleaf");
            if(isleaf == "0"){
              initPageHtml(pageid);
              prepages.push(id);
            }else{
              var detailhtml = "";
              for(let i=0;i<troubleList.length;i++){
                if(troubleList[i].pid == pageid){
                  detailhtml +="<div class=\"itemDetail\">";
                  detailhtml +="  <span>详情</span>";
                  detailhtml +="  <div class=\"item\">";
                  detailhtml +="    <p class=\"trobleId\">• "+troubleList[i].code+"</p>";
                  detailhtml +="    <p class=\"trobleBrif\">• "+troubleList[i].breif+"</p>";
                  detailhtml +="  </div>";
                  detailhtml +="</div>";
                }
              }
              if(detailhtml){
                $(".datum-box:eq(1) .itemlist").html(detailhtml);
                $(".datum-box").hide();
                $(".datum-box:eq(1)").show();
              }else{
                layer.open({content:'该类型下暂未发现故障信息！',skin: 'msg',time: 2});
              }
            }
        });
        $(".return").unbind("click").click(function(){
            var prepageId = prepages[prepages.length-1]
            if(!$(".datum-box:eq(1)").is(":hidden")){
              $(".datum-box").hide();
              $(".datum-box:eq(0)").show();
            }else if(prepageId == "first"){
              router.replace({path:"/user/carcheck"});
            }else{
              initPageHtml(prepageId);
              prepages.pop();
            }
        });
      }

    }
}
</script>
