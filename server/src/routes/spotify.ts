import express from 'express'
import { searchForSong } from '../controllers/spotify/searchForSong'
const router = express.Router()

router.get('/searchForSong', searchForSong)

export default router