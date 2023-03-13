<template>
	<h3>Login</h3>
  <form @submit.prevent="submit">
	<label for="html">Email</label>
    <input type="email" v-model="form.email" />
	<label for="html">Password</label>
	<input type="password" v-model="form.password" />
    

	<div>
	<theButton type="submit" buttonText = 'Submit'/>
	</div>
  </form>
</template>

<script>
	import axios from 'axios'
	import theButton from '../components/theButton.vue'

	export default {
		components: {
			theButton,
		},
		data() {
			return {
			form: {
				email: '',
				password: 'password'
			}
		}
	},
	methods: {
		async submit() {
			const responce = await axios.post('/api/auth/login', this.form)	
			localStorage.setItem('userId', responce.data.userId)
			localStorage.setItem('token', responce.data.token)
			this.$store.dispatch('logUser', responce.data.UserName)
			
			this.$router.push('/')
		}
		
		
	}
}
</script>

<style scoped lang="scss">
form{
	display: Flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	input{
		width: 10rem;
		margin-left: auto;
		margin-right: auto;
		border-color: rgba(255,215,215, 0.6);
		&:hover {
			box-shadow:  0 0 10px  rgba(255,215,215,0.6);
		}
	}
	label{
		font-weight: 700;
		padding-bottom: 0.5rem;
		padding-top: 1rem;
	}
	div{
		margin-top: 2rem;
	}
}
</style>