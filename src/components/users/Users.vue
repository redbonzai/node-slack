<template>
    <div>
        <div class="text-light">
            <h4>Users</h4>
            <ul class="nav flex-column">
                <li v-for="user in users" :key="user.uid">
                    <span>
                        <img :src="user.avatar" class="img rounded-circle" height="20">
                        <span class="text-primary ml-2">{{ user.name }}</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import database from 'firebase/database'
import {mapGetters} from 'vuex'

export default {
    name: 'users',

    data() {
        return {
            users: [],
            usersRef: firebase.database().ref('users'),
            connectedRef: firebase.database().ref('.info/connected'),
            presenceRef: firebase.database().ref('presence')
        }
    },

    computed: {
        ...mapGetters(['currentUser'])
    },

    methods: {
        addListeners() {
            this.usersRef.on('child_added', (snapshot) => {
                
                // get all users except current user
                if (this.currentUser.uid !== snapshot.key) {

                    // build user object and push to users[]
                    let user = snapshot.val()
                    user['uid'] = snapshot.key
                    user['status'] = 'offline'
                    this.users.push(user)
                }
            })

            this.connectedRef.on('value', (snapshot) => {
                if (snapshot.val() === true) {
                    let ref = this.presenceRef.child(this.currentUser.uid)
                    ref.set(true)
                    ref.onDisconnect().remove()
                }
            })

        },

        detachListers() {

        }
    },

    mounted() {
        this.addListeners()
    },

    beforeDestroy() {
        this.detachListers()
    }
}
</script>