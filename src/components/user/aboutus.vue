<template>
<div>
  <header>
      <div class="header">
          <h1>关于我们</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 我的社区 Myassociation -->
 	<div class="Myassociation">
 		<!-- 社区头部信息 -->
 		<div class="mya-head">
 			<div class="mya-logoTxt">
 				<img src="./../../images/epsot_logo.jpg">
 				<div class="mya-txt">
 					<h1>武汉巨能集群科技有限公司</h1>
 					<p>武汉市硚口区汉西路长青灯饰城3楼</p>
 					<p>邮编：430000</p>
 					<p>电话：027-8388-3328</p>
 					<p>网址：<a href="javascript:void(0);">http://www.epsot.cn</a></p>
 				</div>
 				<div class="cl"></div>
 			</div>
 			<div class=""></div>

 		</div>
 		<!-- 社区头部信息 end-->
 		<!-- 文化理念，服务范畴，联系我们，视频 -->
 		<div class="mya-content">
 			<ul class="datum-list">
 				<li class="dropdown">
 					<h1 data-toggle="dropdown" class="vtitle">
 						<i class="icon-tags"></i>
 						<b>文化理念</b>
 						<span class="icon-angle-right"></span>
 					</h1>
 					<div class="dropdown-menu show">
 						<div class="M-concept">
 							<div class="concept-list">
 								<span>企业理念</span>
 								<p>为车车主而生,因服务而强,颠覆您的驾驶体验。</p>
 							</div>
 							<div class="concept-list">
 								<span>企业文化</span>
 								<p>公司致力于打造简单，舒适，安全，互联，分享的车联网生活。为每一位车主提供方便，快捷，高效的服务。解决车主在行车过程中遇到的难题。</p>
 							</div>
 						</div>
 					</div>
 				</li>
 				<li class="dropdown">
 					<h1 data-toggle="dropdown" class="vtitle">
 						<i class="icon-star"></i>
 						<b>公司介绍</b>
 						<span class="icon-angle-right"></span>
 					</h1>
 					<div class="dropdown-menu show">
 						<div class="M-concept">
 							<p>武汉巨能集群科技有限公司成立于2014年，注册资金100万，是湖北武汉一家专注于汽车智能后视镜，提升车主驾驶体验的新兴的互联网企业。以软件、硬件结合的方式，实现车主与车主，车主与客服、等多方互联，为广大车主提供更智能、更便利、更保障的的互联驾驶服务，全方位提高车主的驾驶体验。</p>
 							<p>本着“安全、舒适、诚挚、专业、快速、满意、卓越、自由”的服务理念，吸收新创意，严把质量关，全方位服务跟踪，坚持做出高品质产品，超贴心服务。</p>
 							<p>目前，巨能集群科技组建了一支极具敬业、创造和进取精神的高素质管理团队。公司的研发团队是一批具有无限激情的行业顶尖人才，包括各种获得专业资格认证的硬件、软件高级工程师与工程技术人员。公司在产品设计、项目管理、软件开发等方面具有雄厚的技术实力和丰富的实践经验。</p>
 							<p>巨能集群科技秉承“科技以人为本”的理念，以高科技为依托，良好的运营模式和服务质量为基石，坚持以最先进的技术、最稳定的性能和最优质的质量服务于广大用户。我们致力于一切为了车主的方便，让越来越多的车主享受到服务带来的便捷。</p>
 					    </div>
 					</div>
 				</li>
 				<li class="dropdown">
 					<h1 data-toggle="dropdown" class="vtitle">
 						<i class="icon-phone"></i>
 						<b>联系方式</b>
 						<span class="icon-angle-right"></span>
 					</h1>
 					<div class="dropdown-menu show">
 						<div class="M-concept">
 							<div class="Contacts">
 								<p><i class="icon-uniE953"></i><span>地址:</span>武汉市硚口区汉西路长青灯饰城3楼</p>
 								<p><i class="icon-uniE913"></i><span>电话:</span>027-8388-3328</p>
 								<p><i class="icon-uniE902"></i><span>手机:</span>186-0274-5687</p>
 								<p><i class="icon-112"></i><span>邮箱:</span>hr@epsot.cn</p>
 							</div>
 						</div>
 					</div>
 				</li>
 			</ul>
 		</div>
 		<!-- 文化理念，服务范畴，联系我们，视频 end-->
 	</div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'

  export default{
    name: 'Aboutus',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      this.initPage();
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      initPage:function(){
        var dropdown = document.querySelectorAll('.dropdown');
    		var dropdownArray = Array.prototype.slice.call(dropdown,0);
    		dropdownArray.forEach(function(el){
    			var button = el.querySelector('h1[data-toggle="dropdown"]'),
    					menu = el.querySelector('.dropdown-menu'),
    					arrow = button.querySelector('span.icon-uniE926');

    			button.onclick = function(event) {
    				if(!menu.hasClass('show')) {
    					menu.classList.add('show');
    					menu.classList.remove('hide');

    					event.preventDefault();
    				}
    				else {
    					menu.classList.remove('show');
    					menu.classList.add('hide');

    					event.preventDefault();
    				}
    			};
    		})
    		Element.prototype.hasClass = function(className) {
    			return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
    		};
      }
    }
}
</script>
