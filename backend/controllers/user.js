const db = require('../db/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { sendError, createRandomBytes } = require('../utils/helper');
const {
	generateOtp,
	mailTransport,
	generateEmailTemplate,
	generatePasswordResetTemplate,
} = require('../utils/mail');
const jwt = require('jsonwebtoken');

exports.checkUserName = async (req, res, next) => {
	const { name, email, password } = req.body;

	const findUsernameQuery = `SELECT name FROM users WHERE name = "${name}"`;

	db.query(findUsernameQuery, (err, result) => {
		if (result.length < 1) {
			next();
		} else {
			console.log(result.length);
			return res
				.status(400)
				.send({ success: false, error: 'Pick a different username' });
		}
	});
};

exports.createUser = async (req, res, next) => {
	const { name, email, password } = req.body;

	const hash = await bcrypt.hash(password, 8);
	const uid = uuidv4();
	const sqlInsert = `INSERT INTO users (uid, name, email, password) VALUES ('${uid}', '${name}', '${email}', '${hash}')`;
	console.log(uid);
	// Check if user with same name exists if it does return error

	db.query(sqlInsert, (err, result) => {
		if (err) {
			return res.status(400).send({
				success: false,
				error: 'Username or email need to be different',
			});
		}
		// res.send(result);
		res.locals.uid = uid;
		res.locals.email = email;
		next();
	});

	// // FIXME For TESTING
	// res.locals.email = email;
	// next();
};

exports.createAuthToken = async (req, res) => {
	const uid = uuidv4();
	const ownerId = res.locals.uid;
	const dateNow = new Date();
	const stringDate = dateNow.toISOString();
	const isoDate = new Date(stringDate);
	const date = isoDate.toJSON().slice(0, 19).replace('T', ' ');
	console.log(date);

	const OTP = generateOtp(res);
	const hashedOTP = await bcrypt.hash(OTP, 8);

	// Send auth email
	const mailOptions = {
		from: 'email@email.com',
		to: res.locals.email,
		subject: 'Verify your email',
		html: generateEmailTemplate(OTP),
	};
	mailTransport().sendMail(mailOptions, function (err, info) {
		if (err) {
			return res.status(400).send({ success: false, error: 'Cant send email' });
		} else {
		}
	});
	const sqlInsert = `INSERT INTO authTokens
	(uid, createdAt, ownerId, token)
	VALUES ('${uid}', '${date}', '${ownerId}', '${hashedOTP}')`;

	db.query(sqlInsert, (err, result) => {
		if (err) {
			return res.status(400).send({ success: false, error: err.code });
		}
		return res.status(200).send({ success: true, error: 'Success' });
	});

	// Create cron job to delete auth record after 2 minutes
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
			.send({ success: false, error: 'Email/password missing!' });
	// Find user with email
	const userReturned = await getUserFromEmail(req.body.email);
	const user = userReturned[0];
	// If user not found send error
	if (!user)
		return res.status(400).send({ success: false, error: 'User not found!' });

	const isMatch = await signInUser(req.body.password, user.password);
	if (!isMatch)
		return res
			.status(400)
			.send({ success: false, error: 'Email/password not matching!' });

	const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});
	res.send({
		success: true,
		user: {
			user: user.name,
			email: user.email,
			id: user.uid,
			token: token,
		},
	});
};

exports.resendEmailAuthentication = async (req, res) => {
	const { email } = req.body;

	console.log(email);
	const uid = uuidv4();

	// Find owner with coresponding email
	const findUserId = `SELECT * FROM users WHERE email = "${email}"`;
	let userEmail, userId;

	db.query(findUserId, (err, result) => {
		if (err || result.length < 1) {
			return res.status(400).send({
				success: false,
				error: 'User with that email was not found :(',
			});
		}

		if (result[0].isVerified) {
			return res.status(400).send({
				success: false,
				error: 'User is already verified',
			});
		}

		userEmail = result[0].email;
		userId = result[0].uid;

		console.log(userEmail);

		// If user already has active token terminate

		const getIsAuthActive = `SELECT * FROM authTokens WHERE ownerId = "${userId}"`;

		db.query(getIsAuthActive, async (err, result) => {
			if (err) {
				return res.status(400).send({
					success: false,
					error: 'Error :(',
				});
			}

			if (result.length < 1) {
				const ownerId = userId;
				const dateNow = new Date();
				const stringDate = dateNow.toISOString();
				const isoDate = new Date(stringDate);
				const date = isoDate.toJSON().slice(0, 19).replace('T', ' ');
				console.log(date);
				const OTP = generateOtp(res);
				const hashedOTP = await bcrypt.hash(OTP, 8);
				// Send auth email
				const mailOptions = {
					from: 'email@email.com',
					to: userEmail,
					subject: 'Verify your email',
					html: generateEmailTemplate(OTP),
				};
				mailTransport().sendMail(mailOptions, function (err, info) {
					if (err) {
						return res
							.status(400)
							.send({ success: false, error: 'Cant send email' });
					}
				});
				const sqlInsert = `INSERT INTO authTokens
			(uid, createdAt, ownerId, token)
			VALUES ('${uid}', '${date}', '${userId}', '${hashedOTP}')`;
				db.query(sqlInsert, (err, result) => {
					if (err) {
						return res.status(400).send({ success: false, error: err.code });
					}
				});

				return res.status(400).send({
					success: false,
					error: 'Verification email sent check email.',
				});

				// Create cron job to delete auth record after 2 minutes
			} else {
				return res.status(400).send({
					success: false,
					error: 'User already has auth token, check your email',
				});
			}
		});
	});
};

exports.verifyUser = async (req, res) => {
	const { userId, otp } = req.body;

	if (!userId || !otp.trim())
		return res.status(400).send({
			success: false,
			error: 'Invalid request, missing otp or userId',
		});

	// Find user and
	const findQuery = `SELECT * FROM users WHERE uid = "${userId}"`;
	const findQueryTokens = `SELECT * FROM authTokens WHERE ownerId = "${userId}"`;
	db.query(findQuery, async (err, result) => {
		if (err) {
			return res.status(400).send({ success: false, error: err.code });
		}

		if (result[0] == undefined) {
			return res
				.status(400)
				.send({ success: false, error: 'user or token not found' });
		}

		res.locals.user = result[0];
		// console.log(result[0]);

		db.query(findQueryTokens, async (err, result) => {
			if (err) {
				return res.status(400).send({ success: false, error: err.code });
			}

			if (result[0] == undefined) {
				return res
					.status(400)
					.send({ success: false, error: 'user or token not found' });
			}
			res.locals.token = result[0];
			// console.log(result[0]);

			// // console.log(result[0][0].email);
			// res.locals.email = result[0][0].email;
			if (res.locals.user.isVerified)
				return res
					.status(400)
					.send({ success: false, error: 'This user is already verified' });

			// Compare given otp to user otp
			const compareTokens = bcrypt.compareSync(otp, res.locals.token.token);

			if (!compareTokens)
				return res
					.status(400)
					.send({ success: false, error: 'Please provide a valid token' });

			// set user isVerified to true
			const verifyChangeQuery = `UPDATE users SET isVerified = 1 WHERE uid = "${userId}"`;

			db.query(verifyChangeQuery, (err, result) => {
				if (err) {
					return res.status(400).send({
						success: false,
						error: 'User verification status cant be changed',
					});
				}

				// Delete token row from authTokens db

				const deleteAuthTokenQuery = `DELETE FROM authTokens WHERE ownerId = "${userId}"`;

				db.query(deleteAuthTokenQuery, (err, result) => {
					if (err) {
						return res.status(400).send({
							success: false,
							error: 'Unable to delete auth token from db',
						});
					}
				});

				// Get user email to send verified notifcation to
				console.log(res.locals.user.email);
				// Send email verified email
				const mailOptions = {
					from: 'email@email.com',
					to: res.locals.user.email,
					subject: 'Email verified',
					html: '<h1>Verified</h1>',
				};
				mailTransport().sendMail(mailOptions, function (err, info) {
					if (err) {
						console.log(err);
					} else {
						console.log(info);
						res.send('Success');
					}
				});
			});
		});
	});
};

exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	// Check if email is provided
	if (!email) {
		return res.status(400).send({
			success: false,
			error: 'Please provide a email address',
		});
	}

	// Find owner with coresponding email
	const findUserByEmail = `SELECT * FROM users WHERE email = "${email}"`;
	let userEmail, userId;

	db.query(findUserByEmail, async (err, result) => {
		if (err || result.length < 1) {
			return res.status(400).send({
				success: false,
				error: 'User with that email was not found :(',
			});
		}

		userEmail = result[0].email;
		userId = result[0].uid;

		// Create new resset token

		const uid = uuidv4();
		const dateNow = new Date();
		const stringDate = dateNow.toISOString();
		const isoDate = new Date(stringDate);
		const date = isoDate.toJSON().slice(0, 19).replace('T', ' ');

		const token = await createRandomBytes();
		const insertToken = `INSERT INTO resetTokens (uid,createdAt,ownerId,token) VALUES ('${uid}', '${date}', '${userId}', '${token}')`;

		db.query(insertToken, (err, result) => {
			if (err) {
				return res.status(400).send({
					success: false,
					error: 'Error creating reset password token',
				});
			}
		});

		// Send password reset email

		const mailOptions = {
			from: 'email@email.com',
			to: userEmail,
			subject: 'Email verified',
			html: generatePasswordResetTemplate(
				`http://localhost:3000/reset-password?token=${token}&id=${userId}`
			),
		};
		mailTransport().sendMail(mailOptions, function (err, info) {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
				res.send('Success');
			}
		});
	});
};


exports.resetPassword = async (req,res) => {
	const {email} = req.body;

	// Get userId from url params and search in db for that user

	



}