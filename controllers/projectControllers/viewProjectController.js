const ProjectModel = require("../../models/projectModel")

async function getProjectById (req, res) {
    try {
        const project_id = req.params.project_id
        if (!project_id) {
            return res.status(400).json({success: false, message: 'Please provide project_id'})
        }
        const project = await ProjectModel.findById(project_id).select('-password -__v')
        if (!project) {
            return res.status(404).json({success: false, message: 'Project not found'})
        }
        res.status(200).json({success: true, message: project}) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Internal server error')
    }
}

module.exports = getProjectById