"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.message = [];
        user1.send('connected');
        this.user2.send(JSON.stringify({
            msg: "user2 connected"
        }));
    }
    messageSave(socket, msg) {
        var _a, _b;
        if (this.user1 == socket) {
            this.message.push({ msg: msg, sendUser: 'user1', Receiver: 'user2' });
            (_a = this.user2) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ msg: msg }));
        }
        else {
            this.message.push({ msg: msg, sendUser: 'user2', Receiver: 'user1' });
            (_b = this.user1) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({ msg: msg }));
        }
        console.log(this.message);
    }
}
exports.Message = Message;
