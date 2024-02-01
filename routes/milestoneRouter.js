const express = require('express')
const createMilestone = require('../controllers/milestoneControllers/createMilestoneController')
const { authenticate } = require('../middleware/authentication')
const markMilestoneCompleted = require('../controllers/milestoneControllers/milestoneCompleteController')
const milestoneRouter = express.Router()


milestoneRouter.post('/:project_id/create', authenticate, createMilestone)
milestoneRouter.put('/:milestone_id/completed', authenticate, markMilestoneCompleted)

module.exports = milestoneRouter