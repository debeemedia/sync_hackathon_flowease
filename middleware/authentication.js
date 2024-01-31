require('dotenv').config()
const jwt = require('jsonwebtoken')

async function authenticate (req, res, next) {
	try {
		// check if token is provided in the headers
		const token = req.headers.authorization
		if (!token) {
			return res.status(401).json({success: false, message: 'Unauthorized. Please login'})
		}
		// decode payload in token
		try {
			const decoded = jwt.verify(token, process.env.SECRET)
			req.user = decoded
			next()

		} catch (error) {
			console.error(error.message)
			return res.status(401).json({success: false, message: error.message})
		}
	} catch (error) {
		console.error(error.message)
		res.status(500).json({success: false, message: 'Internal server error'})
	}
}

module.exports = {authenticate}