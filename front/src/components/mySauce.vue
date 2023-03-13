<template>
	<article class = 'article' v-for="sauce in mySauce" :key = sauce.key>
	
		<div class = "card" v-on:click ='buttonPush(sauce.sauceid, sauce.read)'>
			<span v-if ='sauce.read !== true' class = "unread">
				<div class = "dot"></div><div class = "dot"></div><div class = "dot"></div>
			</span>
			<span>
				<img v-bind:src="sauce.url" />
			</span>
			<span class = 'post'>
			<h4>{{ sauce.title }} </h4>
			
			<p> {{sauce.content}} </p>
			
			
			<p>Author: {{sauce.name}}</p>
			</span>
		</div>
	</article>
	
	
	
</template>

<script>
import axios from 'axios'
export default {
  name: 'mySauce',
  props: {
	mySauce: Array
  },
  data(){
	return{
		magic: '3'
		
	}
  },
  methods: {
	buttonPush(postId, read){
		console.log(postId)
		if(!read){
			const f = new FormData()
			f.append('postId', this.id)
			f.append('userId', localStorage.userId)
			const i = {'postId': postId, 'userId':localStorage.userId}
			this.read(i, postId)
		}else{
			this.$router.push({ name: 'OneSouce', params: { id: postId }})
		}
	},
	async read(payload, page){
		console.log('what the')
		const responce = await axios.post('/api/sauces/read', payload)
		console.log(responce)
		this.$router.push({ name: 'OneSouce', params: { id: page }})
		
	}
  },
 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

article{
	background: rgba(255,215,215,0.03);
	border-style: solid;
	border-color: rgba(255,215,215, 0.6);
	width: 90%;
	height: 11rem;
	border-radius: 1rem 1rem 0 1rem;
	border-width: 0.4rem 0.2rem 0.1rem 0.3rem;
	margin: 0.7rem 5% 0rem 5%;
	
	
	&:hover {box-shadow:  0 0 10px  rgba(255,215,215,0.6);
		
	}
	.card{
		display: flex;
		flex-direction: row;
		.unread{
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.5rem;
			.dot{
				background-color: red;
				border-radius: 50%;
				height: 0.5rem;
				width: 0.5rem;
			}
		}
	}
	h4 {
		margin: 0.5rem 0 0;
		
		color: #000;
		text-decoration: none!important;
	}
	.post{
		width: 95%;
		

	}	
	p {
		color: #000;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 0.8rem;
		padding: 0.5rem;
		height: 5rem;
		text-align: center;
	}
	img{
		border-radius: 20px;
		width: 7rem;
		height: 10rem;
		object-fit: cover;
		padding: 0.5rem;
		box-shadow:  0 0 3px  rgba(255,215,215,0.2);
	}
	
	
	
	
}
img {
	width: 20em;
	height: 20em;
}
</style>
