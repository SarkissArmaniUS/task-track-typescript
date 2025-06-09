import express from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/devRouter'

const router = express.Router()

router.get('/task', requireAuth, getTasks)
router.post('/task', requireAuth, createTask)
router.put('/task/:id', requireAuth, updateTask)
router.delete('/task/:id', requireAuth, deleteTask)

export default router