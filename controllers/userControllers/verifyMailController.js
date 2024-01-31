const UserModel = require('../../models/userModel');
const { buildEmailTemplate, sendMail } = require("../../utils/sendMail")

async function verifyMail (req, res, next) {
	try {
		// get the email from the query string and find the user from the database
		const email = req.query.email
		const user = await UserModel.findOne({email})
		// check if user exists
		if (!user) {
			return res.status(404).json({success: false, message: 'User not found'})
		}
		// check if user is already verified
		if (user.verified == 'true') {
			return res.status(400).json({success: false, message: 'User already verified'})
		}
		// change verified status
		user.verified = true
		await user.save()
		
		// pass the user on to sendConfirmationMail
		req.verified_user = user
		next()
		
	} catch (error) {
		console.error(error.message)
		res.status(500).json({success: false, message: 'Internal server error'})
	}
}

async function sendConfirmationMail (req, res) {
	try {
		// get the user from the verifyMail middleware
		const user = req.verified_user
		// send mail
		const emailOption = {
			to: user.email,
			from:'Vote App',
			subject: 'Verification Successful',
			html: await buildEmailTemplate('confirmVerification.ejs', user)
		}
		await sendMail(emailOption, res)
		// redirect the user from mail
		res.redirect('https://flowease.onrender.com/api')

	} catch (error) {
		console.error(error.message)
		res.status(500).json({success: false, message: 'Internal server error'})
	}
}

module.exports = {
	verifyMail,
	sendConfirmationMail
}