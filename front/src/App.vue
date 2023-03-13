<template>
	<Header siteTitle ='Groupomania'/>
	
	<theNav />
	
	
	<router-view  />
	
	
	


	<Footer />
	
</template>

<script>
import axios from 'axios'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


import theNav from './components/theNav.vue'

export default {
  name: 'App',
  components: {
	Header,
	theNav,
	Footer,
  },

  data(){
	return{
		myPost: [{title: 'somthing'}, {title: 'somthingelse'}],
		otdata: 'sup',
		myPosts : [],
		userId: localStorage.userId,
		userName: null
	}
  },
  async created(){
	const response = await axios.get('/api/account/name/' + this.userId)
	this.$store.dispatch('logUser', response.data)
	
	
  },
  methods: {
	
  },
  mounted () {
	const response = axios.get('/api/account/name/' + this.userId)
	this.userName = response.data
  },
  watch: {
	created(){
		console.log(this.userName)
	}
  }
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  margin-top: 0.5em;
  max-width: 60em;
  margin: auto;
  box-shadow:  0 0 2rem rgba(0,0,0,0.6);
  min-height: 60rem;
  h3{
	padding-bottom: 0.5rem;
	padding-top: 1rem;
  }
}

</style>
