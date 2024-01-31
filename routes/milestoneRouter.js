const express = require('express')
const createMilestone = require('../controllers/milestoneControllers/createMilestoneController')
const { authenticate } = require('../middleware/authentication')
const milestoneRouter = express.Router()


milestoneRouter.post('/:project_id/create', authenticate, createMilestone)

module.exports = milestoneRouter