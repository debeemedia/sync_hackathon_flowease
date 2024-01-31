const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");

async function createProject (req, res) {
    try {
        const user_id = req.user.id
        const {name, description, collaborators} = req.body
        if (!name || ! description || !collaborators) {
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