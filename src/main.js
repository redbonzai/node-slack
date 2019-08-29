import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

// Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyAkVhF2MlU3LspQep2P6B7NPUhZRU-CmcQ",
  authDomain: "vuex-slack-emulator.firebaseapp.com",
  databaseURL: "https://vuex-slack-emulator.firebaseio.com",
  projectId: "vuex-slack-emulator",
  storageBucket: "vuex-slack-emulator.appspot.com",
  messagingSenderId: "523626561682",
  appId: "1:523626561682:web:5a249af12ba03009"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

window.firebase = firebase

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
