import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const getUserListings = async (req: Request, res: Response) => {
  // This has to use a query builder, because to use a simple relation is to return the password hash to the front end.

  if (!req.body || !req.query.userId) {
    res.status(400)
    res.send({
      listings: null,
      errors: 'incorrect parameters given',
    })
  }

  const listings = await getRepository(Listing)
    .createQueryBuilder('listing')
    .select([
      'listing.listing_id',
      'listing.title',
      'listing.description',
      'listing.artist',
      'listing.createdAt',
      'user.username',
      'user.user_id',
      'user.isAdmin',
    ])
    .where('user.user_id = :uId')
    .setParameter('uId', req.query.userId)
    .orderBy('listing.listing_id', 'DESC')
    .leftJoin('listing.user', 'user')
    .getMany()

  if (!listings) {
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

  res.send({
    listings: listings,
    errors: [],
  })
}
