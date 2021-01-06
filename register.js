const makeRegister = (req,res,db,bcrypt) => {

	const {email, name, password} = req.body;
	if (!email || !name || !password) {
		return res.status(400).json("Invalid Form Submission")
	}
		const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(login_email => {
				return trx('users')
						.returning('*')
						.insert({
						email: login_email[0],
						name: name,
						joined: new Date()
						})
						.then(user => {
							res.json(user[0]);
						})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json("Unable to Register"));
		 //always add response~
}

module.exports = {
	makeRegister: makeRegister
};