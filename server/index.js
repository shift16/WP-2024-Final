const express = require('express')
const https = require('https')
// const { getConnection } = require('./model/supabase')
require('dotenv').config() // Adds the extra environment variables from the .env file
const {getConnection} = require('./model/supabase')
const sessionController = require('./controller/session').router
const jwt = require('jsonwebtoken')

const PORT = 3000

const app = express()
// console.log(process.env)
// const conn = getConnection()

// async function test(handle) {
//   const test_data_fetch = await conn
//     .from("users")
//     .select('*')
//     .eq("user_id", 1)
  
//     console.log(test_data_fetch)
// }

// test()

app.get('/', (req, res) => {
  res.send("Hello, world!")
})

app.use(express.json())

app.use("/api/v1/login", sessionController)


// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html')
// })

app.listen(PORT, (err, data) => {
  console.log("Server is running!!!! At http://localhost:" + PORT)
})