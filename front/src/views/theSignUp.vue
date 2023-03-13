<template>
	<h3>Sign Up</h3>
	<form @submit.prevent="submit">
		<label for="html">Name</label>
		<input type="text" v-model="form.name" />
		<label for="html">Email</label>
		<input type="email" v-model="form.email" />
		<label for="html">Password</label>
		<input type="password" v-model="form.password" />
		<label for="html">Confirm Password</label>
		<input type="password" v-model="form.password_confirm" />
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
				name: '',
				email: '',
				password: 'password',
				password_confirm: 'password'
			}
		}
	},
	methods: {
	
		submit(){
			if(this.form.name && this.form.email && this.form.password){
				if(this.form.password === this.form.password_confirm){
					this.submitForm()
					
				}
			}
		},
		
	
		async submitForm() {
			const responce = await axios.post('/api/auth/signup', this.form)
			console.log(responce.data)	
			this.logIn()
		},
		async logIn() {
			const responce = await axios.post('/api/auth/login', this.form)	
			localStorage.setItem('userId', responce.data.userId)
			localStorage.setItem('token', responce.data.token)
			this.$router.push('/')
		}
		
	},
	mounted(){
		
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