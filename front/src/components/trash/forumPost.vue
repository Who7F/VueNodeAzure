<template>
	<span v-for="n in myPost" :key = n.key>{{ n.title }}</span>
</template>

<script>
export default {
  name: 'forumPost',
  props: {
	myPost: Array
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
</style>
