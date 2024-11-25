const express = require('express')
// const { getConnection } = require('./model/supabase')
require('dotenv').config() // Setups the config

const PORT = 3000

const app = express()
console.log(process.env)
// const conn = getConnection()
// conn
//   .from("products")
//   .insert("testing")

app.get('/', (req, res) => {
  console.log('')
  res.send("Hello, world!")
})


app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})