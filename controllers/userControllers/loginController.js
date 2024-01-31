require("dotenv").config()
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const UserModel = require('../../models/userModel')

async function userLogin(req, res) {
    try {
    const { email, password } = req.body;
    if(!password){
        return res.status(400).json({success: false, message: 'Please provide your password'})
    }
    if(!email){
        return res.status(400).json({success: false, message: 'Please provide your email'})
    }
    const user = await UserModel.findOne({email}, '-__v')

    if (!user) {
       return res.status(404).json({success: false, message: "User is not registered"})
    }

    // compare password and issue token
		bcrypt.compare(password, user.password, (err, result) => {
			if (result === true) {
				// check if user is verified
				if (!user.verified) {
					return res.status(401).json({success: false, message: 'User is not verified'})
				}
				const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET, {expiresIn: '1h'})
				// issue token
				return res.status(200).json({success: true, message: token})
			} else {
				return res.status(401).json({success: false, message: 'Incorrect credentials'})
			}
		})

    
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Internal server error')
    }
}


module.exports = userLogin