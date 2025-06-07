import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../db/users'
import dotenv from 'dotenv'
import { requireAuth } from '../middleware/requireAuth'
dotenv.config()

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET as string

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(401).json({ error: 'Email and password required' })

  const existingUser = await User.findOne({ email })
  if (existingUser) return res.status(400).json({ error: 'User already exists' })

  const hashed = await bcrypt.hash(password, 10)
  const newUser = new User({ email, password: hashed })
  await newUser.save()

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  res.status(201).json({ message: 'Signed up', token })
})

// Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) return res.status(400).json({ error: 'User not found' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ error: 'Incorrect password' })

  const token = jwt.sign({ userId: user._id }, JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  res.json({ message: 'Signed in', token })
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
  res.json({ message: 'Logged out' })
})

router.get('/me', requireAuth, (req, res) => {
  // @ts-ignore
  const userId = req.user.userId
  User.findById(userId)
    .select('email _id')
    .then(user => {
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json({ message: 'User data', user: { email: user.email, userId: user._id } })
    })
    .catch(() => res.status(500).json({ error: 'Server error' }))
})


export default router
