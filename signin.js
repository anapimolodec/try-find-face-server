const makeSignin = (req,res,db,bcrypt) => {
	db.select('email','hash').from('login')
		.where('email','=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Unable to Get User'))
			} else {
				res.status(400).json("Wrong Password or Email")
			}
		})
		.catch(err => res.status(400).json("Wrong Password or Email"))
}


module.exports = {
	makeSignin: makeSignin
};