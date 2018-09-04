<template>
    <div class="home section">
        <div class="container is-fluid">
            <div class="columns is-centered">
                <div class="column has-text-centered chat-box">
                    <h2 class="title is-3">Chat</h2>
                    <div class="field has-addons">
                        <b-input v-model="message" class="is-expanded" placeholder="Type anything..."/>
                        <div class="control">
                            <button v-on:click="sendMessage" class="button is-info">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BInput from "buefy/src/components/input/Input";
    import io from 'socket.io-client';
    import BIcon from "buefy/src/components/icon/Icon";

    export default {
        name: 'home',
        components: {
            BIcon,
            BInput,
        },
        data() {
            return {
                socket: io('localhost:8000'),
                message: '',
            }
        },
        methods: {
            sendMessage() {
                console.log('hello');
                this.socket.emit('message', {user: 'user1', message: this.message})
            }
        }
    }
</script>
<style scoped>
    .chat-box {
        border: 2px solid green;
        max-width: 800px;
    }
</style>
