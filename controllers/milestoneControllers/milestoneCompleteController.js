const MilestoneModel = require("../../models/milestoneModel");
const UserModel = require("../../models/userModel");

async function markMilestoneCompleted (req, res) {
    try {
        const user_id = req.user.id
        console.log('user_id', user_id);

        const milestone_id = req.params.milestone_id
        if (!milestone_id) {
            return res.status(400).json({success: false, message: 'Please provide milestone_id'})
        }
        const milestone = await MilestoneModel.findById(milestone_id)
        if (!milestone) {
            return res.status(404).json({success: false, message: 'Milestone not found'})
        }

        const collaborator = await UserModel.findOne({email: milestone.collaborator})
        console.log('collaborator_id', collaborator._id);
        
        const milestoneProject = await MilestoneModel.findById(milestone_id).populate('project_id').select('-__v')
        const project_owner_id = milestoneProject.project_id.user_id
        console.log('project_owner_id', project_owner_id);
        
        if (milestone.completed) {
            return res.status(400).json({success: false, message: 'Milestone already complete'})
        }
        if (user_id == collaborator._id || user_id == project_owner_id) {
            await MilestoneModel.findByIdAndUpdate(milestone_id, {completed: true})

            // emit a notification to client when milestone is completed
            const io = req.io
            io.emit('milestone_completed', {
                type: 'milestone_completed',
                message: `Completed the milestone: '${milestone.name}' for project: '${milestoneProject.project_id.name}'`,
                milestone_id: milestone._id,
                project_id: milestoneProject.project_id,
                creator_id: project_owner_id,
                collaborator: milestone.collaborator,
                date_completed: Math.floor(Date.now()/1000) // converting to unix timestamp
            })

        } else {
            return res.status(403).json({success: false, message: 'You are not the owner or collaborator for this milestone'})

        }

        res.status(200).json({success: true, message: 'Milestone successfully marked as completed'})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = markMilestoneCompleted