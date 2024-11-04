const express = require('express')
const pg_driver = require('pg')


const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send("Hello, world!")
})

app.listen(PORT, () => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})