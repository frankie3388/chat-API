const mongoose = require('mongoose');
const { Message } = require("./MessageModel");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductPost'
    },
    text: String,
    file: String,
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
