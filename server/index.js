const express = require('express')
const { sessionController, SESSION_ROOT_API_URL } = require('./controller/session')
const ROOT_API_URL = '/api/v1'

const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send("Hello, world!")
})

app.use(express.json())

// The session controller
app.use(ROOT_API_URL + SESSION_ROOT_API_URL, sessionController)


// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html')
// })

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})