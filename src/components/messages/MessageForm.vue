<template>
    <div>
        <form class="messageForm" @keyup.enter="sendMessage">
            <div class="input-group mb-3">
                <input                    
                    v-model.trim="message"
                    type="text" 
                    class="form-control mt-3" 
                    name="message" 
                    id="message" 
                    placeholder="Write Something">            

                <div class="input-group-append">
                    <button @click="sendMessage" class="btn btn-primary mt-3" type="button">&nbsp; Send</button>
                </div>
                
                <div class="input-group-append">
                    <button class="btn btn-warning mt-3" type="button">Upload</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'message-form',

    data() {
        return {
            message: '',
            errors: [],
        }
    },

    computed: {
        ...mapGetters(['currentChannel', 'currentUser'])
    },

    methods: {
        sendMessage() {
           //construct a new message object.  
           // We want to send messages from the current channel id.
           let newMessage = {
               content: this.message,
               timestamp: firebase.database.ServerValue.TIMESTAMP,
               user: {
                   name: this.currentUser.displayName,
                   avatar: this.currentUser.photoURL,
                   id: this.currentUser.uid
               }
           }

           //incorporate message validation
           if (this.currentChannel !== null) {
               if (this.message.length > 0) {
                   this.$parent.messagesRef.child(this.currentChannel.id).push().set(newMessage)
                   .then(() => {
                       
                   }).catch((err) => {
                       this.errors.push(err.message)
                   }).finally(() => {
                       this.message = ''
                   });
               }
           }
        }
    }
}
</script>

<style scoped>
    .messageForm {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 67%;
        z-index: 100;
        color: white;
        text-align: center;
        margin-bottom: -16px;
        margin-left: 33.3%;
    }

    input, button {
        height: 50px;
    }


</style>