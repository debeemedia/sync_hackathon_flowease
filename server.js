require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/routes')
const cors = require('cors')
const ejs = require('ejs')
const app = express()
const port = process.env.PORT || 6005

app.use(cors())
app.use(express.json())
// set views
app.set('views', './views')
app.set('view engine', 'ejs')

// use router
app.use('/api', router)

// error-handling middleware
app.use((err, req, res, next) => {
	if (err) {
		res.json({success: false, message: err.message})
	}
	next()
})
mongoose.connect(process.env.MONGO_URL)
const database = mongoose.connection
database.on('error', (error) => console.log('Database connection failed', error.message))
database.once('connected', () => console.log('Database is connected'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
