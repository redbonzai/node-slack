<template>
    <div>
        <div class="jumbotron bg-primary text-white">
             <h2 class="lead display-3">#SLACK EMULATOR#</h2> 
             <p>Realtime Communication</p>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col text-center">
                    <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login With Google</button>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col text-center">
                    <button class="btn btn-outline-info btn-lg">Login With Twitter</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import auth from 'firebase/auth'
export default {
    name: 'login',
    methods: {
        async loginWithGoogle() {
            await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
                // eslint-disable-next-line no-console
                console.log(` Google authentication response: `, response)
            })
        }
    }
}
</script>