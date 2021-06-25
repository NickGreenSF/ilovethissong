import express from 'express'
import { getUserConnection } from '../controllers/message/getUserConnection'
import { getUserMessages } from '../controllers/message/getUserMessages'
import { postMessage } from '../controllers/message/postMessage'
const router = express.Router()

router.post('/postMessage', postMessage)
router.get('/getUserMessages', getUserMessages)
router.get('/getUserConnection', getUserConnection)

export default router
