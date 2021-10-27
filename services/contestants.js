const { v4: uuidv4 } = require("uuid");
const Contestant = require("../models/contestant.model");
module.exports = {
	/**
  * 


  */
	getContestants: async (options) => {
		const contestants = await Contestant.find();

		// console.log(contestants);
		var data = [...contestants],
			status = "200";

		return {
			status: status,
			data: data,
		};
	},

	/**
  * 

  * @param options.createContestantInlineReqJson.city required
  * @param options.createContestantInlineReqJson.costumeImgUrl required
  * @param options.createContestantInlineReqJson.costumeTitle required
  * @param options.createContestantInlineReqJson.country required
  * @param options.createContestantInlineReqJson.name required

  */
	createContestant: async (options) => {
		const id = uuidv4().toString();
		const { city, costumeImgUrl, costumeTitle, country, name } =
			options.createContestantInlineReqJson;

		// Input validation
		if (!city || !costumeImgUrl || !costumeTitle || !country || !name) {
			return {
				status: 400,
				data: {
					message: "Missing body parameter",
					status: "Bad Request",
				},
			};
		}

		const contestant = new Contestant({
			id: id,
			...options.createContestantInlineReqJson,
		});

		const result = await contestant.save((err) => {
			if (err) throw new Error("User not created. Internal Server Error");
			else console.log("User created successfully");
		});

		var data = {
				id: id,
				status: "ok",
			},
			status = "201";

		return {
			status: status,
			data: data,
		};
	},

	/**
  * 
  * @param options.id The id of a contestant 

  */
	getContestant: async (options) => {
		const contestant = await Contestant.findOne({ id: options.id });

		// If id not found
		if (!contestant) {
			return {
				status: 404,
				data: {
					message: "Contestant Not Found",
					status: "error",
				},
			};
		}

		// console.log(contestant);
		var data = {
				id: contestant.id,
				name: contestant.name,
				costumeTitle: contestant.costumeTitle,
				costumeImgUrl: contestant.costumeImgUrl,
				city: contestant.city,
				country: contestant.country,
				votes: contestant.votes,
			},
			status = "200";

		return {
			status: status,
			data: data,
		};
	},

	/**
  * 
  * @param options.id The id of a contestant 

  */
	deleteContestant: async (options) => {
		const contestant = await Contestant.findOne({ id: options.id });

		// If id not found
		if (!contestant) {
			return {
				status: 404,
				data: {
					message: "Contestant Not Found",
					status: "Not Found",
				},
			};
		}

		const result = await Contestant.deleteOne({ id: options.id });

		var data = {
				status: "ok",
			},
			status = "200";

		return {
			status: status,
			data: data,
		};
	},

	/**
  * 
  * @param options.id the id of a contestant 
  * @param options.name the new name for the contestant

  */
	updateContestant: async (options) => {
		const contestant = await Contestant.findOne({ id: options.id });

		// If id not found
		if (!contestant) {
			return {
				status: 404,
				data: {
					message: "Contestant Not Found",
					status: "Not Found",
				},
			};
		}
		const result = await Contestant.updateOne(
			{ id: options.id },
			{ $set: { name: options.name } }
		);

		var data = {
				status: "ok",
			},
			status = "200";

		return {
			status: status,
			data: data,
		};
	},

	/**
  * 
  * @param options.id The id of a contestant 

  */
	upvoteContestant: async (options) => {
		const contestant = await Contestant.findOne({ id: options.id });

		// If id not found
		if (!contestant) {
			return {
				status: 404,
				data: {
					message: "Contestant Not Found",
					status: "Not Found",
				},
			};
		}

		const result = await Contestant.updateOne(
			{ id: options.id },
			{ $inc: { votes: 1 } }
		);

		var data = {
				status: "ok",
				votes: contestant.votes + 1,
			},
			status = "200";

		return {
			status: status,
			data: data,
		};
	},
};
