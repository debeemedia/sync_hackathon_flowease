const UserModel = require('../../models/userModel');

async function getUser(req, res) {
    try {
        const id = req.user.id
        const user = await UserModel.findById(id).select('-password -__v')
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }
        res.status(200).json({success: true, message: user}) 
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success: false, message: 'Internal server error' });
    }
};

module.exports = getUser