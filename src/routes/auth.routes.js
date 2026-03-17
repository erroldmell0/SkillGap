const express = require('express')
const authcontroller = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = express.Router();

/**
 * @route Post api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', authcontroller.registerUserController); 

/**
 * @route Post api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post('/login', authcontroller.loginUserController); 

/**
 * @route Get api/auth/logout
 * @description clear token from user cookie and add the token to blacklist 
 * @access Public
 */
authRouter.get('/logout', authcontroller.logoutUserController);

/**
 * @route Get api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get('/get-me', authMiddleware.authUser, authcontroller.getMeController);

module.exports = authRouter