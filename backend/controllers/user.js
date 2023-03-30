const db = require('../db/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const sendError = require('../utils/helper');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
	const { name, email, password } = req.body;

	const hash = await bcrypt.hash(password, 8);
	const uid = uuidv4();
	console.log(uid);
	const sqlSelect = `INSERT INTO users (uid, name, email, password) VALUES ("${uid}", "${name}", "${email}", "${hash}")`;

	db.query(sqlSelect, (err, result) => {
		if (err) {
			res.send(err);
		}
		console.log(result);
	});
};

const signInUser = async (password, userPassword) => {
	const result = await bcrypt.compareSync(password, userPassword);
	return result;
};

const getUserFromEmail = (email) => {
	const findQuery = `SELECT * FROM users WHERE email = "${email}"`;

	return new Promise((resolve, reject) => {
		db.query(findQuery, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

exports.signIn = async (req, res) => {
	const { email, password } = req.body;

	if (!email.trim() || !password.trim())
		return res
			.status(400)
			.json({ success: false, error: 'Email/password missing!' });
	// Find user with email
	const userReturned = await getUserFromEmail(req.body.email);
	const user = userReturned[0];
	// If user not found send error
	if (!user)
		return res.status(400).json({ success: false, error: 'User not found!' });

	const isMatch = await signInUser(req.body.password, user.password);
	if (!isMatch)
		return res
			.status(400)
			.json({ success: false, error: 'Email/password not matching!' });

	const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});
	res.json({
		success: true,
		user: {
			user: user.name,
			email: user.email,
			id: user.uid,
			token: token,
		},
	});
};
