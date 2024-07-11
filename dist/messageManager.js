"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageManager = void 0;
const message_1 = require("./message");
class MessageManager {
    constructor() {
        this.pendingUser = null;
        this.Users = [];
        this.messages = [];
    }
    addUser(socket) {
        this.Users.push(socket);
        this.handleMessage(socket);
    }
    handleMessage(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === 'init_message') {
                console.log('purana;');
                if (this.pendingUser) {
                    const messa = new message_1.Message(this.pendingUser, socket);
                    this.messages.push(messa);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            else if (message.type == 'sendMessage') {
                const messag = this.messages.find(messa => messa.user1 === socket || messa.user2 === socket);
                if (!messag)
                    return;
                messag.messageSave(socket, message.msg);
            }
        });
    }
}
exports.MessageManager = MessageManager;
