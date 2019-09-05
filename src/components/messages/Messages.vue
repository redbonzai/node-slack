<template>
    <div>
        <!-- SHow single messages -->
        <single-message :messages="messages"></single-message>

        <!-- Show Message Form -->
        <message-form></message-form>
    </div>
</template>

<script>
import SingleMessage from './SingeMessage'
import MessageForm from './MessageForm'
import database from 'firebase/database'
import {mapGetters} from 'vuex'

export default {
    name: 'messages',
    components: {SingleMessage, MessageForm},

    data() {
        return {
            messagesRef: firebase.database().ref('messages'),
            messages: [],
            channel: ''
        }
    },

    computed: {
        ...mapGetters(['currentChannel'])
    },

    watch: {
        currentChannel: function() {
            // if current channel changes, watch for its messages
            this.messages = []
            this.addListeners()
            this.channel = this.currentChannel
        }
    },

    methods: {
        addListeners() {

            // listen to child_added events on current channel
            this.messagesRef.child(this.currentChannel.id).on('child_added', snapshot => {
                // console.log(`messages snapshot: `, snapshot)
                this.messages.push(snapshot.val())
            })
        },

        detachListeners() {
            if (this.channel !== null) {
                this.messagesRef.child(this.channel.id).off()
            }
        }
    },

    beforeDestroy() {
        this.detachListeners()
    }
}
</script>