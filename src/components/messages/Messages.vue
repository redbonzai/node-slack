<template>
    <div>
        <!-- SHow single messages -->
        <single-message></single-message>

        <!-- Show Message Form -->
        <message-form></message-form>
    </div>
</template>

<script>
import SingleMessage from './SingeMessage'
import MessageForm from './MessageForm'

export default {
    name: 'messages',
    components: {SingleMessage, MessageForm}
}
</script>