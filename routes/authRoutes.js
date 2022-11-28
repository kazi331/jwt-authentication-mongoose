const { Router } = require('express');
const { signUp_get, signUp_post, login_get, login_post } = require('../controllers/authController');

const router = Router();

router.get('/signup', signUp_get);
router.post('/signup', signUp_post);
router.get('/login', login_get);
router.post('/login', login_post);

module.exports = router;