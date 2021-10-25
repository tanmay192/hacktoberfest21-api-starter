const mongoose = require("mongoose");

// Defining the schema of the contestant object
const contestantSchema = new mongoose.Schema({
	id: String,
	name: {
		type: String,
		minlength: 3,
	},
	costumeTitle: String,
	costumeImgUrl: String,
	city: String,
	country: String,
	votes: {
		type: Number,
		default: 0,
	},
});

// Compiling the schema to model
const Contestant = mongoose.model("Contestant", contestantSchema);

module.exports = Contestant;
