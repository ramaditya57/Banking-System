const router = require('express').Router();
const { register, login } = require('../controllers/authController');

// Route: POST /api/auth/register
router.post('/register', register);

// Route: POST /api/auth/login
router.post('/login', login);

module.exports = router;
