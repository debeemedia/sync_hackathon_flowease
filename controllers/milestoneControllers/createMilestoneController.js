const MilestoneModel = require("../../models/milestoneModel")
const ProjectModel = require("../../models/projectModel")

async function createMilestone (req, res) {
    try {
        const user_id = req.user.id
        const project_id = req.params.project_id 
        if (!project_id) {
            return res.status(400).json({success: false, message: 'Please provide project_id'})
        }
        const project = await ProjectModel.findById(project_id)
        if (!project) {
            return res.status(404).json({success: false, message: 'Project not found'})
        }
        if (project.user_id != user_id) {
            return res.status(403).json({success: false, message: 'You are not the owner of this project'})
        }

        const {name, description, due_date, collaborator} = req.body
        if (!name || !due_date || !collaborator) {
            return res.status(400).json({success: false, message: 'Please provide required fields'})
        }
        
        const dueDateTimestamp = parseInt(due_date, 10); // frontend sends unix timestamp as a string
        

        if (isNaN(dueDateTimestamp) || dueDateTimestamp <= Date.now()) {
            return res.status(400).json({ success: false, message: "Please provide a valid future date for the milestone" });
        }

        if (!project.collaborators.includes(collaborator)) {
            return res.status(403).json({success: false, message: "Please assign milestone to a project collaborator"})
        }

        const milestone = new MilestoneModel({
            name,
            description,
            due_date,
            project_id,
            collaborator
        })

        await milestone.save()
        await ProjectModel.findByIdAndUpdate(project_id, {$push: {milestones: milestone.id}})

        res.status(201).json({success: true, message: 'Milestone created successfully'})

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success: false, message: 'Internal server error' });
    }
}

module.exports = createMilestone