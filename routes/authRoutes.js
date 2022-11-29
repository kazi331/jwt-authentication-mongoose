const { Router } = require('express');
const { signUp_post, login_post, logout_get } = require('../controllers/authController');
const { requireAuth } = require('../middlewares/authMiddleware');


const router = Router();

// Get routes
router.get('/', (_req, res) => res.render('home'));
router.get('/smoothies', requireAuth, (_req, res) => res.render('smoothies'));
router.get('/signup', (_req, res) => res.render('signup'));
router.get('/login', (_req, res) => res.render('login'));

router.get('/logout', logout_get);

// post routes
router.post('/signup', signUp_post);
router.post('/login', login_post);



module.exports = router;