<template>
	<button v-on:click ='sendMrssage'>click</button>
	<p>Are you beinf used</p>
</template>

<script>
export default {
  name: 'myPosts',
  methods: {
	sendMrssage(){
		console.log('click')
		this.$emit('message-sent',{
			message: 'eat all dics'	
		})
	}
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
