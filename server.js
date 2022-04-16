const express = require('express')

const app = express()
require('dotenv').config()
const cors = require('cors')

app.use(cors({ credentials: true }))
require('./startup/routes')(app)
require('./startup/db')()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
