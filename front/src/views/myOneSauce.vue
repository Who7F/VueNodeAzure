<template>
	<div class = "post">
		<h3>{{ form.title }}</h3>
		<img v-if='form.url' :src='form.url' alt='upload'>
		<p>{{ form.content }}</p>
	</div>
	<div class = 'btn'>
	<theButton  v-on:click ='delPost' buttonText = 'Delete Post'/>
	<button v-if='myOneSauce.userId === userId' v-on:click ='delPost'>Del</button>
	</div>
	
</template>

<script>
import axios from 'axios'
import theButton from '../components/theButton.vue'
export default {
	name: 'myOneSauce',
	components: {
			theButton,
		},
	props: {
		mySauce: {
		type: String,
		default: '63cbea90c0f66bc631102681'
		},
		id: {
			type: String,
		}
		
	},
	data(){
		return{
			myOneSauce: [
			
			],
			form: [],
			userId: localStorage.userId,
		}
	},
	
	created() {
		
		this.loadPost()
		
		
		
	},
	
	async mounted(){
	
	},
	methods: {
	readCheck(readCheck){
		if(readCheck === true){
			this.loadPost()
		}else{
			console.log('working on')
		}
	},
	async delPost (){

		const response = await axios.delete('/api/sauces/' + this.id)
		console.log(response)
		this.$router.push('/')
		},
	async loadPost(){
		const response = await axios.get('/api/sauces/' + this.id)	
		this.myOneSauce = response.data
		this.form = response.data[0]
		},

	
	}
	

}

</script>


<style scoped lang="scss">
.post{
	img{
		border-radius: 8px;
		width: 20rem;
		height: 20rem;
		object-fit: cover;
		margin: auto;
		box-shadow:  0 0 10px  rgba(255,215,215,0.2);
	}
	p{
		width: 22rem;
		margin: auto;
		text-align: left;
		padding-bottom: 2rem;
	}
	.btn{
		padding: 70px;
		margin-top: 1rem;
		
	}
}
</style>