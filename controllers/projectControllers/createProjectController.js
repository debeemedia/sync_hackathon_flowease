const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");

async function createProject (req, res) {
    try {
        const user_id = req.user.id
        const {name, description, collaborators} = req.body
        if (!name || !description || !collaborators) {
            return res.status(400).json({success: false, message: 'Please provide required fields'})
        }

        const unregisteredCollaborators = []
        const unverifiedCollaborators = []
        const collaboratorEmails = await Promise.all(
            collaborators.map(async collaborator => {
                const user = await UserModel.findOne({email: collaborator})
                if (!user) {
                     unregisteredCollaborators.push(collaborator)
                     return
                }
                if (user && (user.verified === false || user.verified === undefined || user.verified === null)) {
                    unverifiedCollaborators.push(user.email)
                    return
                }
                console.log('user email:', user.email);
                return user.email
            })

        )
        if (unregisteredCollaborators.length> 0) {
            throw new Error(`These collaborators do not exist: ${unregisteredCollaborators.join(', ')}`)
        }
        if (unverifiedCollaborators.length> 0) {
            throw new Error(`These collaborators are unverified: ${unverifiedCollaborators.join(', ')}`)
        }

        console.log("collab emails:", collaboratorEmails);

        const project = new ProjectModel({
            name,
            description,
            user_id,
            collaborators: collaboratorEmails
        })

        await project.save()

        // push the created project into the project owner's array
        await UserModel.findByIdAndUpdate(user_id, {$push: {created_projects: project._id}})

        // push the assigned projects into the collaborators' arrays
        await Promise.all(
            collaborators.map(async collaborator => {
                const assignedCollaborator = await UserModel.findOne({email: collaborator})
                const assignedCollaboratorId = assignedCollaborator._id
                await UserModel.findByIdAndUpdate(assignedCollaboratorId, {$push: {assigned_projects: project._id}})
            })
        )
        
        // emit a notification to client when project is created
        const io = req.io;
        if (io) {
            io.emit('project_created', {
                type: 'project_created',
                message: `You have been added to a new project with name: ${project.name}`,
                project_id: project._id,
                creator_id: user_id,
                collaborators: collaboratorEmails

            })

        }

        res.status(201).json({success: true, message: 'Project created successfully'})

    } catch (error) {
        console.log(error.message)
        if (error.message.includes('These collaborators do not exist:')) {
            return res.status(404).json({success: false, message: error.message})
        }
        if (error.message.includes('These collaborators are unverified:')) {
            return res.status(403).json({success: false, message: error.message})
        }
        res.status(500).json('Internal server error')
    }
}

module.exports = createProject