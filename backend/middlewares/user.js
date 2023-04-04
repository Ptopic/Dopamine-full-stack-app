const { sendError } = require('../utils/helper');
const db = require('../db/index');

exports.isResetTokenValid = async (req, res, next) => {
	const { token, id } = req.query;

	if (!token || !id) return sendError(res, 'invalid request');

	// Find user by id if not found return error
	const findUser = `SELECT * FROM resetTokens WHERE ownerId = "${id}"`;

	db.query(findUser, (err, result) => {
		if (err) {
			return sendError(res, 'DB Error');
		}

		const user = result[0];

		if (!user) {
			return sendError(res, 'User not found');
		}

		// Find resetToken by token if not found return error
		const findUser = `SELECT * FROM resetTokens WHERE token = "${token}"`;

		db.query(findUser, (err, result) => {
			if (err) {
				return sendError(res, 'DB Error');
			}

			const resetToken = result[0];

			// Check if any reset token was found
			if (!resetToken) {
				return sendError(res, 'Reset token not found');
			}

			// Compare resetToken token to given token
			if (resetToken.token != token) {
				return sendError(
					res,
					'Given token doesnt match any tokens in database'
				);
			}

			// Set request user to found user
			req.user = user;
			next();
		});
	});
};
