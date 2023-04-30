const CountryCodes = require('../utils/CountryCodes.json');

exports.checkCode = async (req, res, next) => {
	try {
		// Find by country code (HR) or country by phone code (+385)
		const { code } = req.query;

		console.log(code);

		// Regex to check if code is country code or phone code
		// Check for +385 regex -> /\+[0-9]+/g
		// Check only for numbers regex -> /.[0-9]+/g
		const isPhoneCode = code.match(/.[0-9]+/g);

		if (isPhoneCode) {
			const phoneString = '+' + code;

			const found = CountryCodes.find((el) => el.dial_code == phoneString);

			if (!found) {
				res.send({ success: false });
			} else {
				res.data = found;
				next();
			}
		} else {
			const codeUpper = code.toUpperCase();
			console.log(codeUpper);

			const found = CountryCodes.find((el) => el.code == codeUpper);
			console.log(found);
			if (!found) {
				res.send({ success: false });
			} else {
				res.data = found;
				next();
			}
		}
	} catch (error) {
		console.log(error);
	}
};
