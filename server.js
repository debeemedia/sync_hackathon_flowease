require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/routes')
const cors = require('cors')
const ejs = require('ejs')
const port = process.env.PORT || 6005
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {
	cors: {
		origin: '*'
	}
})

app.use(cors())
app.use(express.json())
// set views
app.set('views', './views')
app.set('view engine', 'ejs')

// middleware to pass on io instance
app.use((req, res, next) => {
	req.io = io;
	next();
});
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


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
