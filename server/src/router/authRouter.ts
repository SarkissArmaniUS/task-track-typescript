import express from 'express'
import { signup, signin, logout, getMe } from '../controllers/authRouter'
import { requireAuth } from '../middleware/requireAuth'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)
router.get('/me', requireAuth, getMe)

export default router