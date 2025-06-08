import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Router
// import authRouter from './router/authRouter'
// import devRouter from './router/devRouter'
import router from './router'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

const server = http.createServer(app)

const PORT = process.env.PORT
server.listen(PORT || 5000, () => {
    console.log(`Server running on ${PORT}`)
})

const MONGO_URL = process.env.MONGO_URL // as string
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

// app.use('/', authRouter)
// app.use('/', devRouter)
app.use('/', router)
