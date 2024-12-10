const express = require('express')
const { sessionController, SESSION_ROOT_API_URL } = require('./controller/session')
const { usersController, USER_ROOT_API_URL } = require('./controller/users')
const {friendsController, FRIENDS_ROOT_API_URL} = require('./controller/friends')
const { verifyToken } = require('./middleware/jwt')

// API URLs
const ROOT_API_URL = '/api/v1'
// Auth required
const AUTHENTICATED_API_URL = '/protected'
// No auth required
const PUBLIC_API_URL = '/public'

const PORT = 3000

const app = express()

app.use(ROOT_API_URL, express.json())
app.use(ROOT_API_URL + AUTHENTICATED_API_URL, verifyToken)

app.all('*', (req, res, next) => { // TEMP
  console.log(req.userInfo) // TEMP
  next() // TEMP
})

// The session controller (No auth required)
app.use(ROOT_API_URL + PUBLIC_API_URL + SESSION_ROOT_API_URL, sessionController)
// The user controller (Auth required)
app.use(ROOT_API_URL + AUTHENTICATED_API_URL + USER_ROOT_API_URL, usersController)
// The friends controller (Auth required)
app.use(ROOT_API_URL + AUTHENTICATED_API_URL + FRIENDS_ROOT_API_URL, friendsController)

app.use(express.static(__dirname + "/dist")) // Sending static files
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html') // Have Vue handle all other URLs
})

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})