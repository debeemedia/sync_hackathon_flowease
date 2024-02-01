const MilestoneModel = require("../../models/milestoneModel")

async function getMilestoneById (req, res) {
    try {
        const milestone_id = req.params.milestone_id
        if (!milestone_id) {
            return res.status(400).json({success: false, message: 'Please provide milestone_id'})
        }
        const milestone = await MilestoneModel.findById(milestone_id).select('-password -__v')
        if (!milestone) {
            return res.status(404).json({success: false, message: 'Milestone not found'})
        }
        res.status(200).json({success: true, message: milestone}) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Internal server error')
    }
}

module.exports = getMilestoneById