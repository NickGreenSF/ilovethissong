// This file searches for listings by a search term.

import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const searchListings = async (req: Request, res: Response) => {
  // search with a query
  if (req.query.search) {
    const { search } = req.query
    const l = await getRepository(Listing)
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
    return res.send({
      listings: l,
      errors: [],
    })
  }
}
