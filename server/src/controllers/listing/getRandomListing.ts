import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const getRandomListing = async (req: Request, res: Response) => {
  const listings = await getRepository(Listing)
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
    .leftJoin('listing.user', 'user')
    .getMany()

  if (!listings) {
    res.status(500)
    return res.send({
      listing: [],
      errors: [
        {
          message: 'error when retrieving listing.',
        },
      ],
    })
  }

  const randomNumber = Math.floor(Math.random() * listings.length)
  // console.log(randomNumber);
  const listing = listings[randomNumber]

  res.send({
    listing: listing,
    errors: [],
  })
}
