<template>
  <nav class="nav-bar nav-bar-tab" id="footerTab">
	    <a v-on:click="toggle(0,'主页')" class="nav-tab-item">
	        <span class="nav-icon icon-home"></span>
	        <span class="nav-tab-label">主页</span>
	    </a>
	    <a v-on:click="toggle(1,'群聊')" class="nav-tab-item">
	        <span class="nav-icon icon-group"><span class="nav-badge" style="display:none">0</span></span>
	        <span class="nav-tab-label">群聊</span>
	    </a>
	    <a v-on:click="toggle(2,'节目')" class="nav-tab-item">
	        <span class="nav-icon icon-music"></span>
	        <span class="nav-tab-label">节目</span>
	    </a>
	    <a v-on:click="toggle(3,'分享')" class="nav-tab-item">
	        <span class="nav-icon icon-share"></span>
	        <span class="nav-tab-label">分享</span>
	    </a>
	</nav>
</template>

<script>
  import { Tabbar,TabbarItem } from 'vux'
  import $ from 'jquery'
  export default{
    name: 'AppFooter',
    components: {
      Tabbar,
      TabbarItem,
    },
    data(){
      return{
      }
    },
    methods: {
        toggle: function (index,model) {
           //this.siblings('.nav-tab-item').removeClass("nav-active");
           $("#footerTab .nav-tab-item").removeClass("nav-active");
           $("#footerTab .nav-tab-item:eq("+index+")").addClass("nav-active");
           this.$emit('toggle',index,model);
        }
    }
  }
</script>
