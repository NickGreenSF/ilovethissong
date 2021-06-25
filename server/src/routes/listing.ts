import express from 'express'
import { searchListings } from '../controllers/listing/searchListings'
import { postListing } from '../controllers/listing/postListing'
import { getListingByID } from '../controllers/listing/getListingByID'
import { getRecentListings } from '../controllers/listing/getRecentListings'
import { getRandomListing } from '../controllers/listing/getRandomListing'
import { getUserListings } from '../controllers/listing/getUserListings'
import { deleteListingByID } from '../controllers/listing/deleteListingByID'
const router = express.Router()

router.post('/postListing', postListing)
router.get('/searchListings', searchListings)
router.get('/getListingByID', getListingByID)
router.get('/getRecentListings', getRecentListings)
router.get('/getRandomListing', getRandomListing)
router.get('/getUserListings', getUserListings)
router.get('/deleteListing', deleteListingByID)

export default router
