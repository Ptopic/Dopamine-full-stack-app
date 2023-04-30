const { checkCode } = require('../controllers/codes');

const router = require('express').Router();

router.get('/phone-code', checkCode, (req, res) => {
	console.log(res.data);
	res.send({ success: true, dial: res.data.dial_code });
});

module.exports = router;
