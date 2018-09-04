<template>
    <div class="body">
        <div class="sidebar">hello</div>
        <div class="chat-box">
            <div ref="messages" class="messages">
                <div class="messages-inside">
                    <div :key="index" v-for="(message, index) in messages">{{message}}</div>
                </div>
            </div>
            <div class="message-input">
                <div class="input-group mb-3">
                    <input v-on:keyup.enter="sendMessage" v-model="message" type="text" class="form-control"
                           placeholder="Type anything..."
                           aria-label="Type the message">
                    <div class="input-group-append">
                        <button v-on:click="sendMessage" class="btn btn-outline-success" type="button">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: 'home',
        components: {},
        mounted() {
            this.socket.on('message', data => {
                this.messages.push(data.message);
                if (this.$refs.messages !== undefined && this.$refs.messages !== null)
                    this.$refs.messages.scrollTop = 9999999;
            });
            this.socket.on('message_received', () => {
                this.messages.push(this.message);
                this.message = "";
                if (this.$refs.messages !== undefined && this.$refs.messages !== null)
                    this.$refs.messages.scrollTop = 9999999;
            })
        },
        data() {
            return {
                socket: io('localhost:8000/chat'),
                message: '',
                messages: [],
            }
        },
        methods: {
            sendMessage() {
                if (this.message) {
                    this.socket.emit('message', {user: 'user1', message: this.message});
                }
            }
        }
    }
</script>
<style scoped>
    .body {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        height: 100vh;
    }

    .chat-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        /*padding: 20px;*/
    }

    .messages {
        height: 100%;
        overflow-y: auto;
        max-height: 100%;
    }

    .messages::-webkit-scrollbar {
        width: 6px;
        background-color: #ffffff;
    }

    .messages::-webkit-scrollbar-thumb {
        background-color: #989898;
        border-radius: 5px;
        height: 100px;
    }

    .messages-inside {
        padding: 20px;
    }

    .sidebar {
        background-color: #00a9a9;
        width: 260px;
    }

    .message-input {
        padding: 20px;
    }
</style>
