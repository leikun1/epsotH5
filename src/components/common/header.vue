<template>
  <div>
		<header>
			<div class="header">
				<a href="javascript:void(0);" class="returnA"><h1 class="htitle">{{modelName}}</h1></a>
				<div class="hmap" id="toggleInfo" @click="toggle()"><span class="icon-th-list"></span></div>
			</div>
		</header>
		<div style="height: 2.5rem;"></div>
	</div>
</template>

<script>

  export default{
    name: 'AppHeader',
    props: ['model-name'],
    components: {
    },
    methods: {
      toggle: function () {
          this.$emit('toggle');
      }
    },
  }
</script>
