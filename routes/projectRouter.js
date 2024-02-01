const express = require('express')
const createProject = require('../controllers/projectControllers/createProjectController')
const { authenticate } = require('../middleware/authentication')
const getProjectById = require('../controllers/projectControllers/viewProjectController')
const projectRouter = express.Router()

projectRouter.post('/create', authenticate, createProject)
projectRouter.get('/:project_id/project', getProjectById)


module.exports = projectRouter
