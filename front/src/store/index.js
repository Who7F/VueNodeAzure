import { createStore } from 'vuex'


export default createStore({
	state: {
		user: null
	},
	getters: {
		user(state){
			return state.user
		}
	},
	mutations: {
		logUser(state, user){	
			state.user = user
		},
		logOut(state){
			state.user = null
		}
	},
	actions: {
		logUser(context, user){
			context.commit('logUser', user)
		},
		logOut(context){
			context.commit('logOut')
		}
	},
	
	modules: {
	}
})
