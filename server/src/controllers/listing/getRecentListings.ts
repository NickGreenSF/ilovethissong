import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const getRecentListings = async (req: Request, res: Response) => {

  // This has to use a query builder, because to use a simple relation is to return the password hash to the front end.

  const listings = await getRepository(Listing).createQueryBuilder('listing')
  .select(['listing.listing_id', 'listing.title', 'listing.description', 'listing.artist', 'listing.createdAt', 'user.username', 'user.isAdmin'])
  .orderBy('listing.listing_id', 'DESC')
  .leftJoin('listing.user', 'user')
  .getMany();
  
  let numb = Math.random();
  console.log(listings.length);

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