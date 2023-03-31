const {
	checkUserName,
	createUser,
	signIn,
	createAuthToken,
	verifyUser,
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

router.post('/verify', verifyUser);

module.exports = router;
