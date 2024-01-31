const express = require('express')
const route = express.Router()
const createUser = require('../controllers/signupController')
const { verifyMail, sendConfirmationMail } = require('../controllers/verifyMailController')
const userLogin = require('../controllers/loginController')
const { authenticate } = require('../middleware/authentication')
const getUser = require('../controllers/viewProfileController')


route.get('/', async (req, res) => res.send('Welcome'))

route.post('/register', createUser)
route.get('/verify', verifyMail, sendConfirmationMail)
route.post('/login', userLogin)
route.get('/user', authenticate, getUser)





module.exports = route