import express from 'express'
import { searchListings } from '../controllers/listing/searchListings'
import { postListing } from '../controllers/listing/postListing'
import { getListingByID } from '../controllers/listing/getListingByID'
import { getRecentListings } from '../controllers/listing/getRecentListings'
const router = express.Router()

router.post('/postListing', postListing)
router.get('/searchListings', searchListings)
router.get('/getListingByID', getListingByID)
router.get('/getRecentListings', getRecentListings)

export default router
