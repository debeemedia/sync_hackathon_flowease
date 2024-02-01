const express = require('express')
const createMilestone = require('../controllers/milestoneControllers/createMilestoneController')
const { authenticate } = require('../middleware/authentication')
const markMilestoneCompleted = require('../controllers/milestoneControllers/milestoneCompleteController')
const getMilestoneById = require('../controllers/milestoneControllers/viewMilestoneController')
const milestoneRouter = express.Router()


milestoneRouter.post('/:project_id/create', authenticate, createMilestone)
milestoneRouter.put('/:milestone_id/completed', authenticate, markMilestoneCompleted)
milestoneRouter.get('/:milestone_id/milestone', getMilestoneById)


module.exports = milestoneRouter