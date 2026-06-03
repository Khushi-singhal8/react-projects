import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import clerkWebhook from './webhooks/clerk.js' // ✅ add this

const app = express()

// ✅ Webhook MUST be before express.json()
app.post('/webhooks/clerk', express.raw({ type: 'application/json' }), clerkWebhook)

app.use(express.json())
app.use(cors())

connectDB()

app.get('/', (req, res) => res.send('API Working'))
app.use('/api/users', userRouter)
app.use('/api/images', imageRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})

export default app