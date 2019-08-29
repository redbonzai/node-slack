<template>
    <div>
        <div class="jumbotron bg-primary text-white text-center">
             <h2 class="lead display-3">#SLACK EMULATOR#</h2> 
             <p>Realtime Communication</p>
        </div>

        <!-- Show loading status -->
        <div class="alert alert-info" v-if="loading">Processing ... </div>

        <div class="alert alert-danger" v-if="hasErrors">
            <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col text-center">
                    <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login With Google</button>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col text-center">
                    <button @click="loginWithTwitter" class="btn btn-outline-info btn-lg">Login With Twitter</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import auth from 'firebase/auth'
export default {
    name: 'login',

    data() {
        return {
            errors: [],
            loading: false
        }
    },

    computed: {
        hasErrors() {
            return this.errors.length > 0
        }
    },

    methods: {
        async loginWithGoogle() {

            // loading is set to true while auth is loading
            this.loading = true

            // clear out old errors when making a fresh request
            this.errors = []

            await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(response => {

                    // dispatch setUser action
                    this.$store.dispatch('setUser', response.user)

                    //once authenticated, redirect users to chat '/'  page.
                    this.$router.push('/')
                    // firebase.auth().logOut()

            })
                .catch(error => {
                    this.errors.push(error.message)

                    // if there is an error, then set loading = false
                    this.loading = false
                })
        },

        async loginWithTwitter()  {
            // loading is set to true while auth is loading
            this.loading = true

            // clear out old errors when making a fresh request
            this.errors = []

            await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
                .then(response => {

                    // dispatch setUser action
                    this.$store.dispatch('setUser', response.user)

                    //once authenticated, redirect users to chat '/'  page.
                    this.$router.push('/')
                    // firebase.auth().logOut()

                })
                .catch(error => {
                    this.errors.push(error.message)

                    // if there is an error, then set loading = false
                    this.loading = false
                })
        }
    }
}
</script>