const express = require('express')
const userRouter = express.Router()
const createUser = require('../controllers/userControllers/signupController')
const { verifyMail, sendConfirmationMail } = require('../controllers/userControllers/verifyMailController')
const userLogin = require('../controllers/userControllers/loginController')
const { authenticate } = require('../middleware/authentication')
const getUser = require('../controllers/userControllers/viewProfileController')


userRouter.post('/register', createUser)
userRouter.get('/verify', verifyMail, sendConfirmationMail)
userRouter.post('/login', userLogin)
userRouter.get('/user', authenticate, getUser)

module.exports = userRouter