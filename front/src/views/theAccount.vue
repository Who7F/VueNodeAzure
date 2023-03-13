<template>
	<h1>Account</h1>
	<div class = "form">
	<ul>
		<li>Name: {{form.name}}</li>
		<li>Email: {{form.email}}</li>
		<li>Departemts: {{form.department}}</li>
		
	</ul>
	</div>
	
	<theButton v-on:click ='delAccout' buttonText ='Delete Accout' />
</template>

<script>
	import axios from 'axios'
	import theButton from '../components/theButton.vue'
	export default{
		components: {
			theButton,
		},
		data(){
			return{
				form: [],
				userId: localStorage.userId,
				
			}
		},
		
		async mounted(){
			console.log()
			const response = await axios.get('/api/account/' + this.userId)
			this.form = response.data[0]
			
		},
		methods: {
			async delAccout(){
				console.log('del')
				const responce = await axios.delete('/api/account/' + this.userId)
				console.log(responce)
				localStorage.clear()
				this.$store.dispatch('logUser', responce.data.UserName)
				this.$router.push('/')
			}
			
		}
	}
</script>

<style scoped lang="scss">
.form{

	margin-left: 20%;
	ul {
		list-style-type: none;
		text-align: left;
		li{
			padding: 1rem;
			font-weight: 600;
		}
	}
}

	
</style>