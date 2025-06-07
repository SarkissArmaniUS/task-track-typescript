//   const token = req.headers.authorization?.split(' ')[1]
//   if (!token) return res.status(401).json({ error: 'No token provided' })


import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    // @ts-ignore
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
