const express = require('express')
const pg_driver = require('pg')

const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send("Hello, world!")
})


app.get('*', (req, res) => {
  res.sendFile(__dirnam + '/dist/index.html')
})

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})