<template>
<div>
  <header>
      <div class="header">
          <h1>{{searchType}}</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 接人 -->
	<div class="datum-box">
		<div class="input-group register-group">
			<div class="input-row reset-p">
				<label><i class="ba-color5 icon-music" style="font-size:1.4rem;"></i></label>
				<input id="searchName" type="text" placeholder="请输入搜索关键字" style="width:70%;">
				<a id="doSearch" class="btn cy-btn btn-red" style="float:right;width:2.3rem;text-align:center;margin:0.3rem;padding:0.04rem;" @click="doSearch">搜索</a>
			</div>
    </div>
    <div class="all_box programList" id="albumList"></div>
	</div>
	<!--接人-->

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { initLoginStatus } from '../../utils/utils'
  import $ from 'jquery'
  let _prepath = "";

  export default{
    name: 'ProgramSearch',
    components: {
    },
    data(){
      return{
        searchType:"搜音乐",
        categoryId:"2"
      }
    },
    created () {
      this.categoryId = this.$route.query.categoryId;
      var programType = "搜音乐"
      if(this.categoryId == "1"){ // 新闻
        programType = "搜新闻";
      }else if(this.categoryId == "2"){ // 音乐
        programType = "搜音乐";
      }else if(this.categoryId == "3"){ // 小说
        programType = "搜小说";
      }else if(this.categoryId == "12"){ // 相声
        programType = "搜相声";
      }
      this.searchType = programType;
      _prepath = sessionStorage.getItem("_prepath");
    },
    methods: {
      // 返回上一页
      pageBack:function(){
        if(_prepath){
          this.$router.replace({path:_prepath});
        }else{
          this.$router.replace({path:"/home?modelIndex=2"});
        }
      },
      // 搜索
      doSearch:function(){
        var searchName = $("#searchName").val();
        if(!searchName){
          layer.open({content:'请输入搜索内容...',skin: 'msg',time: 2});
        }else{
          var categoryId = this.categoryId;
          var router =  this.$router;
          var loading = layer.open({type: 2});
          var params = {
            "categoryCode":"1004",
            "dataCount":"20",
            "dataPage":"1",
            "categoryId":categoryId,
            "searchName":searchName
          };
          $.post(GLOBALURL.DO_QUERY_XMLAPROGRAM_INFO,params,function(data){
            if(data.statusCode == 0){
              var datainfo = data.value;
              if(datainfo){
                datainfo = JSON.parse(datainfo);
                var result = datainfo.albums;
                var html = "";
                if(result && result.length > 0){
                  for(var i=0;i<result.length;i++){
                    html +="<div class=\"card_ecchange plus-pass\" data-id="+result[i].id+">";
                    html +="	<i class=\"images_card\"><img src='"+result[i].cover_url_large+"'></i>";
                    html +="	<h1>"+result[i].album_title+"</h1>";
                    html +="	<p class=\"title\">"+(result[i].album_intro?result[i].album_intro:result[i].album_title)+"</p>";
                    html +="	<p><i class=\"icon-play\"></i>"+result[i].play_count+"<i class=\"icon-paper-clip\"></i>"+result[i].include_track_count+"集</p>";
                    html +="</div>";
                  }
                }else{
                  html +="<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\" style=\"left:28%;top:50%;\">没有相关数据，换个关键词搜索吧</span></div>";
                }
                $("#albumList").html(html);
                $("#albumList .card_ecchange").click(function(){
                   // 1:小说  2:音乐  3:相声 4:直播 5:新闻  6:电台 7:其它    (999  巨能音乐 998巨能 UGC )
                   var albumId = $(this).attr("data-id");
                   var programType = "2";
                   if(categoryId == "1"){ // 新闻
                     programType= "5";
                   }else if(categoryId == "2"){ // 音乐
                     programType = "2";
                   }else if(categoryId == "3"){ // 小说
                     programType = "1";
                   }else if(categoryId == "12"){ // 相声
                     programType = "3";
                   }
                   router.replace({path:"../program/programList?programType="+programType+"&albumId="+albumId});
                 });
              }
            }else if(data.statusCode == -999){
            }else{
              layer.open({content:data.message,skin: 'msg',time: 2});
            }
            // 等待层
            setTimeout(function(){
              layer.close(loading);
            },200);
          });
        }
      }
    }
}
</script>
