<template>
	<h3>Create a post</h3>
	<form @submit.prevent="submit">
	
		<label for="html">Title</label>
		<input type="text" v-model="form.title" />
		
		<label for="html">Content</label>
		<textarea type="text" v-model="form.content"/>
		
		
		
		<div>
			<div class = "inputfile">
				<label for="files" class="btn">Select Image</label>
				<input id="files" style="visibility:hidden;" type="file" @change="previewFiles">
			</div>
		
			<img v-if='url' :src='url' alt='upload'>
			<img v-if='!url' src='../assets/PlaceHolder.png' alt='Place Holder'>
        </div>    
				
			
		
		
		<div class = 'button'>
			<theButton type="submit" buttonText = 'Submit'/>
		</div>
	</form>
	
</template>

<script>
	import axios from 'axios'
	import theButton from '../components/theButton.vue'
	export default{
		components: {
			theButton,
		},
		data() {
			return {
			form: {
				title: '',
				content: '',
				userId: localStorage.userId
			},
			url: null,
			files: null
		}
	},
	methods: {
		upLoad() {
			console.log(this.form)
		},
		submit(){
			const f = new FormData()
			f.append('sauce', JSON.stringify(this.form))
			if(this.files){
				f.append('image', this.files)
			}
			this.submitForm(f)
		},
		async submitForm(payLoad) {
			const responce = await axios.post('/api/sauces', payLoad)
			console.log(responce.data)	
			this.$router.push('/')
			
		},
		previewFiles(event){
			this.url = URL.createObjectURL(event.target.files[0])
			this.files = event.target.files[0]
			
			
		},
		
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
	textarea{
		width: 30rem;
		height: 15rem;
		
		margin-left: auto;
		margin-right: auto;
		border-color: rgba(255,215,215, 0.6);
		&:hover {
			box-shadow:  0 0 10px  rgba(255,215,215,0.6);
		}
	}
	img{
		border-radius: 8px;
		width: 10rem;
		height: 10rem;
		object-fit: cover;
		margin: auto;
		box-shadow:  0 0 10px  rgba(255,215,215,0.2);
	}
	.inputfile{
		display: Flex;
		flex-wrap: wrap;
		flex-direction: column;
		}
	.btn{
		background-color: white;
		padding: 1rem;
		width: 8rem;
		border-color: rgba(255,215,215, 0.6);
		border-style: outset;
		margin-left: auto;
		margin-right: auto;
		margin-top: 2rem;
		font-weight: 900;
		font-size: 0.8rem;
		&:hover {
			box-shadow:  0 0 10px  rgba(255,215,215,0.6);
		}
	}
	.button{
		margin-top: 2em;
		margin-bottom: 1rem;
	}
	
	
	
}

</style>