const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../helpers');

const authRouter = express.Router();

authRouter.post('/register', validateRegister, registerUser);
authRouter.post('/login', validateLogin, loginUser);

module.exports = authRouter;
