const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
		type: Date, // yyyy-mm-dd format
		required: false,
		unique: false,
	},
    address: {
        type: String,
        required: true,
        unique: true
    },
    dateCreated: {
        type: Date,
		required: false,
		unique: false,
		default: new Date(Date.now())
    },
    isAdmin: {
        type: Boolean,
        required: true,
        unique: false
    }, 

});

UserSchema.pre(
    'save',
    async function (next) {
        console.log("About to save a user to the DB!");
        next();
    }
)

// const ModelName = mongoose.model('Name that appears in mongosh or Cloud Atlas GUI', SchemaThatModelIsBasedOn);
const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}
