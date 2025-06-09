import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../db/users'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET as string

export const signup = async (req: Request, res: Response) => {
  try {
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
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(201).json({ message: 'Signed up', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Signup failed' })
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ error: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Incorrect password or name' })

    const token = jwt.sign({ userId: user._id }, JWT_SECRET)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({ message: 'Signed in', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Signin failed' })
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
  res.json({ message: 'Logged out' })
}

export const getMe = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId
    const user = await User.findById(userId).select('email _id')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: 'User data', user: { email: user.email, userId: user._id } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
