<template>
    <div class="home section">
        <div class="container is-fluid">
            <div class="columns is-centered">
                <div class="column has-text-centered chat-box">
                    <h2 class="title is-3">Chat</h2>
                    <b-input v-model="name"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BInput from "buefy/src/components/input/Input";

    export default {
        name: 'home',
        components: {
            BInput,
        }
    }
</script>
<style scoped>
    .chat-box {
        border: 2px solid green;
        max-width: 800px;
    }
</style>
