const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { User } = require("./UserModel");

const ProductPostSchema = new Schema({
	datePosted: {
		type: Date,
		required: false,
		unique: false,
		default: new Date(Date.now())
	},
    productName: {
		type: String,
		required: true,
		unique: false
	},
    countryBoughtFrom: {
		type: String,
		required: true,
		unique: false
	},
	price: {
		type: Number,
		required: true,
		unique: false
	},
	category: {
		type: String,
		required: true,
		unique: false
	},
	storeBoughtFrom: {
		type: String,
		required: true,
		unique: false
	},
	description: {
		type: String,
		required: true,
		unique: false
	},
    dateAvailableForDropOff: {
		type: Date, // yyyy-mm-dd format
		required: false,
		unique: false,
	},
	imagedata: {
		type: [String],
		required: true,
		unique: false
	},
	imageUrls: {
		type: [String],
		required: false,
		unique: false
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}
});

const ProductPost = mongoose.model('ProductPost', ProductPostSchema);

module.exports = {
	ProductPost
}