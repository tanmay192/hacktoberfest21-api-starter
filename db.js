const mongoose = require("mongoose");

const db = mongoose
	.connect("mongodb://localhost:27018/halloweenDB")
	.then(() => console.debug("Connected to MongoDB"))
	.catch((err) => console.error("Unable to connect to MongoDB", err));

module.exports = db;
