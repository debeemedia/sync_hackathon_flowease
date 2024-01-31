const express = require('express')
const userRouter = express.Router()
const createUser = require('../controllers/signupController')
const { verifyMail, sendConfirmationMail } = require('../controllers/verifyMailController')
const userLogin = require('../controllers/loginController')
const { authenticate } = require('../middleware/authentication')
const getUser = require('../controllers/viewProfileController')


userRouter.post('/register', createUser)
userRouter.get('/verify', verifyMail, sendConfirmationMail)
userRouter.post('/login', userLogin)
userRouter.get('/user', authenticate, getUser)

module.exports = userRouter