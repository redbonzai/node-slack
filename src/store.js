import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// create state that holds data
const state = {
	currentUser: null,
	firebaseInstance: null,
	currentChannel: null
}

// update state data through Mutations
const mutations = {
	SET_USER(state, user) {
		state.currentUser = user
	},

	SET_FIREBASE(state, firebase) {
		state.firebaseInstance = firebase 
	},

	SET_CURRENT_CHANNEL(state, currentChannel) {
		state.currentChannel = currentChannel
	}
}

// create actions for mutations with necessary data
const actions = {
	setUser({commit}, user) {
		commit('SET_USER', user)
	},

	setFirebase({commit}, firebase) {
		commit('SET_FIREBASE', firebase)
	},

	setCurrentChannel({commit}, currentChannel) {
		commit('SET_CURRENT_CHANNEL', currentChannel)
	}
}

// get data from state
const getters = {
	currentUser: state => state.currentUser,
	firebaseInstance: state => state.firebaseInstance,
	currentChannel: state => state.currentChannel
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

export default store