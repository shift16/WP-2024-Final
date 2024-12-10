const express = require('express')
const { sessionController, SESSION_ROOT_API_URL } = require('./controller/session')
const { usersController, USER_ROOT_API_URL } = require('./controller/users')
const { verifyToken } = require('./middleware/jwt')
const ROOT_API_URL = '/api/v1'
// Auth required
const AUTHENTICATED_API_URL = '/protected'
// No auth required
const PUBLIC_API_URL = '/public'

const PORT = 3000

const app = express()

// app.get('/', (req, res) => {
//   res.send("Hello, world!")
// })

// app.all('*', (req, res) => {
//   console.log(req.headers)
// })

app.use(ROOT_API_URL, express.json())
app.use(ROOT_API_URL + AUTHENTICATED_API_URL, verifyToken)

// The session controller (No auth required)
app.use(ROOT_API_URL + PUBLIC_API_URL + SESSION_ROOT_API_URL, sessionController)
// The user controller (Auth required)
app.use(ROOT_API_URL + AUTHENTICATED_API_URL + USER_ROOT_API_URL, usersController)


// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html')
// })

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})