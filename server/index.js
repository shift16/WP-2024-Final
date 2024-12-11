const express = require('express')
require("dotenv").config()
const { sessionController, SESSION_ROOT_API_URL } = require('./controller/session')
const { usersController, USER_ROOT_API_URL } = require('./controller/users')
const { friendsController, FRIENDS_ROOT_API_URL} = require('./controller/friends')
const { postsController, POSTS_ROOT_API_URL } = require('./controller/posts')
const { verifyToken } = require('./middleware/jwt')


const PORT = process.env.PORT || 3000

// API URLs
const ROOT_API_URL = '/api/v1'
// Auth required
const AUTHENTICATED_API_URL = '/protected'
// No auth required
const PUBLIC_API_URL = '/public'

const app = express()

app.use(ROOT_API_URL, express.json())
app.use(ROOT_API_URL + AUTHENTICATED_API_URL, verifyToken)

app.all('*', (req, _, next) => { // TEMP
  console.log(req.userInfo) // TEMP
  next() // TEMP
})

// The session controller (No auth required)
app.use(ROOT_API_URL + PUBLIC_API_URL + SESSION_ROOT_API_URL, sessionController)
// The user controller (Auth required)
app.use(ROOT_API_URL + AUTHENTICATED_API_URL + USER_ROOT_API_URL, usersController)
// The friends controller (Auth required)
app.use(ROOT_API_URL + AUTHENTICATED_API_URL + FRIENDS_ROOT_API_URL, friendsController)
// The posts controller (Auth required)
app.use(ROOT_API_URL + AUTHENTICATED_API_URL + POSTS_ROOT_API_URL, postsController)

app.use(express.static(__dirname + "/dist")) // Sending static files
app.get('*', (_, res) => {
  res.sendFile(__dirname + '/dist/index.html') // Have Vue handle all other URLs
})

app.listen(PORT, '0.0.0.0', _ => {
  console.log(`Web app listening on ${PORT}`)
})