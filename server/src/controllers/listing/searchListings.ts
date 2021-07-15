// This file searches for listings by a search term.

import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const searchListings = async (req: Request, res: Response) => {
  // search with a query
  if (req.query.search) {
    const { search } = req.query
    let l
    if (req.query.listingId) {
      l = await getRepository(Listing)
        .createQueryBuilder('listing')
        .select([
          'listing.listing_id',
          'listing.title',
          'listing.description',
          'listing.artist',
          'listing.createdAt',
          'user.username',
          'user.isAdmin',
        ])
        .where(
          'listing.title like :term OR listing.artist like :term AND listing.listing_id <= :lId',
          { term: `%${search}%`, lId: req.query.listingId }
        )
        .orderBy('listing.listing_id', 'DESC')
        .leftJoin('listing.user', 'user')
        .limit(600)
        .getMany()
    } else {
      l = await getRepository(Listing)
        .createQueryBuilder('listing')
        .select([
          'listing.listing_id',
          'listing.title',
          'listing.description',
          'listing.artist',
          'listing.createdAt',
          'user.username',
          'user.isAdmin',
        ])
        .where('listing.title like :term OR listing.artist like :term', { term: `%${search}%` })
        .orderBy('listing.listing_id', 'DESC')
        .leftJoin('listing.user', 'user')
        .getMany()
    }
    if (!l) {
      res.status(500)
      return res.send({
        listings: [],
        errors: [
          {
            message: 'error when retrieving listings.',
          },
        ],
      })
    }
    console.log(l)
    return res.send({
      listings: l,
      errors: ['test'],
    })
  }
  return res.send({
    listings: null,
    errors: 'incorrect paramters given',
  })
}
