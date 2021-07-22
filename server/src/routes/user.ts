import express from 'express'
import { logoutUser } from '../controllers/user/logoutUser'
import { getCurrentUser } from '../controllers/user/getCurrentUser'
import { loginUser } from '../controllers/user/loginUser'
import { registerUser } from '../controllers/user/registerUser'
import { banUser } from '../controllers/user/banUser'
import { updateRead } from '../controllers/user/updateRead'
const router = express.Router()

router.post('/loginUser', loginUser)
router.post('/registerUser', registerUser)
router.get('/getCurrentUser', getCurrentUser)
router.get('/logoutUser', logoutUser)
router.post('/banUser', banUser)
router.get('/updateRead', updateRead)

export default router
