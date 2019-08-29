import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// create state that holds data
const state = {
	currentUser: null
}

// update state data through Mutations
const mutations = {
	SET_USER(state, user) {
		state.currentUser = user
	}
}

// create actions for mutations with necessary data
const actions = {
	setUser({commit}, user) {
		commit('SET_USER', user)
	}
}

// get data from state
const getters = {
	currentUser: state => state.currentUser
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

export default store