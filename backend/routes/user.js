const {
	checkUserName,
	createUser,
	signIn,
	createAuthToken,
	verifyUser,
	resendEmailAuthentication,
	resetPassword,
} = require('../controllers/user');
const { validateUser, validateFunc } = require('../middlewares/validator');

const router = require('express').Router();

router.post(
	'/create',
	validateUser,
	validateFunc,
	checkUserName,
	createUser,
	createAuthToken,
	resetPassword
);

router.post('/signin', signIn);

router.post('/verify', verifyUser);

router.post('/resend-email', resendEmailAuthentication);

router.post('/forgot-password', resetPassword);

module.exports = router;
