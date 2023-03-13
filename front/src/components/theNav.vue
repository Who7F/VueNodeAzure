<template>
	<div class = 'nav'>
		<h3 v-if ='$store.getters.user'>Welcome {{ $store.getters.user}} </h3>
		<h3 v-if ='!$store.getters.user'>You are not loggen in</h3>
		<nav>
			<ul>
				
				<li><router-link to='/'>Home</router-link></li>
				<li v-if ='!$store.getters.user'><router-link to='/signup'>signup</router-link></li>
				<li v-if ='$store.getters.user'><router-link to='/posts'>Posts</router-link></li>
				<li v-if ='$store.getters.user'><router-link to='/create'>Create Post</router-link></li>
				<li v-if ='$store.getters.user'><router-link to='/account'>Account</router-link></li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default{
		namm: 'myNav',
		props: {
			userName:{
				type: String,
				default: null
			}
		}
	}
	
</script>

<style scoped lang="scss">
.nav{
	display: Flex;
	flex-wrap: wrap;
	justify-content: space-between;
	
	background-color: rgba(255,50,50, 0.6);
	padding-left: 1rem;
	
	h3 {
		margin: 1.5rem;
		color: black;
		
		
		
	}
}

nav{
	display: Flex;
	flex-wrap: wrap;
	
	
	padding: 1rem;	
}
.vue-active-link {
	font-size: 1.5rem;
	font-family: Cursive, sans-serif;
	text-decoration: red wavy underline;
	
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
  color: black;
  text-decoration: none;
  font-weight: 900;
}
img {
	width: 20em;
	height: 20em;
}
</style>