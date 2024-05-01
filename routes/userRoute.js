const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login', userController.userLogin);
router.post('/signup', userController.userSignup);


router.get('/wallet', authController.protected, userController.getUserWallet);

module.exports = router;