// This file searches for listings by a search term.

import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'
import { Like } from 'typeorm'

export const searchListings = async (req: Request, res: Response) => {
  // search with a query
  if (req.query.search) {
    const { search } = req.query
    console.log(search)
    // search with JUST a query.
    const listings = await Listing.find({
      where: { title: Like(`%${search}%`) },
    })
    const addToListings = await Listing.find({
      where: { artist: Like(`%${search}%`) },
    })
    const ids = []
    const results = listings.concat(addToListings)
    for (let i = 0; i < results.length; i++) {
      if (!ids.includes(results[i].listing_id)) {
        ids.push(results[i].listing_id)
      } else {
        results[i].title = null
      }
    }
    return res.send({
      data: results,
      errors: [],
    })
  }
}
