<template>
<div>
  <header>
      <div class="header">
          <h1>本地节目</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="m-Mien">
		<ul class="programList"></ul>
	</div>

	<!-- 节目操作 -->
	<div class="comment-module programAction" hidden="hidden">
		<div class="kuang" style="left:2.5rem;right:2.5rem;">
			<div class="comment-h">
				<i class="icon-remove close actionClose" style="float:right;" @click="actionClose()"></i>
				<p class="programName" style="font-size:0.8rem;" data-pk="" data-title="">--</p>
			</div>
			<div class="comment-con">
				<ul class="datum-list">
					<li class="dropdown" @click="programPlay()" >
						<a href="javascript:void(0);">
							<h1 data-toggle="dropdown" id="programPlay" class="vtitle" style="line-height:2.5rem;height:2.5rem;"><i style="line-height:2.5rem;" class="ba-color icon-play"></i><b>车机播放</b></h1>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import { initLoginStatus } from '../../utils/utils'
  var userpk = "";

  export default{
    name: 'LocalList',
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
    		userpk = userInfo.userpk;
        this.initLocalList(userpk);
    	}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 关闭对话框
      actionClose:function(){
        $(".comment-module").hide();
      },
      // 车机播放
      programPlay:function(){
        var localprogramPK = $(".programName").attr("data-pk");
        var localprogramTitle = $(".programName").attr("data-title");
        this.doProgramPlay(userpk,localprogramPK,localprogramTitle);
      },
      // 初始化车机本地列表
      initLocalList:function(userpk){
          var initLocalList = this.initLocalList;
        	var params = {
        		userPK:userpk
        	};
         	$.post(GLOBALURL.DO_POST_LOCAL_PROGRAM_IN_SD,params,function(data){
        		if(data.statusCode == 0){
        			var result = data.value;
        			if(result && result.length > 0){
        				var html = "";
        				for(var i=0;i<result.length;i++){
        					html += "<li>";
        					html += "	<a href=\"javascript:void(0);\" class=\"cl programinfo\" data-pk="+result[i].localprogrampk+">";
        					html += "		<div class=\"title\">";
        					html += "			</sapn><h1>"+result[i].localprogramtitle+"</h1>";
        					html += "		</div>";
        					html += "		<p class=\"info\">";
        					html += "			<span><i class=\"icon-user\"></i>本地音乐库</span>";
        					html += "			<span style=\"padding-left:10px;\"><i class=\"icon-folder-open\"></i>音乐</span>";
        					html += "			<span><i class=\"icon-tasks\"></i></span>";
        					html += "		</p>";
        					html += "	</a>";
        					html += "</li>";
        				}
        				$(".programList").html(html);
        				$(".programList li a").click(function(){
        					var programName = $(this).find("h1").text();
        					var programInfoPK = $(this).attr("data-pk");
        					$(".programName").text(programName);
        					$(".programName").attr("data-pk",programInfoPK);
        					$(".programName").attr("data-title",programName);
        					$(".programAction").show();
        				});
        		   }
        		}else if(data.statusCode == -999){
        			//initLoginStatus(initLocalList(userpk));
        		}else{
              layer.open({content:data.message,skin: 'msg',time: 2});
        		}
         	});
        },

        // 车机播放
        doProgramPlay:function(userpk,localprogramPK,localprogramTitle){
          var doProgramPlay = this.doProgramPlay;
        	var userInfo = sessionStorage.getItem("userInfo");
        	var userpk = "";
            if(userInfo) {
        		userInfo = JSON.parse(userInfo);
        		userpk = userInfo.userpk;
        		var params = {
        			"userPK":userpk,
        			"localProgranPK":localprogramPK,
        			"localProgramTitle":localprogramTitle
        		};
        		$.post(GLOBALURL.DO_PLAY_LOCAL_PROGRAM_IN_SD,params,function(data){
        			if(data.statusCode == 0){
                layer.open({content:data.message,skin: 'msg',time: 2});
        				$(".comment-module").hide();
        			}else if(data.statusCode == -999){
        				//initLoginStatus(programPlay(userpk,localprogramPK,localprogramTitle));
        			}else{
                layer.open({content:data.message,skin: 'msg',time: 2});
        			}
        		});
        	}
        }
    }
}
</script>
