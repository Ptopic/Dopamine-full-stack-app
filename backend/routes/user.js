const {
	checkUserName,
	createUser,
	signIn,
	createAuthToken,
} = require('../controllers/user');
const { validateUser, validateFunc } = require('../middlewares/validator');

const router = require('express').Router();

router.post(
	'/create',
	validateUser,
	validateFunc,
	checkUserName,
	createUser,
	createAuthToken
);

router.post('/signin', signIn);

module.exports = router;
