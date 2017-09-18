<template>
<div>
  <header>
      <div class="header">
          <h1>行驶录像</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 行驶录像 -->
  <div id="nodata"><a class="imgconfig"></a><span class="textconfig">暂无数据</span></div>
  <!--行驶录像end-->

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'

  export default{
    name: 'Videos',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
    }
}
</script>
