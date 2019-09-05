<template>
    <div>
        <div class="mt-3">
            <div v-for="message in messages" v-bind:key="message.id">
                <div class="media">
                    <img                    
                        class=" rounded align-self-start mr-3" height="50"
                        :src="message.user.avatar" />

                    <div class="media-body">
                        <h6 class="mt-0">
                            <a href="#" >{{ message.user.name }}</a> - {{ message.timestamp | timeFromNow }}
                        </h6>
                        <p :class="{'self_message': selfMessage(message.user)}">{{ message.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
    name: 'single-message',
    props: ['messages'],

    computed: {
       ...mapGetters(['currentUser']) 
    },

    methods: {        
        selfMessage(user) {
            return user.id === this.currentUser.uid
        }
    },

    filters: {
        timeFromNow(value) {
            return moment(value).fromNow()
        }
    }
}
</script>

<style scoped>
    .selfMessage {
        border-left: 5px solid red;
        padding: 0 10px;
    }
</style>