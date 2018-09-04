<template>
    <div class="home section">
        <div class="container is-fluid">
            <div class="columns is-centered">
                <div class="column has-text-centered chat-box">
                    <h2 class="title is-3">Chat</h2>
                    <div class="messages content has-text-left">
                        <ul>
                            <li v-for="message in messages">{{message}}</li>
                        </ul>
                    </div>
                    <div class="message-input">
                        <div class="field has-addons">
                            <b-input v-model="message" class="is-expanded" placeholder="Type anything..."/>
                            <div class="control">
                                <button v-on:click="sendMessage" class="button is-info">
                                    Send
                                </button>
                            </div>
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

    export default {
        name: 'home',
        components: {
            BInput,
        },
        mounted() {
            this.socket.on('message', data => {
                this.messages.push(data.message);
            })
        },
        data() {
            return {
                socket: io('localhost:8000'),
                message: '',
                messages: [],
            }
        },
        methods: {
            sendMessage() {
                if (this.message) {
                    this.socket.emit('message', {user: 'user1', message: this.message});
                    this.message = '';
                }
            }
        }
    }
</script>
<style scoped>
    .chat-box {
        border: 2px solid green;
        max-width: 800px;
        height: 600px;
    }

    .messages {
        height: 450px;
        overflow-y: auto;
        max-height: 100%;
    }

    .message-input {
        /*position: absolute;*/
        /*bottom: 20px;*/
        /*width: 800%;*/
        /*padding-top: 30px;*/
        /*margin-top: 300px;*/
    }
</style>
