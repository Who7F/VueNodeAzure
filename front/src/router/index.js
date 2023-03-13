import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/myHome.vue'
import About from '../views/myAbout.vue'

const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: About
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
	{ 	
		path: '/bar/:id', 
		name: 'bar', 
		component: Bar
	},
	{
		path: '/test',
		name: 'Test',
		component: ()=> import (/*webpachChunkName: "Create Post"*/'../views/theTest.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL), 
	routes, 
	linkActiveClass: 'vue-active-link',
	})

export default router