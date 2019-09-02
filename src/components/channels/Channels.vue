<template>
    <div>
        <button @click="openModal()" class="btn btn-outline-primary">Add Channels</button>

        <!-- show all channels -->
        <div class="mt-4">
            <button type="button"
                class="list-group-item list-group-item-action"
                v-for="channel in channels" v-bind="channel">
                {{ channel.name }}
            </button>
        </div>

            <!-- Modal -->
        <div class="modal fade" id="channelModal" >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title text-dark">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <input type="text"
                            v-model="newChannel" 
                            name="new_channel" 
                            id="new_channel" 
                            placeholder="Channel Name" 
                            class="form-control">
                    </div>

                    <!-- errors -->
                    <ul class="list-grou" v-bind="hasErrors">
                        <li class="list-group-item text-danger" 
                            v-for="error in errors" 
                            v-bind="error">
                                {{error}}
                        </li>
                    </ul>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button @click="addChannel" type="button" class="btn btn-primary">Add Channel</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import database from 'firebase/database'
import $ from 'jquery'
export default {    
    
    name: 'channels',

    data() {
        return {
            newChannel: '',
            errors: [],
            channelsRef: firebase.database().ref('channels'),
            channels: [],

            currentChannel: null 
        }
    },

    mounted() {
       this.addListeners()
        // console.log(` mounted is called`)
    },

    beforeDestroyed() {
        this.detachListeners()
    },

    computed: {
        hasErrors() {
            return this.errors.length > 0
        }
    },   

    methods: {
        openModal() {
            $('#channelModal').appendTo('body').modal('show');
        },

        addChannel() {
            this.errors = []

            // get key to newy created channel
            let channelKey = this.channelsRef.push().key

            // channel requires id, and name
            let newChannel = {
                id: channelKey,
                name: this.newChannel
            }

            this.channelsRef.child(channelKey).update(newChannel)
            .then(() => {
                this.newChannel = ''
                $('#channelModal').modal('hide')

            }).catch((err) => {
                // console.log(` There has been an error with saving the channel`, err)
                this.errors.push(err.message)
            });

        },

        addListeners() {
            this.channelsRef.on('child_added', snapshot => {
                this.channels.push(snapshot.val())

                // set current channel
                if (this.channels.length > 0) {

                    // get first channel if channels array has at least one channel
                    this.currentChannel = this.channels[0] 

                    // dispatch the currentChannel store action method to save the channel in browser storage.
                    this.$store.dispatch('setCurrentChannel', this.currentChannel)
                }
            })
        },

        detachListeners() {
            this.channelsRef.off()
        },        

        
    },
    
}
</script>