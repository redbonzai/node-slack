<template>
    <div>
        <form class="messageForm">
            <div class="input-group mb-3">
                <input type="text" 
                    class="form-control mt-3" 
                    name="message" 
                    id="message" 
                    placeholder="Write Something">            

                <div class="input-group-append">
                    <button class="btn btn-primary mt-3" type="button">&nbsp; Send</button>
                </div>
                
                <div class="input-group-append">
                    <button class="btn btn-warning mt-3" type="button">Upload</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'message-form'
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