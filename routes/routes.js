const express = require('express')
const route = express.Router()

const userRouter = require('./userRouter')


route.get('/', async (req, res) => res.send('Welcome'))
route.use('/users', userRouter)







module.exports = route