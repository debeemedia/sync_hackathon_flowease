const express = require('express')
const createProject = require('../controllers/projectControllers/createProjectController')
const { authenticate } = require('../middleware/authentication')
const projectRouter = express.Router()

projectRouter.post('/create', authenticate, createProject)

module.exports = projectRouter
