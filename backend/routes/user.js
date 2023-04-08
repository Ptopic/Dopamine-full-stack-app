const {
	checkUserName,
	createUser,
	signIn,
	createAuthToken,
	verifyUser,
	resendEmailAuthentication,
	forgotPassword,
	resetPassword,
} = require('../controllers/user');
const { validateUser, validateFunc } = require('../middlewares/validator');
const { isResetTokenValid } = require('../middlewares/user');

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

router.post('/resend-email', resendEmailAuthentication);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', isResetTokenValid, resetPassword);

router.get('/verify-token', isResetTokenValid, (req, res) => {
	res.json({ success: true });
});

module.exports = router;
