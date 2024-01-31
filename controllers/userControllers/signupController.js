const UserModel = require("../../models/userModel");
const { buildEmailTemplate, sendMail } = require("../../utils/sendMail")

async function createUser (req, res) {
	try {
    const {email, full_name, password} = req.body
    if(!email || !password || !full_name){
        return res.status(400).json({success: false, message: 'Please provide required fields'})
    }
    
    const uniqueUser = await UserModel.findOne({email: email})
    
    if (uniqueUser) {
        return res.status(400).json({success: false, message: 'Email already exists'})
    }
    let newUser = new UserModel({email: email, full_name: full_name, password: password})
    await newUser.save()
    
    // send welcome message with verification link to user
		const emailOption = {
			to: email,
			from: 'Vote App',
			subject: 'Registration Successful',
			html: await buildEmailTemplate('welcomeMessage.ejs', newUser)
		}
		await sendMail(emailOption, res)
    res.status(201).json({success: true, message: "User created successfully"})
	} catch (error) {
		console.error(error.message)
		res.status(500).json({success: false, message: 'Internal server error'})
	}
}

module.exports = createUser