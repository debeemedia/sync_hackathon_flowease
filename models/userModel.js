const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        full_name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        created_projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        assigned_projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }]
    }
)

// hash user password before saving
userSchema.pre('save', async function (next) {
	const user = this
	try {
		if (user.isModified('password')) {
			const hashedPassword = await bcrypt.hash(user.password, 10)
			user.password = hashedPassword
		}
		next()
	} catch (error) {
		return next(error)
	}
})

module.exports = mongoose.model('User', userSchema)