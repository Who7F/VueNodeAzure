<template>
  <header class="header">
	<div class ="left" >
    <img alt="logo" src="../assets/icon.png">
	<h1>{{ siteTitle }}</h1>
	</div>
	<div v-if= "$store.getters.user">
		<theButton v-on:click ='logOut' buttonText = 'Logout' />
	</div>
	<div v-if= "!$store.getters.user">
		<router-link to='/login'> <theButton buttonText = 'Login'/></router-link>
	</div>
	
  </header>
</template>

<script>
import theButton from './theButton.vue'

export default {
	components: {
			theButton,
	},
	name: 'MyHeader',
	props: {
		siteTitle: {
			type: String,
			default: 'Lets rock and roll'
		},
		LogInOut: {
			type: String,
			default: null
		}
	},
	methods: {
		logOut(){
			console.log('logout')
			localStorage.clear()
			this.$store.dispatch('logOut')
			this.$router.push('/')
		}
  
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header{
	display: Flex;
	flex-wrap: wrap;
	gap: 2rem;
	background-color: white;
	padding: 1rem;
	justify-content: space-between;
	align-items: center;
	.left {
		display: Flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}
}
a {
  color: #42b983;
}
img {
	width: 5em;
	height: 5em;
}
</style>
