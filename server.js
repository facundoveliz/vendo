import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/routes'

const app = express()

dotenv.config()
app.use(express.json())
app.use(routes)
app.use(cors({ credentials: true }))

mongoose
  .connect(process.env.DATABASE_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB successfully connected...'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
