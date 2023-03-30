const { createUser, signIn } = require('../controllers/user');
const { validateUser, validateFunc } = require('../middlewares/validator');

const router = require('express').Router();

router.post('/create', validateUser, validateFunc, createUser);

router.post('/signin', signIn);

module.exports = router;
