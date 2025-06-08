import { Router } from 'express'

import authRouter from './authRouter'
import devRouter from './devRouter'

const router = Router()

router.use('/', authRouter)
router.use('/', devRouter)

export default router