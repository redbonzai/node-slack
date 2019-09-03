<template>
    <div>
        <div class="mt-3">
            <div v-for="message in messages" :key="message">
                <div class="media">
                    <img :src="message.user.avatar" alt="" class="align-self-start mr-3">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'single-message',
    props: ['messages']
}
</script>