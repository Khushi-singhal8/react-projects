import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

const app = express()

app.use(express.json())
app.use(cors())

// Connect DB
connectDB()

app.get('/', (req, res) => res.send('API Working'))

export default app