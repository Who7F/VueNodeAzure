<template>
	<button v-on:click='onClick()'> {{ buttonText }} </button>
</template>

<script>
export default {
	name: 'theButton',
	props: {
		buttonText: {
			type: String,
			default: 'Lets rock and roll'
		},
	},
	methods:{
		onClick(){
			console.log('clicked')
		}
	}
}
</script>

<style scoped lang="scss">
button{
	background-color: white;
	padding: 1rem;
	width: 10rem;
	border-color: rgba(255,215,215, 0.6);
	font-weight: 900;
	&:hover {
		box-shadow:  0 0 10px  rgba(255,215,215,0.6);
	}
}
</style>