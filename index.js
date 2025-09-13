require('dotenv').config()
const express = require('express')
const dbConnection = require('./database/dbConnection')
const route  = require('./router')
const app = express()
const port = 3002
app.use(express.json())
dbConnection()
app.use(route)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
