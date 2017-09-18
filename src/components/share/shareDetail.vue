<template>
<div>
  <header>
      <div class="header">
          <h1>分享详情</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
          <a @click="pageTurn('../share/shareMap')" href="javascript:void(0);" class="return shareMap" style="float:right;right:0;left:inherit;"><i class="icon-map-marker"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="all_box">
  		<div class="read-new">
  			<div class="assDt-head">
  				<img src="./../../images/group/ts1.jpg" class="ass-img userPic">
  				<div class="assDt-txt">
  					<b><span class="shareTitle">--</span>
  						<span style="margin-right:5%;float:right;">
  						<b class="toUpdate" style="display:none;" @click="toUpdateShare()"><i class="icon-edit"></i></b>
  						<b class="toDelete" style="display:none;" @click="toDeleteShare()"><i class="icon-trash"></i></b>
  						</span>
  					</b>
  					<p><span class="shareName">--</span></p>
  				</div>
  			</div>
              <!--分享内容-->
        <div class="read-content">
  				<h1 class="shareTitle">--</h1>
              	<p class="read-time"><i class="icon-map-marker" style="padding-right:5px;"></i><span class="shareAddress">--</span></p>
  				<p class="read-time"><i class="icon-time" style="padding-right:5px;"></i><span class="shareTime">--</span></p>
              	<p style="padding:10px 0;" class="shareContent">--</p>
  				<div class="sharePics">
  				</div>
  				<div class="browseLike">
  					<span class="browse-i fl">浏览数&nbsp;<span class="shareViews">0</span></span>
  					<a href="javascript:;" class="like-i fr" @click="agreeShare()"><i class="icon-thumbs-up" style="padding:0 0.2rem;"></i><span class="shareLikes">0</span></a>
  					<div class="cl"></div>
  				</div>
        </div>
        <!--分享内容 end-->
        <!-- 分享评论 -->
        <div class="assDt-foot">
  				<p class="assDt-foot-head">评论(<span class="commentNum">0</span>)</p>
  				<ul class="commentList"></ul>
  				<div class="comment-read">
  					<a href="javascript:;" class="comment-btn" style="color:#fff;" @click="toCommentShare()">
  						<i class="icon-edit"></i>
  						评论
  					</a>
  				</div>
  				<!-- 动态评论end -->
  			</div>
  		</div>
  	</div>

  	<!--发表评论-->
  	<div class="comment-module shareComment" hidden="hidden">
  		<div class="kuang">
  			<div class="comment-h">
  				<i class="icon-remove close commentClose" @click="closeDialog()"></i>
  				<p>评论</p>
  				<button type="button" class="btn submitComment" @click="submitComment()">发送</button>
  			</div>
  			<div class="comment-con">
  				<textarea rows="6" class="userComment" ></textarea>
  			</div>
  		</div>
  	</div>

  	<!--分享更新-->
  	<div class="comment-module shareUpdate" hidden="hidden">
  		<div class="kuang" style="top:7.6rem;">
  			<div class="comment-h">
  				<i class="icon-remove close" @click="closeDialog()"></i>
  				<p>分享更新</p>
  			</div>
  			<div class="comment-con">
  				<form action="" method="get">
  					<p style="margin-left:0.8rem;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>分享标题</span></p>
  					<div class="firmIntro-box">
  						 <input type="text" placeholder="在这里输入分享标题" class="updateTitle">
  					</div>
  					<p style="margin-left:0.8rem;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>分享描述</span></p>
  					<div class="firmIntro-box">
  						<textarea rows="6" placeholder="在这里输入分享描述" class="updateDescribe"></textarea>
  					</div>
  					<a href="javascript:;" class="btn btn-max submitUpdate" style="margin:.5rem 0;background-color:#06C1AE;" @click="submitUpdate()">更新</a>
  				</form>
  			</div>
  		</div>
  	</div>
</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { initLoginStatus } from '../../utils/utils'

  import $ from 'jquery'
  var userpk = "";
  var sharesetPk = "";
  var _prepath = "";

  export default{
    name: 'ShareDetail',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      // 用户信息
      var userInfo = sessionStorage.getItem("userInfo");
        if(userInfo) {
        userInfo = JSON.parse(userInfo);
        userpk = userInfo.userpk;
      }
      sharesetPk = this.$route.query.sharesetPk;
      this.initShareDetail(sharesetPk);
      this.initShareComment(sharesetPk);
      this.addScanNum(sharesetPk);// 增加访问记录
      this.checkIsAgree(sharesetPk); // 判断是否已赞
      _prepath = sessionStorage.getItem("_prepath");
    },
    methods: {
      // 返回上一页
      pageBack:function(){
        if(_prepath){
          this.$router.replace({path:_prepath});
        }else{
          this.$router.replace({path:"/home?modelIndex=3"});
        }
      },
      pageTurn:function(turnPath){
        this.$router.replace({path:turnPath,query:{sharesetPk:sharesetPk}});
      },
      // 点击评论
      toCommentShare:function(){
        if(userpk==""){
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }else{
          $(".shareComment").show();
        }
      },
      // 点击更新
      toUpdateShare:function(){
        $(".shareUpdate").show();
      },
      // 点击关闭
      closeDialog:function(){
        $(".comment-module").hide();
      },
      // 初始化分享详情
      initShareDetail:function(sharesetPk){
        var initShareDetail = this.initShareDetail;
        var params = {
      		userPK:"",
      		queryNum:"1",
      		queryType:"",
      		shareSetPK:sharesetPk,
      		orderByViewTimes:"",
      		orderByLikeTimes:"",
      		beginNum:"0"
      	};
      	var loading = layer.open({type:2});
      	$.post(GLOBALURL.SHARE_JOURNEYSHARE_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		   if(result && result.length > 0){
      				var likeNum = result[0].sharesetclickliketimes;
      				var ulikeNum = result[0].sharesetclickunliketimes;
      				var viewsNum = result[0].sharesetviewtimes;
      				var content = result[0].sharesetcontent;
      				var title = result[0].sharesettitle;
      				var time = result[0].sharesettime;
      				var sharesetpk = result[0].sharesetpk;
      				var name = result[0].users.userinfo.userinfoname;
      				var shareUserpk = result[0].users.userpk;
      				var address = result[0].sharesetspiass[0].shareprograminfo.shareaddress;
      				var portraitUrl =  result[0].users.userinfo.userinfoprofileimageurl;
      				var imgSrc = result[0].sharesetspiass[0].shareprograminfo.shareimageurl;
      				var shareList = result[0].sharesetspiass;
      				$(".shareTitle").text(title);
      				$(".shareName").text(name);
      				$(".shareAddress").text(address);
      				$(".shareTime").text(time);
      				$(".userPic").attr("src",portraitUrl);
      				$(".shareViews").text(viewsNum);
      				$(".shareLikes").text(likeNum);
      				$(".shareContent").text(content);
      				$(".updateTitle").val(title);
      		    $(".updateDescribe").val(content);

      				if(shareUserpk == userpk){
      					$(".toUpdate").show();
      					$(".toDelete").show();
      				}else{
      					$(".toUpdate").hide();
      					$(".toDelete").hide();
      				}

      				var img_html = "";
      				for(var i=0;i<shareList.length;i++){
      					img_html += "<img src="+shareList[i].shareprograminfo.shareimageurl+">";
      				}
      				$(".sharePics").html(img_html);
      		   }
      		}else if(data.statusCode == -999){
      			//initLoginStatus(initShareDetail(sharesetPk));
      		}else{
      			layer.open({content:data.message,skin:'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	},"json");
      },
      // 初始化分享评论
      initShareComment:function(sharesetPk){
        var initShareComment = this.initShareComment;
        var params = {
      		"shareSetPK":sharesetPk,
      		"currentPage":"1"
      	};
      	$.post(GLOBALURL.SHARE_SHAREDETAIL_URL,params,function(data){
        		if(data.statusCode == 0){
          			var result = data.value.commentlist;
          			var html = "";
          		  if(result && result.length>0){
          				$(".commentNum").text(result.length);
          				for(var i=0;i<result.length;i++){
          					html += "<li>";
          					html += "	<a href=\"javascript:void(0);\" class=\"commentUser\">";
          					html += "		<div class=\"user-img\"><img src="+result[i].users.userinfo.userinfoprofileimageurl+"></div>";
          					html += "		<span>"+result[i].users.userinfo.userinfonickname;
          					html += "		</span>";
          					html += "		<span class=\"issue-time fr\">"+result[i].shareprograminfocommenttime+"</span>";
          					html += "		<span class=\"cl\"></span>";
          					html += "	</a>";
          					html += "	<div class=\"commentText\">";
          					html += "		<p class=\"aUserText\">"+result[i].shareprograminfocommentcontent+"</p>";
          					html += "	</div>";
          					html += "</li>";
          				}
          			}else{
          				html += "暂无评论";
          			}
          			$(".commentList").html(html);
          		}else if(data.statusCode == -999){
          			//initLoginStatus(initShareComment(sharesetPk));
          		}else{
          			layer.open({content:data.message,skin:'msg',time: 2});
          		}
         },"json");
      },

      // 增加访问记录
      addScanNum:function(sharesetPk){
         var params = {
       		 shareSetPK:sharesetPk,
       	 };
       	 $.post(GLOBALURL.SHARE_VIEWSHARE_URL,params,function(data){
       			if(data.statusCode == 0){
       			}else{
       				layer.open({content:data.message,skin:'msg',time: 2});
       			}
       	},"json");
      },

      // 判断是否已赞
      checkIsAgree:function(sharesetPk){
        var checkIsAgree = this.checkIsAgree;
    		var params = {
    			shareSetPK:sharesetPk,
    			userPK:userpk
    		};
    	  $.post(GLOBALURL.SHARE_ISSHARELIKED_URL,params,function(data){
    			if(data.statusCode == 0){
    				if(data.value && data.value=="1"){
    					$(".like-i").addClass("like-i-active");
    				}
    			}else if(data.statusCode == -999){
    				//initLoginStatus(checkIsAgree(sharesetPk));
    			}else{
    				layer.open({content:data.message,skin:'msg',time: 2});
    			}
    		},"json");
      },

      // 点赞
      agreeShare:function(){
        var agreeShare = this.agreeShare
    		if(userpk==""){
          layer.open({content:'请您先登录',skin:'msg',time: 2});
    		}else if($(this).hasClass("like-i-active")){
          layer.open({content:'请勿重复赞',skin:'msg',time: 2});
    		}else{
          var params = {
            shareSetPK:sharesetPk,
            userPK:userpk,
            action:"like"
          };
          $.post(GLOBALURL.SHARE_CLICKLIKESHARESET_URL,params,
             function(data){
             if(data.statusCode == 0){
                 var agreeNum = $(".like-i .shareLikes").text();
                 $(".like-i").addClass("like-i-active");
                 $(".like-i .shareLikes").text(Number(agreeNum)+1);
             }else if(data.statusCode == -999){
               //initLoginStatus(agreeShare());
             }else{
               layer.open({content:data.message,skin:'msg',time: 2});
             }
          },"json");
    		}
      },

      // 新增评论
      submitComment:function(){
        var submitComment = this.submitComment
        var initShareComment = this.initShareComment;
        var userComment = $(".userComment").val();
        if(userComment == ""){
          layer.open({content:'评论内容不能为空',skin:'msg',time: 2});
        }else if(userComment.length > 50){
          layer.open({content:'评论内容不能超过50个字符',skin:'msg',time: 2});
        }else{
            var params = {
              shareSetPK:sharesetPk,
              userPK:userpk,
              shareContent:userComment,
              type:"2"
            };
            $.post(GLOBALURL.SHARE_COMMENTSHARESET_URL,params,function(data){
              if(data.statusCode == 0){
                layer.open({content:'评论成功',skin:'msg',time: 2});
                $(".comment-module").hide();
                $(".userComment").val("");
                initShareComment(sharesetPk);
              }else if(data.statusCode == -999){
                //initLoginStatus(submitComment());
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
            },"json");
        }
      },

      // 分享删除
      toDeleteShare:function (){
        var toDeleteShare = this.toDeleteShare
        layer.open({
          content: '是否确认删除分享?'
          ,btn: ['确定', '取消']
          ,yes: function(index){
            layer.close(index);
            var params = {
              shareSetpks:sharesetPk,
            };
            $.post(GLOBALURL.SHARE_DELETESHARESET_URL,params,function(data){
             if(data.statusCode == 0){
               layer.open({content:'分享删除成功',skin:'msg',time: 2});
               window.location.href= "./../../views/share/ownShare.html";
             }else if(data.statusCode == -999){
               //initLoginStatus(shareDelete());
             }else{
               layer.open({content:data.message,skin:'msg',time: 2});
             }
            },"json");
          }
        });
      },

      // 分享编辑
     submitUpdate:function(){
       var submitUpdate = this.submitUpdate
       var updateTitle = $(".updateTitle").val();
       var updateDescribe = $(".updateDescribe").val();
       if(updateTitle == ""){
         layer.open({content:'分享标题不能为空',skin:'msg',time: 2});
       }else if(updateTitle.length > 20){
         layer.open({content:'分享标题不能超过20个字符',skin:'msg',time: 2});
       }else if(updateDescribe == ""){
         layer.open({content:'分享内容不能为空',skin:'msg',time: 2});
       }else if(updateDescribe.length > 500){
         layer.open({content:'分享内容不能超过500个字符',skin:'msg',time: 2});
       }else{
         var updateType = $("#updateSubmit").text();
         	var params = {
         		 shareSetPK:sharesetPk,
         		 shareContent:updateDescribe,
         		 shareTitle:updateTitle,
         		 shareStatus:"1",
         		 type:"1"
         	};
         	$.post(GLOBALURL.SHARE_COMMENTSHARESET_URL,params,function(data){
         		if(data.statusCode == 0){
              layer.open({content:'分享更新成功',skin:'msg',time: 2});
         			$(".comment-module").hide();
         			initShareDetail(sharesetPk);
         		}else if(data.statusCode == -999){
         			//initLoginStatus(submitUpdate());
         		}else{
         			layer.open({content:data.message,skin:'msg',time: 2});
         		}
         	},"json");
       }
    }
  }
}
</script>
