<template>
<div>
  <header>
      <div class="header">
          <h1>一键救援</h1>
          <router-link slot="left" to="/home?modelIndex=0" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 救援电话 -->
	<div class="datum-box">
		<ul class="datum-list">
			<li class="dropdown">
				<a href="javascript:void(0);">
				<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color3 icon-truck"></i><b>拖车</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="javascript:void(0);">
					<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color icon-facetime-video"></i><b>保险/出险</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="tel:120">
				<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color ba-color3 icon-ambulance"></i><b>120</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="tel:110">
					<h1 data-toggle="dropdown" class="vtitle"><i class="ba-color icon-bell-alt"></i><b>110</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
		</ul>
	</div>
	<!--救援电话end-->

</div>
</template>

<script>

  export default{
    name: 'Rescue',
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
