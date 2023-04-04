const crypto = require('crypto');

exports.sendError = (res, error, status = 401) => {
	res.status(status).send({ success: false, error: error });
};

exports.createRandomBytes = () =>
	new Promise((resolve, reject) => {
		crypto.randomBytes(30, (err, buff) => {
			if (err) reject(err);

			const token = buff.toString('hex');
			resolve(token);
		});
	});
