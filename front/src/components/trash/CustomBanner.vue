<template>
  <div>
	<span v-if='top' :class = "top">{{ left }}</span>
    <p>say</p>
	<slot name ='top'></slot>
  </div>
</template>

<script>
export default {
  name: 'CustomBanner',
  props:{
	top: String,
	left: String,
	test: String,
	right: String,
	Bottem: String,
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
	width: 20em;
	height: 20em;
}
.top {
	color: red;
}
</style>