import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// create state that holds data
const state = {
	currentUser: 'Christian Dominguez'
}

// update state data through Mutations
const mutations = {}

// create actions for mutations with necessary data
const actions = {}

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