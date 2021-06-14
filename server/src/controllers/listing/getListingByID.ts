import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'

export const getListingByID = async (req: Request, res: Response) => {
  // make sure required body data is present
  console.log(req.body)
  if (!req.body || !req.query.listingId) {
    res.status(400)
    return res.send({
      listing: null,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }

  let listing: Listing
  try {
    listing = await Listing.findOne(parseInt(req.query.listingId as string), {
      relations: ['user'],
    })
  } catch (error) {
    res.status(500)
    return res.send({
      listing: null,
      errors: [
        {
          field: 'all',
          message: 'error when retrieving listings.',
        },
      ],
    })
  }

  res.send({
    listing: {
      ...listing,
      user: {
        ...listing.user,
        password: null,
      },
    },
    errors: [],
  })
}
