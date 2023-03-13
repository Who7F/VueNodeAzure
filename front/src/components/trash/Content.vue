<template>
	
	<div>
		<p>{{ message}}</p>
		<Posts @message-sent='sentMessage'/>
	</div>
</template>



<script>
import Posts from './Posts.vue'

export default {
  name: 'myContent',
  components: {
	Posts
  },
  data () {
	return {message : 'what do wat want'}
  },
  methods: {
	sentMessage(payload){
		
		this.message = payload.message
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
