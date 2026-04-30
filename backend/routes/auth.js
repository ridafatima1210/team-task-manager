const router = require('express').Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const c = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/signup', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], c.signup);

router.post('/login', c.login);
router.get('/me', auth, c.getMe);
router.get('/users', auth, c.getUsers);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;