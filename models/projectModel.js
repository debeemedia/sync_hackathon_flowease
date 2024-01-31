const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: [{
        type: String
    }],
    milestones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone'
    }]
})

module.exports = mongoose.model('Project', projectSchema)
