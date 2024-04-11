const mongoose = require('mongoose');
const { Message } = require("./MessageModel");
const { User } = require("./UserModel");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, {timestamps:true});

ChatSchema.pre(
    'save',
    async function (next) {
        console.log("About to save chat to the DB!");
        next();
    }
)

// const ModelName = mongoose.model('Name that appears in mongosh or Cloud Atlas GUI', SchemaThatModelIsBasedOn);
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {
    Chat
}
