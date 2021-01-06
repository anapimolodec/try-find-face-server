const Clarifai = require('clarifai');

const app = new Clarifai.App({
		apiKey: "d5c3c00a5bc443b3b945125d323852f6"
	});
const makeApiCall = (req,res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json("Unable to work with API"))
}

const makeImage = (req,res,db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	makeImage: makeImage,
	makeApiCall: makeApiCall
};