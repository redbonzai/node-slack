<template>
    <div>
        <div class="text-light">
            <h4>Users</h4>
            <ul class="nav flex-column">
                <li v-for="user in users" :key="user.uid">
                    <span>
                        <img :src="user.avatar" class="img rounded-circle mr-2" height="20">
                        <span :class="{'text-primary': isOnline(user), 'text-danger': !isOnline(user)}">{{ user.name }}</span>
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

            // presenceRef child_added: online
            this.presenceRef.on('child_added', snapshot => {
                if (this.currentUser.uid !== snapshot.key) {

                    //pass user to status method
                    this.addStatusToUser(snapshot.key)
                }
            })

            //presenceRef on child_removed: offline
            this.presenceRef.on('child_removed', snapshot => {
                if (this.currentUser.uid !== snapshot.key) {
                    this.addStatusToUser(snapshot.key, false)
                }
            })

            // returns 'connected' on every user that is logged into the application
            this.connectedRef.on('value', (snapshot) => {
                if (snapshot.val() === true) {
                    let ref = this.presenceRef.child(this.currentUser.uid)
                    ref.set(true)
                    ref.onDisconnect().remove()
                }
            })

        },

        addStatusToUser(userId, connected = true) {
            let userIndex = this.users.findIndex(user => user.uid === userId)
            if (userIndex !== -1) {
                connected === true 
                    ? this.users[userIndex].status = 'online' 
                    : this.users[userIndex].status = 'offline'
            }
        },

        isOnline(user) {
            return user.status === 'online'
        },

        detachListers() {
            this.usersRef.off()
            this.presenceRef.off()
            this.connectedRef.off()
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