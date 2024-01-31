const express = require('express')
const route = express.Router()

const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')


route.get('/', async (req, res) => res.send('Welcome'))
route.use('/users', userRouter)
route.use('/projects', projectRouter)







module.exports = route