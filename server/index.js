const express = require('express')

const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send("Hello, world!")
})


app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})