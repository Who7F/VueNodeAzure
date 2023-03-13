import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/myHome.vue'


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/signup',
		name: 'Signup',
		component: ()=> import (/*webpachChunkName: "Sign in"*/'../views/theSignUp.vue')	
	},
	{
		path: '/login',
		name: 'Login',
		component: ()=> import (/*webpachChunkName: "Log in"*/'../views/theLogin.vue')	
	},	
	{
		path: '/account',
		name: 'Account',
		component: ()=> import (/*webpachChunkName: "Account"*/'../views/theAccount.vue')	
	},
	{
		path: '/OneSouce/:id',
		name: 'OneSouce',
		component: ()=> import (/*webpachChunkName: "Post"*/'../views/myOneSauce.vue'),	
		props: true
	},
	{
		path: '/create',
		name: 'Create',
		component: ()=> import (/*webpachChunkName: "Create Post"*/'../views/theCreatePost.vue')	
	},
	{
		path: '/posts',
		name: 'Posts',
		component: ()=> import (/*webpachChunkName: "Create Post"*/'../views/thePosts.vue')	
	},


]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL), 
	routes, 
	linkActiveClass: 'vue-active-link',
	})

export default router