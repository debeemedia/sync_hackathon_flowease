const UserModel = require('../../models/userModel');

async function getUserById(req, res) {
    try {
        const user_id = req.params.user_id
        if (!user_id) {
            return res.status(400).json({success: false, message: 'Please provide user_id'})
        }
        const user = await UserModel.findById(user_id).select('-password -__v')
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }
        res.status(200).json({success: true, message: {_id: user._id, email: user.email, full_name: user.full_name, verified: user.verified}}) 
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success: false, message: 'Internal server error' });
    }
};

module.exports = getUserById