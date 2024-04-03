const mongoose = require('mongoose');
const { User } = require("./UserModel");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
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

MessageSchema.pre(
    'save',
    async function (next) {
        console.log("About to save a message to the DB!");
        next();
    }
)

// const ModelName = mongoose.model('Name that appears in mongosh or Cloud Atlas GUI', SchemaThatModelIsBasedOn);
const Message = mongoose.model('Message', MessageSchema);

module.exports = {
    Message
}
