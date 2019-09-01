import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import store from './store'
import auth from 'firebase/auth'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

// Firebase configuration
let firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: 'vuex-slack-emulator.firebaseapp.com',
  databaseURL: 'https://vuex-slack-emulator.firebaseio.com',
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APPID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

window.firebase = firebase

const unsubscribe = firebase.auth().onAuthStateChanged(user => {

  // dispatch user if user is logged in.  Otherwise, user will be null
  store.dispatch('setUser', user)

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

  // recursion - this function calls itself on auth state change.
  unsubscribe()
})