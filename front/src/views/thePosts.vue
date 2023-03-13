<template>
	<p v-if="!mySauce">its loading</p>
	<section v-if="mySauce">
		<mySauce :mySauce ="mySauce"/>
	</section>
</template>

<script>
	import axios from 'axios'
	import mySauce from '../components/mySauce.vue'
	export default{
		components: {
			mySauce
		},
		data(){
			return{
				mySauce: null,
				
			}
		},
		async mounted() {
			const response = await axios.get('/api/sauces/all/' + localStorage.userId)
			
			this.mySauce = response.data
			console.log(this.mySauce)
			
		},
		methods:{
		async onClick(){
			const response = await axios.get('/api/sauces/all/' + localStorage.userId)
			this.mySauce = response.data
			console.log(this.mySauce)
		}
	}
	}

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section{
	display: flex;
	flex-direction: column-reverse;

}

	
</style>
